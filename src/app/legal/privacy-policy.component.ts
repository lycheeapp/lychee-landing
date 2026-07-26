import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

export type LegalLocale = 'ar' | 'en';

const LANG_KEY = 'lychee_lang';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './legal-page.scss',
  encapsulation: ViewEncapsulation.None
})
export class PrivacyPolicyComponent implements OnInit, OnDestroy {
  locale: LegalLocale = 'ar';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.locale = this.resolveInitialLocale();
    this.applyLocale(this.locale);
  }

  ngOnDestroy() {
    document.documentElement.removeAttribute('dir');
  }

  toggleLocale() {
    this.locale = this.locale === 'ar' ? 'en' : 'ar';
    this.applyLocale(this.locale);
    try {
      localStorage.setItem(LANG_KEY, this.locale);
    } catch (e) {}
  }

  private resolveInitialLocale(): LegalLocale {
    const q = this.route.snapshot.queryParamMap.get('lang');
    if (q === 'ar' || q === 'en') {
      return q;
    }
    try {
      const stored = localStorage.getItem(LANG_KEY);
      if (stored === 'ar' || stored === 'en') {
        return stored;
      }
    } catch (e) {}
    return 'ar';
  }

  private applyLocale(locale: LegalLocale) {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.title = locale === 'ar'
      ? 'سياسة الخصوصية — ليتشي تِك'
      : 'Privacy Policy — Lychee Tech';
  }
}
