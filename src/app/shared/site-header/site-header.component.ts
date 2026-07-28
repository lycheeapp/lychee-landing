import { Component, EventEmitter, HostListener, Inject, Input, OnDestroy, Output, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LandingCta, LandingNavLink, LocalizedString } from '../../core/models/landing-page.model';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.scss'
})
export class SiteHeaderComponent implements OnDestroy {
  @Input() logoFullUrl = 'assets/landing/lychee-logo.svg';
  @Input() logoMarkUrl = 'assets/landing/lychee-mark.svg';
  @Input() links: LandingNavLink[] = [];
  @Input() cta: LandingCta | null = null;
  @Input() langLabel: LocalizedString | string = 'English';
  @Input() locale: 'ar' | 'en' = 'ar';
  @Input() variant: 'marketing' | 'legal' = 'marketing';
  @Input() legalActive: string | null = null;

  @Output() langToggle = new EventEmitter<void>();

  menuOpen = false;
  private previouslyFocused: HTMLElement | null = null;
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

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

  toggleMenu(): void {
    this.menuOpen ? this.closeMenu() : this.openMenu();
  }

  openMenu(): void {
    if (!this.isBrowser) {
      return;
    }
    this.menuOpen = true;
    this.previouslyFocused = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      const panel = document.getElementById('mobile-nav-panel');
      const first = panel?.querySelector<HTMLElement>('a, button');
      first?.focus();
    }, 0);
  }

  closeMenu(): void {
    if (!this.menuOpen) {
      return;
    }
    this.menuOpen = false;
    if (this.isBrowser) {
      document.body.style.overflow = '';
      this.previouslyFocused?.focus();
    }
    this.previouslyFocused = null;
  }

  onNavClick(): void {
    this.closeMenu();
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.isBrowser || !this.menuOpen) {
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeMenu();
      return;
    }
    if (event.key === 'Tab') {
      this.trapFocus(event);
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (!this.isBrowser || !this.menuOpen) {
      return;
    }
    if (window.matchMedia('(min-width: 641px)').matches) {
      this.closeMenu();
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      document.body.style.overflow = '';
    }
  }

  private trapFocus(event: KeyboardEvent): void {
    const panel = document.getElementById('mobile-nav-panel');
    if (!panel) {
      return;
    }
    const focusable = Array.from(
      panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
    ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);
    if (!focusable.length) {
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
}
