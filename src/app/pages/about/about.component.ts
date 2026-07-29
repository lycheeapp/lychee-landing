import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LegalPageShellComponent } from '../../shared/legal-page-shell/legal-page-shell.component';
import { LocaleService, LandingLocale } from '../../core/services/locale/locale.service';
import { SeoService } from '../../core/services/seo/seo.service';
import { L, LocalizedString } from '../../core/models/landing-page.model';

interface AboutPillar {
  title: LocalizedString;
  body: LocalizedString;
}

interface Leader {
  name: LocalizedString;
  role: LocalizedString;
  bio: LocalizedString;
  imageUrl: string;
  imageAlt: LocalizedString;
}

interface TrustLogo {
  url: string;
  alt: LocalizedString;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, LegalPageShellComponent],
  templateUrl: './about.component.html',
  styleUrls: ['../../legal/legal-page.scss', './about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {
  locale: LandingLocale = 'ar';

  pillars: AboutPillar[] = [
    {
      title: L('للناس هنا', 'Built for here'),
      body: L(
        'نصمم حول طريقة الدفع والتحصيل في فلسطين — القسائم، واتساب، والخدمات الحضورية — لا أنماط مستوردة.',
        'Designed around how people already pay and get paid in Palestine — vouchers, WhatsApp, and in-person services — not imported patterns.'
      )
    },
    {
      title: L('ثقة أولاً', 'Trust first'),
      body: L(
        'نعمل مع بنك فلسطين وCyberSource، وفي إطار سلطة النقد الفلسطينية — لأن المال يتطلّب دقة قبل الذكاء.',
        'We work with Bank of Palestine and CyberSource, under the Palestine Monetary Authority — because money demands correctness before cleverness.'
      )
    },
    {
      title: L('منصّة واحدة', 'One platform'),
      body: L(
        'تطبيق للأفراد، أدوات للتجّار، وواجهات برمجة نظيفة للمطوّرين — كلّها في منظومة واحدة.',
        'One consumer app, one merchant toolkit, and clean APIs for developers — one coherent system.'
      )
    }
  ];

  leadership: Leader[] = [
    {
      name: L('طلال رداد', 'Talal Raddad'),
      role: L('المؤسس والرئيس التنفيذي', 'Founder & Chief Executive Officer'),
      bio: L(
        'رائد أعمال فلسطيني في التكنولوجيا المالية والمنتجات الرقمية والذكاء الاصطناعي، بخبرة تتجاوز خمسة عشر عامًا في تأسيس الشركات وتطوير المنتجات. أسّس ليتشي عام 2022 لبناء حلول دفع رقمية تعزّز الشمول المالي، ويقود رؤيتها ونموّها. أسّس أيضًا شركات منها MaalChat وHooks Hub وTriggerTech، ويشغل رئاسة مجلس إدارة مؤسسة ريادي تك.',
        'A Palestinian entrepreneur in fintech, digital products, and AI, with more than fifteen years founding companies and building products that combine innovation with real economic impact. He founded Lychee in 2022 to deliver digital payment solutions that expand financial inclusion, and leads its vision and growth. He has also founded ventures including MaalChat, Hooks Hub, and TriggerTech, and chairs the board of Riyadi Tech.'
      ),
      imageUrl: 'assets/team/talal-raddad.jpeg',
      imageAlt: L('صورة طلال رداد', 'Portrait of Talal Raddad')
    },
    {
      name: L('عمّار عكر', 'Ammar Aker'),
      role: L('رئيس مجلس الإدارة', 'Chairman of the Board'),
      bio: L(
        'شريك مؤسّس لليتشي ورئيس مجلس إدارتها. من أبرز القيادات الاقتصادية في فلسطين؛ شغل منصب الرئيس التنفيذي لمجموعة الاتصالات الفلسطينية (Paltel Group)، ويشغل حاليًا رئاسة مجلس إدارة هيئة سوق رأس المال الفلسطينية، ويتمتع بخبرة واسعة في قيادة المؤسسات الكبرى والاستثمار والتطوير المؤسسي.',
        'Co-founder and Chairman of Lychee. One of Palestine’s leading economic executives; he previously served as CEO of Palestine Telecom Group (Paltel Group) and currently chairs the Palestine Capital Market Authority. He brings deep experience in leading major institutions, investment, and organizational development.'
      ),
      imageUrl: 'assets/team/ammar-aker.jpg',
      imageAlt: L('صورة عمّار عكر', 'Portrait of Ammar Aker')
    }
  ];

  trustLogos: TrustLogo[] = [
    {
      url: 'assets/landing/pma-logo.png',
      alt: L('سلطة النقد الفلسطينية', 'Palestine Monetary Authority')
    },
    {
      url: 'assets/landing/bop-logo.png',
      alt: L('بنك فلسطين', 'Bank of Palestine')
    },
    {
      url: 'assets/landing/cybersource-logo.png',
      alt: L('CyberSource', 'CyberSource')
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

  t(value: LocalizedString): string {
    return value[this.locale];
  }

  toggleLocale(): void {
    this.locale = this.localeService.toggle(this.router);
    this.applySeo();
  }

  private applySeo(): void {
    this.seo.apply(
      {
        title: L('من نحن — ليتشي', 'About — Lychee'),
        description: L(
          'تعرّف على قصة ليتشي — أسّسها طلال رداد عام 2022 مع رئيس مجلس الإدارة عمّار العكر — منصّة مدفوعات فلسطينية للشمول المالي.',
          'Learn Lychee’s story — founded in 2022 by Talal Raddad with Chairman Ammar Aker — a Palestinian payments platform for financial inclusion.'
        ),
        path: '/about'
      },
      this.locale
    );
  }
}
