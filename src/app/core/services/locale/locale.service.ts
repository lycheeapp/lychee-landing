import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

export type LandingLocale = 'ar' | 'en';

const LANG_KEY = 'lychee_lang';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  private readonly localeSubject = new BehaviorSubject<LandingLocale>('ar');
  readonly locale$: Observable<LandingLocale> = this.localeSubject.asObservable();
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  get locale(): LandingLocale {
    return this.localeSubject.value;
  }

  resolveInitial(route?: ActivatedRoute): LandingLocale {
    const q = route?.snapshot.queryParamMap.get('lang');
    if (q === 'ar' || q === 'en') {
      this.setLocale(q, false);
      return q;
    }
    if (this.isBrowser) {
      try {
        const stored = localStorage.getItem(LANG_KEY);
        if (stored === 'ar' || stored === 'en') {
          this.setLocale(stored, false);
          return stored;
        }
      } catch {
        /* ignore */
      }
    }
    this.setLocale('ar', false);
    return 'ar';
  }

  toggle(router?: Router): LandingLocale {
    const next: LandingLocale = this.locale === 'ar' ? 'en' : 'ar';
    this.setLocale(next, true, router);
    return next;
  }

  setLocale(locale: LandingLocale, persist = true, router?: Router): void {
    this.localeSubject.next(locale);
    if (this.isBrowser) {
      document.documentElement.lang = locale;
      document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    }

    if (persist && this.isBrowser) {
      try {
        localStorage.setItem(LANG_KEY, locale);
      } catch {
        /* ignore */
      }
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('lang', locale);
        window.history.replaceState({}, '', url.toString());
      } catch {
        /* ignore */
      }
      if (router) {
        router.navigate([], {
          queryParams: { lang: locale },
          queryParamsHandling: 'merge',
          replaceUrl: true
        });
      }
    }
  }
}
