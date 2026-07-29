import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LegalPageShellComponent } from '../../shared/legal-page-shell/legal-page-shell.component';
import { LocaleService, LandingLocale } from '../../core/services/locale/locale.service';
import { SeoService } from '../../core/services/seo/seo.service';
import { L } from '../../core/models/landing-page.model';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule, RouterModule, LegalPageShellComponent],
  templateUrl: './careers.component.html',
  styleUrl: '../../legal/legal-page.scss'
})
export class CareersComponent implements OnInit, OnDestroy {
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
      title: L('الوظائف — ليتشي', 'Careers — Lychee'),
      description: L(
        'انضم إلى فريق ليتشي وابنِ منصّة المدفوعات لفلسطين.',
        'Join the Lychee team and help build a payments platform for Palestine.'
      ),
      path: '/careers'
    }, this.locale);
  }
}
