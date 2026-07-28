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
      name: L('عمّار عكر', 'Ammar Aker'),
      role: L('الرئيس التنفيذي', 'Chief Executive Officer'),
      bio: L(
        'عمّار عكر الرئيس التنفيذي لمجموعة الاتصالات الفلسطينية وعضو مجلس إدارتها. قاد سابقًا جوال كأكبر مشغّل خلوي خاص في فلسطين، ويرأس مجلس إدارة VTEL MEA، ويشغل عضوية مجالس في باديكو القابضة ومجلس أمناء جامعة النجاح. حاصل على بكالوريوس المحاسبة من جامعة إدينبورو في بنسلفانيا وماجستير المحاسبة من جامعة كينت ستيت في أوهايو.',
        'Ammar Aker is CEO of Palestine Telecom Group (Paltel) and a member of its Board of Directors. He previously led Jawwal, Palestine’s first private cellular operator, as CEO. He chairs the Board of VTEL Middle East and Africa, serves on PADICO Holding’s Board and Executive Committee, and is a Trustee of An-Najah National University. He holds a B.S. in Accounting from Edinboro University of Pennsylvania and an M.Sc. in Accounting from Kent State University, Ohio.'
      ),
      imageUrl: 'assets/team/ammar-aker.jpg',
      imageAlt: L('صورة عمّار عكر', 'Portrait of Ammar Aker')
    },
    {
      name: L('طلال رداد', 'Talal Raddad'),
      role: L('الشريك المؤسس', 'Co-Founder'),
      bio: L(
        'طلال قائد تنفيذي في إدارة المنتجات بخبرة تتجاوز 10 سنوات في قيادة الاستراتيجية وإعادة تصميم المنتجات والإطلاقات العالمية عبر تطبيقات الموبايل ومنصات التواصل والتجارة الإلكترونية. يقود الرؤية والتنفيذ لتوسيع منتجات ليتشي وحلول التفاعل الرقمي.',
        'Talal is an execution-oriented product management executive with 10+ years leading product strategy, redesign, and global launches across mobile apps, social platforms, and e-commerce. He drives vision and delivery for Lychee’s product and digital engagement solutions.'
      ),
      imageUrl: 'assets/team/talal-raddad.jpeg',
      imageAlt: L('صورة طلال رداد', 'Portrait of Talal Raddad')
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
          'تعرّف على قصة ليتشي ورسالتها وقيادتها — منصّة مدفوعات لفلسطين بثقة سلطة النقد وشركاء البنوك.',
          'Learn Lychee’s story, mission, and leadership — a payments platform for Palestine, with PMA oversight and bank partners.'
        ),
        path: '/about'
      },
      this.locale
    );
  }
}
