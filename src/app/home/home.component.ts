import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

import {
  LandingContent,
  LandingLocale,
  LocalizedString,
  resolveLocalized
} from '../core/models/landing-page.model';
import { LandingContentService } from '../core/services/landing-content/landing-content.service';

const LANG_KEY = 'lychee_lang';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy {
  content: LandingContent | null = null;
  locale: LandingLocale = 'ar';
  isLoading = true;
  private sub?: Subscription;

  constructor(
    private landingContent: LandingContentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.locale = this.resolveInitialLocale();
    this.applyDocumentLocale(this.locale);
    this.sub = this.landingContent.getContent().subscribe((content) => {
      this.content = content;
      this.isLoading = false;
      this.applyDocumentLocale(this.locale);
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  t(value: LocalizedString | undefined | null): string {
    return resolveLocalized(value, this.locale);
  }

  phoneShot(): string {
    if (!this.content) {
      return '';
    }
    return this.locale === 'en'
      ? this.content.hero.phoneScreenshotEn
      : this.content.hero.phoneScreenshotAr;
  }

  toggleLocale() {
    const y = window.scrollY;
    this.locale = this.locale === 'ar' ? 'en' : 'ar';
    this.applyDocumentLocale(this.locale);
    try {
      localStorage.setItem(LANG_KEY, this.locale);
    } catch (e) {}
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', this.locale);
      window.history.replaceState({}, '', url.toString());
    } catch (e) {}
    setTimeout(() => window.scrollTo(0, y), 0);
  }

  onContactSubmit(event: Event) {
    event.preventDefault();
  }

  channelIcon(type: string): string {
    if (type === 'email') { return 'mail'; }
    if (type === 'phone') { return 'phone'; }
    if (type === 'whatsapp') { return 'chat'; }
    return 'pin';
  }

  isAppRoute(href: string): boolean {
    if (!href) {
      return false;
    }
    return href.charAt(0) === '/' && href.indexOf('#') === -1;
  }

  private resolveInitialLocale(): LandingLocale {
    const q = this.route.snapshot.queryParamMap.get('lang');
    if (q === 'ar' || q === 'en') {
      return q;
    }
    try {
      const stored = localStorage.getItem(LANG_KEY);
      if (stored === 'ar' || stored === 'en') {
        return stored;
      }
    } catch (e) {}
    return 'ar';
  }

  private applyDocumentLocale(locale: LandingLocale) {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    if (this.content && this.content.seo) {
      document.title = this.t(this.content.seo.title);
    }
  }
}
