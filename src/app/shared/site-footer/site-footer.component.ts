import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  LandingFooterColumn,
  LocalizedString
} from '../../core/models/landing-page.model';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './site-footer.component.html',
  styleUrl: './site-footer.component.scss'
})
export class SiteFooterComponent {
  @Input() logoLightUrl = 'assets/landing/lychee-logo-light.svg';
  @Input() tagline: LocalizedString | string = '';
  @Input() columns: LandingFooterColumn[] = [];
  @Input() copyright: LocalizedString | string = '';
  @Input() madeIn: LocalizedString | string = '';
  @Input() langLabel: LocalizedString | string = 'English';
  @Input() locale: 'ar' | 'en' = 'ar';

  @Output() langToggle = new EventEmitter<void>();

  t(value: LocalizedString | string | undefined | null): string {
    if (!value) {
      return '';
    }
    if (typeof value === 'string') {
      return value;
    }
    return this.locale === 'en' ? value.en : value.ar;
  }

  isExternal(href: string): boolean {
    return !!href && (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:'));
  }

  isAppRoute(href: string): boolean {
    if (!href) {
      return false;
    }
    return href.charAt(0) === '/' && href.indexOf('#') === -1;
  }

  isFragment(href: string): boolean {
    return !!href && (href.startsWith('#') || href.includes('/#'));
  }

  fragmentOf(href: string): string {
    const i = href.indexOf('#');
    return i >= 0 ? href.slice(i + 1) : '';
  }
}
