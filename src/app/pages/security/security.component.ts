import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LegalPageShellComponent } from '../../shared/legal-page-shell/legal-page-shell.component';
import { LocaleService, LandingLocale } from '../../core/services/locale/locale.service';
import { SeoService } from '../../core/services/seo/seo.service';
import { L } from '../../core/models/landing-page.model';

@Component({
  selector: 'app-security',
  standalone: true,
  imports: [CommonModule, RouterModule, LegalPageShellComponent],
  templateUrl: './security.component.html',
  styleUrl: '../../legal/legal-page.scss'
})
export class SecurityComponent implements OnInit, OnDestroy {
  locale: LandingLocale = 'ar';

  constructor(
    private localeService: LocaleService,
    private seo: SeoService,
    private route: ActivatedRoute,
    private router: Router
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
      title: L('الأمان — ليتشي', 'Security — Lychee'),
      description: L(
        'كيف نحمي بياناتك ومدفوعاتك على ليتشي — التشفير، الشركاء، وإطار سلطة النقد.',
        'How Lychee protects your data and payments — encryption, partners, and PMA oversight.'
      ),
      path: '/security'
    }, this.locale);
  }
}
