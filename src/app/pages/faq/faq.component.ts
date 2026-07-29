import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LegalPageShellComponent } from '../../shared/legal-page-shell/legal-page-shell.component';
import { LocaleService, LandingLocale } from '../../core/services/locale/locale.service';
import { SeoService } from '../../core/services/seo/seo.service';
import { L, LocalizedString } from '../../core/models/landing-page.model';

interface FaqEntry {
  q: LocalizedString;
  a: LocalizedString;
  open?: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterModule, LegalPageShellComponent],
  templateUrl: './faq.component.html',
  styleUrl: '../../legal/legal-page.scss'
})
export class FaqComponent implements OnInit, OnDestroy {
  locale: LandingLocale = 'ar';

  items: FaqEntry[] = [
    {
      q: L('هل ليتشي بنك؟', 'Is Lychee a bank?'),
      a: L(
        'لا. ليتشي منصّة تقنية ومدفوعات — وليست بنكًا. الأرصدة والقسائم ليست ودائع مصرفية مؤمَّنة.',
        'No. Lychee is a technology and payments platform — not a bank. Balances and vouchers are not insured bank deposits.'
      )
    },
    {
      q: L('ما هو ون‑باي؟', 'What is OnePay?'),
      a: L(
        'ون‑باي قسيمة مدفوعة مسبقًا يمكنك إنشاؤها واستخدامها مرارًا في المتاجر والتاكسي ومع الأصدقاء داخل منظومة ليتشي.',
        'OnePay is a prepaid voucher you can create and reuse at merchants, in taxis, and with friends across the Lychee ecosystem.'
      )
    },
    {
      q: L('ما هو بيه‑تاغ؟', 'What is PayTag?'),
      a: L(
        'بيه‑تاغ بطاقة دفع فعلية للأهل والأولاد — اشحنها، وحدّد سقفًا، وتابِع المشتريات من التطبيق.',
        'PayTag is a physical payment tag for parents and kids — top it up, set a limit, and track purchases from the app.'
      )
    },
    {
      q: L('كيف أقبل المدفوعات كتاجر؟', 'How do I accept payments as a merchant?'),
      a: L(
        'أنشئ حساب تاجر عبر بوابة المتجر، ثم فعّل روابط الدفع أو واتساب باي أو القسائم حسب احتياجك.',
        'Create a merchant account via the store portal, then enable payment links, WhatsApp Pay, or vouchers as needed.'
      )
    },
    {
      q: L('هل توجد رسوم؟', 'Are there fees?'),
      a: L(
        'بعض الخدمات مجانية للبدء، وبعضها قد يتضمن رسومًا تُعرض قبل التأكيد. تواصل معنا للتفاصيل حسب نشاطك.',
        'Some tools are free to start; others may include fees shown before you confirm. Contact us for details for your business.'
      )
    },
    {
      q: L('كيف أتواصل مع الدعم؟', 'How do I reach support?'),
      a: L(
        'راسل info@lycheeapp.org أو استخدم نموذج التواصل في الصفحة الرئيسية، أو واتساب إن كان متاحًا.',
        'Email info@lycheeapp.org, use the contact form on the homepage, or WhatsApp when available.'
      )
    }
  ];

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

  toggle(item: FaqEntry): void {
    item.open = !item.open;
  }

  t(value: LocalizedString): string {
    return this.locale === 'en' ? value.en : value.ar;
  }

  private applySeo(): void {
    this.seo.apply({
      title: L('الأسئلة الشائعة — ليتشي', 'FAQ — Lychee'),
      description: L(
        'إجابات عن ون‑باي، بيه‑تاغ، حساب التاجر، الرسوم، والدعم.',
        'Answers about OnePay, PayTag, merchant accounts, fees, and support.'
      ),
      path: '/faq'
    }, this.locale);
  }
}
