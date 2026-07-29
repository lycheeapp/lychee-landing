import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { LandingLocale } from '../locale/locale.service';
import { LocalizedString, resolveLocalized } from '../../models/landing-page.model';

export interface SeoInput {
  title: LocalizedString | string;
  description?: LocalizedString | string;
  path?: string;
  ogImage?: string;
  type?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private jsonLdEl: HTMLScriptElement | null = null;

  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {}

  apply(input: SeoInput, locale: LandingLocale): void {
    const title = this.resolve(input.title, locale);
    const description = this.resolve(
      input.description ?? {
        ar: 'ليتشي — منصّة مدفوعات لفلسطين. ادفع، واقبض، وكل ما بينهما من هاتفك.',
        en: 'Lychee — a payments platform for Palestine. Pay, get paid, and everything in between from your phone.'
      },
      locale
    );
    const path = input.path ?? '/';
    const canonical = `${environment.siteUrl}${path === '/' ? '' : path}`;
    const ogImage = input.ogImage
      ? (input.ogImage.startsWith('http') ? input.ogImage : `${environment.siteUrl}/${input.ogImage.replace(/^\//, '')}`)
      : `${environment.siteUrl}/assets/landing/og-image.png`;

    this.title.setTitle(title);

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'theme-color', content: '#1ecd64' });

    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: input.type ?? 'website' });
    this.meta.updateTag({ property: 'og:url', content: canonical });
    this.meta.updateTag({ property: 'og:image', content: ogImage });
    this.meta.updateTag({ property: 'og:locale', content: locale === 'ar' ? 'ar_PS' : 'en_US' });
    this.meta.updateTag({
      property: 'og:locale:alternate',
      content: locale === 'ar' ? 'en_US' : 'ar_PS'
    });
    this.meta.updateTag({ property: 'og:site_name', content: 'Lychee' });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: ogImage });

    this.setLinkRel('canonical', canonical);
    this.setLinkRel('alternate', `${canonical}${canonical.includes('?') ? '&' : '?'}lang=ar`, 'ar');
    this.setLinkRel('alternate', `${canonical}${canonical.includes('?') ? '&' : '?'}lang=en`, 'en');
  }

  setJsonLd(data: Record<string, unknown> | Record<string, unknown>[]): void {
    if (this.jsonLdEl) {
      this.jsonLdEl.remove();
    }
    this.jsonLdEl = this.document.createElement('script');
    this.jsonLdEl.type = 'application/ld+json';
    this.jsonLdEl.text = JSON.stringify(data);
    this.document.head.appendChild(this.jsonLdEl);
  }

  clearJsonLd(): void {
    if (this.jsonLdEl) {
      this.jsonLdEl.remove();
      this.jsonLdEl = null;
    }
  }

  private resolve(value: LocalizedString | string, locale: LandingLocale): string {
    if (typeof value === 'string') {
      return value;
    }
    return resolveLocalized(value, locale);
  }

  private setLinkRel(rel: string, href: string, hreflang?: string): void {
    const selector = hreflang
      ? `link[rel="${rel}"][hreflang="${hreflang}"]`
      : `link[rel="${rel}"]:not([hreflang])`;
    let el = this.document.head.querySelector(selector) as HTMLLinkElement | null;
    if (!el) {
      el = this.document.createElement('link');
      el.setAttribute('rel', rel);
      if (hreflang) {
        el.setAttribute('hreflang', hreflang);
      }
      this.document.head.appendChild(el);
    }
    el.setAttribute('href', href);
  }
}
