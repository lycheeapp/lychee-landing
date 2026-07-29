import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LegalPageShellComponent } from '../shared/legal-page-shell/legal-page-shell.component';
import { LocaleService, LandingLocale } from '../core/services/locale/locale.service';
import { SeoService } from '../core/services/seo/seo.service';
import { L } from '../core/models/landing-page.model';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, RouterModule, LegalPageShellComponent],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './legal-page.scss',
  encapsulation: ViewEncapsulation.None
})
export class PrivacyPolicyComponent implements OnInit, OnDestroy {
  locale: LandingLocale = 'ar';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private localeService: LocaleService,
    private seo: SeoService
  ) {}

  ngOnInit(): void {
    this.locale = this.localeService.resolveInitial(this.route);
    this.applySeo();
  }

  ngOnDestroy(): void {
    this.seo.clearJsonLd();
  }

  toggleLocale(): void {
    this.locale = this.localeService.toggle(this.router);
    this.applySeo();
  }

  private applySeo(): void {
    this.seo.apply({
      title: L('سياسة الخصوصية — ليتشي تِك', 'Privacy Policy — Lychee Tech'),
      description: L(
        'كيف تجمع ليتشي بياناتك الشخصية وتستخدمها وتحميها.',
        'How Lychee collects, uses, and protects your personal information.'
      ),
      path: '/privacy'
    }, this.locale);
  }
}
