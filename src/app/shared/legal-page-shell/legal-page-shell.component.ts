import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnChanges,
  Output,
  PLATFORM_ID,
  SimpleChanges
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SiteHeaderComponent } from '../site-header/site-header.component';
import { SiteFooterComponent } from '../site-footer/site-footer.component';
import { CookieBannerComponent } from '../cookie-banner/cookie-banner.component';
import { LandingNavLink, LocalizedString } from '../../core/models/landing-page.model';
import { LANDING_CONTENT_DEFAULTS } from '../../core/services/landing-content/landing-content.defaults';

interface TocItem {
  id: string;
  label: string;
}

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
      <app-site-footer
        [logoLightUrl]="footer.logoLightUrl"
        [tagline]="footer.tagline"
        [columns]="footer.columns"
        [copyright]="footer.copyright"
        [madeIn]="footer.madeIn"
        [langLabel]="langLabel"
        [locale]="locale"
        (langToggle)="langToggle.emit()">
      </app-site-footer>
      <button
        *ngIf="toc && showTop"
        type="button"
        class="legal-top"
        (click)="scrollTop()"
        [attr.aria-label]="locale === 'ar' ? 'العودة إلى الأعلى' : 'Back to top'">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg>
      </button>
      <app-cookie-banner [locale]="locale"></app-cookie-banner>
    </div>
  `
})
export class LegalPageShellComponent implements AfterViewInit, OnChanges {
  @Input() locale: 'ar' | 'en' = 'ar';
  @Input() activePath = '';
  @Input() wide = false;
  /** Build an "On this page" list from the page's section headings (long policies). */
  @Input() toc = false;
  @Input() langLabel: LocalizedString = { ar: 'English', en: 'العربية' };
  @Output() langToggle = new EventEmitter<void>();

  readonly footer = LANDING_CONTENT_DEFAULTS.footer;
  showTop = false;

  navLinks: LandingNavLink[] = [
    { label: { ar: 'الرئيسية', en: 'Home' }, href: '/' },
    { label: { ar: 'من نحن', en: 'About' }, href: '/about' },
    { label: { ar: 'الأمان', en: 'Security' }, href: '/security' },
    { label: { ar: 'سياسة الخصوصية', en: 'Privacy' }, href: '/privacy' },
    { label: { ar: 'الشروط', en: 'Terms' }, href: '/terms' }
  ];

  private readonly isBrowser: boolean;
  private tocEl: HTMLElement | null = null;

  constructor(
    private host: ElementRef<HTMLElement>,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    this.scheduleToc();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['locale'] && !changes['locale'].firstChange) {
      this.scheduleToc();
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.toc || !this.isBrowser) {
      return;
    }
    const next = window.scrollY > 900;
    if (next !== this.showTop) {
      this.showTop = next;
      this.cdr.markForCheck();
    }
  }

  scrollTop(): void {
    if (this.isBrowser) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  /**
   * The policy text is plain template HTML (one block per language, swapped with *ngIf),
   * so the list is built from the rendered <h2>s after each render, in the browser only.
   */
  private scheduleToc(): void {
    if (!this.toc || !this.isBrowser) {
      return;
    }
    setTimeout(() => this.buildToc(), 0);
  }

  private buildToc(): void {
    const root = this.host.nativeElement;
    const body = root.querySelector<HTMLElement>('.legal-body');
    this.tocEl?.remove();
    this.tocEl = null;
    if (!body) {
      return;
    }
    const items: TocItem[] = [];
    body.querySelectorAll<HTMLElement>('h2').forEach((h, i) => {
      if (!h.id) {
        h.id = `section-${i + 1}`;
      }
      items.push({ id: h.id, label: (h.textContent || '').trim() });
    });
    if (items.length < 4) {
      return;
    }

    const doc = root.ownerDocument;
    const details = doc.createElement('details');
    details.className = 'legal-toc';
    const summary = doc.createElement('summary');
    summary.textContent = this.locale === 'ar' ? 'محتويات الصفحة' : 'On this page';
    details.appendChild(summary);
    const list = doc.createElement('ol');
    for (const item of items) {
      const li = doc.createElement('li');
      const a = doc.createElement('a');
      a.href = `#${item.id}`;
      a.textContent = item.label;
      a.addEventListener('click', (event) => {
        event.preventDefault();
        doc.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        details.open = false;
        try {
          history.replaceState(history.state, '', `${location.pathname}${location.search}#${item.id}`);
        } catch {
          /* ignore */
        }
      });
      li.appendChild(a);
      list.appendChild(li);
    }
    details.appendChild(list);
    body.parentElement?.insertBefore(details, body);
    this.tocEl = details;
  }
}
