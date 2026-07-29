import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

import {
  LandingContent,
  LocalizedString,
  resolveLocalized
} from '../core/models/landing-page.model';
import { LandingContentService } from '../core/services/landing-content/landing-content.service';
import { LocaleService, LandingLocale } from '../core/services/locale/locale.service';
import { SeoService } from '../core/services/seo/seo.service';
import { SiteHeaderComponent } from '../shared/site-header/site-header.component';
import { SiteFooterComponent } from '../shared/site-footer/site-footer.component';
import { ContactFormComponent } from '../shared/contact-form/contact-form.component';
import { CookieBannerComponent } from '../shared/cookie-banner/cookie-banner.component';
import { StickyWhatsappComponent } from '../shared/sticky-whatsapp/sticky-whatsapp.component';
import { WhatsappLeadModalComponent } from '../shared/whatsapp-lead-modal/whatsapp-lead-modal.component';
import {
  WHATSAPP_LEAD_INTENTS,
  WhatsappLeadIntentId
} from '../shared/whatsapp-lead-modal/whatsapp-lead.intents';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SiteHeaderComponent,
    SiteFooterComponent,
    ContactFormComponent,
    CookieBannerComponent,
    StickyWhatsappComponent,
    WhatsappLeadModalComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy {
  content: LandingContent | null = null;
  locale: LandingLocale = 'ar';
  isLoading = true;
  waLeadOpen = false;
  waLeadIntent: WhatsappLeadIntentId = 'start_payments';
  private sub?: Subscription;

  constructor(
    private landingContent: LandingContentService,
    private localeService: LocaleService,
    private seo: SeoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.locale = this.localeService.resolveInitial(this.route);
    this.sub = this.landingContent.getContent().subscribe((content) => {
      this.content = content;
      this.isLoading = false;
      this.applySeo();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.seo.clearJsonLd();
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

  toggleLocale(): void {
    const y = window.scrollY;
    this.locale = this.localeService.toggle(this.router);
    this.applySeo();
    setTimeout(() => window.scrollTo(0, y), 0);
  }

  channelIcon(type: string): string {
    if (type === 'email') { return 'mail'; }
    if (type === 'phone') { return 'phone'; }
    if (type === 'whatsapp') { return 'chat'; }
    return 'pin';
  }

  isExternal(href: string): boolean {
    return !!href && (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:'));
  }

  isAppRoute(href: string): boolean {
    return !!href && href.charAt(0) === '/' && href.indexOf('#') === -1;
  }

  isFragment(href: string): boolean {
    return !!href && (href.startsWith('#') || href.includes('/#'));
  }

  fragmentOf(href: string): string {
    const i = href.indexOf('#');
    return i >= 0 ? href.slice(i + 1) : '';
  }

  whatsappHref(): string {
    const ch = this.content?.contact.channels.find((c) => c.type === 'whatsapp');
    return ch?.href || '';
  }

  whatsappPhone(): string {
    const href = this.whatsappHref();
    const match = href.match(/wa\.me\/(\d+)/);
    return match?.[1] || '970598999890';
  }

  openWhatsappLead(intent: WhatsappLeadIntentId): void {
    this.waLeadIntent = intent;
    this.waLeadOpen = true;
  }

  closeWhatsappLead(): void {
    this.waLeadOpen = false;
  }

  waLeadTitle(): string {
    return this.t(WHATSAPP_LEAD_INTENTS[this.waLeadIntent].title);
  }

  waLeadHelper(): string {
    return this.t(WHATSAPP_LEAD_INTENTS[this.waLeadIntent].helper);
  }

  waLeadMessage(): string {
    return this.t(WHATSAPP_LEAD_INTENTS[this.waLeadIntent].message);
  }

  private applySeo(): void {
    if (!this.content) {
      return;
    }
    this.seo.apply({
      title: this.content.seo.title,
      description: this.content.seo.description,
      path: '/',
      ogImage: this.content.seo.ogImage
    }, this.locale);

    this.seo.setJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Lychee',
        url: environment.siteUrl,
        logo: `${environment.siteUrl}/assets/landing/lychee-logo.svg`,
        email: environment.contactEmail,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Ramallah',
          addressRegion: 'West Bank',
          addressCountry: 'PS'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: environment.contactEmail,
          availableLanguage: ['Arabic', 'English']
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'MobileApplication',
        name: 'Lychee',
        operatingSystem: 'iOS, Android',
        applicationCategory: 'FinanceApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'ILS'
        },
        downloadUrl: [environment.appStoreUrl, environment.playStoreUrl]
      }
    ]);
  }
}
