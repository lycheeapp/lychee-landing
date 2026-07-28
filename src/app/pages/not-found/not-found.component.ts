import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LegalPageShellComponent } from '../../shared/legal-page-shell/legal-page-shell.component';
import { LocaleService, LandingLocale } from '../../core/services/locale/locale.service';
import { SeoService } from '../../core/services/seo/seo.service';
import { L } from '../../core/models/landing-page.model';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule, LegalPageShellComponent],
  template: `
    <app-legal-page-shell
      [locale]="locale"
      activePath=""
      (langToggle)="toggleLocale()">
      <div class="legal-hero" style="text-align:center">
        <span class="eyebrow">404</span>
        <h1>{{ locale === 'ar' ? 'الصفحة غير موجودة' : 'Page not found' }}</h1>
        <p class="meta">
          {{ locale === 'ar'
            ? 'الرابط قد يكون قديمًا أو مكتوبًا بشكل خاطئ.'
            : 'The link may be outdated or mistyped.' }}
        </p>
        <div style="margin-top:28px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
          <a class="btn btn-primary" routerLink="/">{{ locale === 'ar' ? 'العودة للرئيسية' : 'Back home' }}</a>
          <a class="btn btn-outline" routerLink="/faq">{{ locale === 'ar' ? 'الأسئلة الشائعة' : 'FAQ' }}</a>
          <a class="btn btn-outline" routerLink="/" fragment="contact">{{ locale === 'ar' ? 'تواصل معنا' : 'Contact' }}</a>
        </div>
      </div>
    </app-legal-page-shell>
  `,
  styleUrl: '../../legal/legal-page.scss'
})
export class NotFoundComponent implements OnInit {
  locale: LandingLocale = 'ar';

  constructor(
    private localeService: LocaleService,
    private seo: SeoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.locale = this.localeService.resolveInitial(this.route);
    this.seo.apply({
      title: L('الصفحة غير موجودة — ليتشي', 'Page not found — Lychee'),
      description: L('تعذّر العثور على الصفحة المطلوبة.', 'The requested page could not be found.'),
      path: '/404'
    }, this.locale);
  }

  toggleLocale(): void {
    this.locale = this.localeService.toggle(this.router);
    this.seo.apply({
      title: L('الصفحة غير موجودة — ليتشي', 'Page not found — Lychee'),
      description: L('تعذّر العثور على الصفحة المطلوبة.', 'The requested page could not be found.'),
      path: '/404'
    }, this.locale);
  }
}
