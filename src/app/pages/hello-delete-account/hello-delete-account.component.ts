import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LegalPageShellComponent } from '../../shared/legal-page-shell/legal-page-shell.component';
import { LocaleService, LandingLocale } from '../../core/services/locale/locale.service';
import { SeoService } from '../../core/services/seo/seo.service';
import { L } from '../../core/models/landing-page.model';

/**
 * How to delete a Lychee Hello account, in the app or without it.
 *
 * Google Play requires apps that let people create an account to link a web page where the account
 * can be deleted without reinstalling the app; this is the page entered in Play Console (Data safety).
 * It must name the app and the developer and keep the deletion route easy to find.
 */
@Component({
  selector: 'app-hello-delete-account',
  standalone: true,
  imports: [CommonModule, RouterModule, LegalPageShellComponent],
  templateUrl: './hello-delete-account.component.html'
})
export class HelloDeleteAccountComponent implements OnInit, OnDestroy {
  locale: LandingLocale = 'ar';

  /** Pre-filled email for a deletion request made without the app. */
  readonly mailto =
    'mailto:info@lycheeapp.org' +
    '?subject=' + encodeURIComponent('Delete my Lychee Hello account / حذف حسابي في Lychee Hello') +
    '&body=' + encodeURIComponent(
      'Mobile number of the Lychee Hello account / رقم الهاتف المسجّل في Lychee Hello:\n\n'
    );

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
      title: L('حذف حسابك في Lychee Hello — ليتشي تِك', 'Delete your Lychee Hello account — Lychee Tech'),
      description: L(
        'كيف تحذف حسابك في تطبيق Lychee Hello من التطبيق أو بدونه، وما الذي يُحذف وما الذي نحتفظ به.',
        'How to delete your Lychee Hello account, in the app or without it, and what is deleted and kept.'
      ),
      path: '/hello/delete-account'
    }, this.locale);
  }
}
