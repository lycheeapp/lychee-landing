import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteHeaderComponent } from '../site-header/site-header.component';
import { SiteFooterComponent } from '../site-footer/site-footer.component';
import { CookieBannerComponent } from '../cookie-banner/cookie-banner.component';
import { LandingNavLink, LocalizedString } from '../../core/models/landing-page.model';

@Component({
  selector: 'app-legal-page-shell',
  standalone: true,
  imports: [CommonModule, SiteHeaderComponent, SiteFooterComponent, CookieBannerComponent],
  template: `
    <div class="legal-page" [class.about-page]="wide">
      <a class="skip-link" href="#main-content">{{ locale === 'ar' ? 'تخطّ إلى المحتوى' : 'Skip to content' }}</a>
      <app-site-header
        variant="legal"
        [locale]="locale"
        [links]="navLinks"
        [langLabel]="langLabel"
        [legalActive]="activePath"
        [cta]="null"
        (langToggle)="langToggle.emit()">
      </app-site-header>
      <main id="main-content" class="legal-wrap" [class.legal-wrap--wide]="wide" tabindex="-1">
        <ng-content></ng-content>
      </main>
      <app-cookie-banner [locale]="locale"></app-cookie-banner>
    </div>
  `,
  styleUrl: '../../legal/legal-page.scss'
})
export class LegalPageShellComponent {
  @Input() locale: 'ar' | 'en' = 'ar';
  @Input() activePath = '';
  @Input() wide = false;
  @Input() langLabel: LocalizedString = { ar: 'English', en: 'العربية' };
  @Output() langToggle = new EventEmitter<void>();

  navLinks: LandingNavLink[] = [
    { label: { ar: 'الرئيسية', en: 'Home' }, href: '/' },
    { label: { ar: 'من نحن', en: 'About' }, href: '/about' },
    { label: { ar: 'الأمان', en: 'Security' }, href: '/security' },
    { label: { ar: 'سياسة الخصوصية', en: 'Privacy' }, href: '/privacy' },
    { label: { ar: 'الشروط', en: 'Terms' }, href: '/terms' }
  ];
}
