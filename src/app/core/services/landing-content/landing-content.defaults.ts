import {
  LandingContent,
  L
} from '../../models/landing-page.model';
import { environment } from '../../../../environments/environment';

const ASSET = 'assets/landing';

export const LANDING_CONTENT_DEFAULTS: LandingContent = {
  seo: {
    title: L('ليتشي — تطبيق واحد للدفع والتحصيل', 'Lychee — One app for paying and getting paid'),
    description: L(
      'ليتشي هي مجموعة من قنوات الدفع مصمّمة لفلسطين — أرسِل، وادفع، واستلم الدفعات بكل ثقة، من هاتفك.',
      'Lychee is a payments platform built for Palestine — send, spend, and get paid with confidence, right from your phone.'
    ),
    ogImage: ASSET + '/og-image.png'
  },
  langSwitch: L('English', 'العربية'),
  nav: {
    logoFullUrl: ASSET + '/lychee-logo.svg',
    logoMarkUrl: ASSET + '/lychee-mark.svg',
    links: [
      { label: L('الأفراد', 'Personal'), href: '/#consumer' },
      { label: L('الأعمال', 'Business'), href: '/#merchant' },
      { label: L('المطوّرون', 'Developers'), href: '/#developers' },
      { label: L('تواصل معنا', 'Contact'), href: '/#contact' }
    ],
    cta: { label: L('حمّل ليتشي', 'Get Lychee'), href: '/#closer' }
  },
  hero: {
    eyebrow: L('مدفوعات لفلسطين', 'Payments for Palestine'),
    title: L(
      'تطبيقٌ واحد للدفع، والتحصيل، وكلّ ما بينهما.',
      'One app for paying, getting paid, and everything in between.'
    ),
    subtitle: L(
      'ليتشي هي مجموعة من قنوات الدفع مصمّمة لفلسطين — أرسِل، وادفع، واستلم الدفعات بكل ثقة، من هاتفك.',
      'Lychee is a payments platform built for Palestine — send, spend, and get paid with confidence, right from your phone.'
    ),
    ctaConsumer: { label: L('حمّل التطبيق', 'Download the app'), href: '/#closer' },
    ctaMerchant: {
      label: L('ابدأ بقبول المدفوعات', 'Start accepting payments'),
      href: '#whatsapp-lead:start_payments'
    },
    trustLabel: L('موثوق ومؤمَّن من', 'Trusted & secured by'),
    trustLogos: [
      { url: ASSET + '/pma-logo.png', alt: L('سلطة النقد الفلسطينية', 'Palestine Monetary Authority') },
      { url: ASSET + '/bop-logo.png', alt: L('بنك فلسطين', 'Bank of Palestine') },
      { url: ASSET + '/cybersource-logo.png', alt: L('CyberSource', 'CyberSource — secured') }
    ],
    phoneScreenshotAr: ASSET + '/app-home-ar.png',
    phoneScreenshotEn: ASSET + '/app-home-en.png',
    phoneScreenshotAlt: L(
      'شاشة تطبيق ليتشي الرئيسية — الرصيد والقسائم والخدمات',
      'Lychee app home screen — balance, vouchers and services'
    ),
    taxiImageUrl: ASSET + '/hero-taxi.png',
    taxiImageAlt: L('سيارة أجرة ليتشي الصفراء', 'Lychee yellow taxi'),
    taxiPinUrl: ASSET + '/hero-taxi-pin.png',
    taxiPinAlt: L('دبوس موقع سيارة أجرة', 'Taxi location pin'),
    partnership: {
      kicker: L('بالشراكة مع', 'In Partnership with'),
      name: L('بنك فلسطين', 'Bank of Palestine'),
      markUrl: ASSET + '/bop-card-mark.png',
      markAlt: L('شعار بنك فلسطين', 'Bank of Palestine logo')
    }
  },
  howItWorks: {
    eyebrow: L('كيف يعمل', 'How it works'),
    title: L('ثلاث خطوات. ثم أنت جاهز.', 'Three steps. Then you are set.'),
    subtitle: L(
      'من التحميل إلى أول عملية دفع — في دقائق.',
      'From download to your first payment — in minutes.'
    ),
    steps: [
      {
        number: '01',
        title: L('حمّل التطبيق', 'Download the app'),
        body: L('من App Store أو Google Play وافتح حسابك خلال دقائق.', 'From the App Store or Google Play — open your account in minutes.')
      },
      {
        number: '02',
        title: L('أنشئ قسيمة', 'Load a voucher'),
        body: L('أنشئ ون‑باي أو اشحن رصيدك بالطريقة التي تناسبك.', 'Create a OnePay voucher or top up however works for you.')
      },
      {
        number: '03',
        title: L('ادفع في كل مكان', 'Pay anywhere'),
        body: L('في التاكسي، السوق، الملاعب، العيادات — وكل ما بينهما.', 'At taxis, markets, courts, clinics — and everything in between.')
      }
    ]
  },
  faqTeaser: {
    eyebrow: L('أسئلة شائعة', 'FAQ'),
    title: L('إجابات سريعة قبل أن تبدأ.', 'Quick answers before you start.'),
    items: [
      {
        question: L('هل ليتشي بنك؟', 'Is Lychee a bank?'),
        answer: L(
          'لا. ليتشي منصّة تقنية ومدفوعات — وليست بنكًا. الأرصدة والقسائم ليست ودائع مصرفية.',
          'No. Lychee is a technology and payments platform — not a bank. Balances and vouchers are not bank deposits.'
        )
      },
      {
        question: L('كيف أبدأ كتاجر؟', 'How do I start as a merchant?'),
        answer: L(
          'أنشئ حساب تاجر عبر بوابة المتجر، ثم فعّل روابط الدفع أو واتساب باي خلال دقائق.',
          'Create a merchant account via the store portal, then enable payment links or WhatsApp Pay in minutes.'
        )
      },
      {
        question: L('هل بياناتي آمنة؟', 'Is my data safe?'),
        answer: L(
          'نعم. نعتمد تشفيرًا وشراكات موثوقة (منها CyberSource وبنك فلسطين) ونخضع لإطار سلطة النقد.',
          'Yes. We use encryption and trusted partners (including CyberSource and Bank of Palestine) under PMA oversight.'
        )
      }
    ],
    cta: { label: L('عرض كل الأسئلة', 'See all FAQs'), href: '/faq' }
  },
  consumer: {
    eyebrow: L('لك أنت', 'For you'),
    title: L('يومك كلّه، في تطبيقٍ واحد.', 'Your whole day, one payments app.'),
    subtitle: L(
      'من قهوة الصباح إلى حجز الملعب مساءً — كل شيء يبدأ من ليتشي.',
      'From the morning coffee to booking a court at night — it all starts in Lychee.'
    ),
    onepay: {
      tag: L('ون‑باي', 'OnePay'),
      title: L('أنشئ قسيمة مرّة واحدة. وادفع بها في كل مكان.', 'Create a voucher once. Pay with it everywhere.'),
      body: L(
        'اشحن قسيمة ون‑باي واستخدمها مرارًا وتكرارًا — في السوق، في التاكسي، أو مع صديق. دون بطاقة ودون تعقيد.',
        'Load a OnePay voucher and reuse it again and again — at the market, in a taxi, or with a friend. No card, no fuss.'
      ),
      demoCode: 'LY 4829 3310',
      demoAmount: '200'
    },
    paytag: {
      tag: L('للأهل', 'For parents'),
      title: L('سلّمها لأولادك. وتابِع مشترياتهم.', 'Hand it to your kids. See what they buy.'),
      body: L(
        'بيه‑تاغ بطاقة دفعٍ فعلية للمدرسة والمصروف اليومي. اشحنها، وحدّد سقفًا للإنفاق، وتابِع كل عملية شراء لحظةً بلحظة من هاتفك.',
        'PayTag is a physical payment tag for school and allowance. Top it up, set a spending limit, and follow every purchase in real time from your phone.'
      ),
      chip: L('بطاقة فعلية', 'Physical tag'),
      imageUrl: ASSET + '/paytag-tag.png'
    },
    tiles: [
      { icon: 'taxi', title: L('تاكسي', 'Taxi'), description: L('اطلب مشوارك من التطبيق', 'Request rides in-app') },
      { icon: 'market', title: L('السوق', 'Market'), description: L('اطلب من المتجر وللتوصيل', 'Order in-store & delivery') },
      { icon: 'courts', title: L('ملاعب', 'Courts'), description: L('احجز ملاعب في أنحاء الضفة', 'Reserve courts across the West Bank') },
      { icon: 'villa', title: L('فلل', 'Villas'), description: L('احجز فِللاً في أنحاء الضفة', 'Book villas across the West Bank') },
      { icon: 'clinic', title: L('عيادات', 'Clinics'), description: L('احجز وادفع زيارات العيادة', 'Book & pay for clinic visits') }
    ],
    cta: { label: L('اكتشف التطبيق', 'Explore the app'), href: '/#closer' }
  },
  merchant: {
    eyebrow: L('لعملك', 'For your business'),
    title: L(
      'احصل على أموالك، مهما كانت طريقة دفع عملائك.',
      'Get paid, however your customers pay.'
    ),
    subtitle: L(
      'ابدأ بأبسط أداة، ثم وسّع كما ينمو عملك.',
      'Start with the simplest tool, then grow into the rest.'
    ),
    paymentLinks: {
      tag: L('الأكثر بساطة', 'Simplest to start'),
      title: L('روابط الدفع', 'Payment Links'),
      body: L(
        'أنشئ رابطًا، وشاركه أينما شئت، واقبض خلال ثوانٍ — دون موقع ولا برمجة.',
        'Create a link, share it anywhere, and get paid in seconds — no website, no code.'
      ),
      demoUrl: 'pay.lychee.ps/r/8fk2',
      demoAmount: '150.00',
      amountLabel: L('المبلغ المستحق', 'Amount due'),
      methodsLabel: L('يقبل', 'Accepts'),
      methods: [
        L('قسائم ليتشي', 'Lychee vouchers'),
        L('بطاقات ائتمان', 'Credit cards'),
        L('بطاقات خصم', 'Debit cards')
      ]
    },
    whatsappPay: {
      tag: L('ما يميّزنا', 'What sets us apart'),
      title: L('الدفع عبر واتساب', 'WhatsApp Pay'),
      body: L(
        'اقبل المدفوعات حيث يوجد عملاؤك أصلاً — داخل المحادثة مباشرةً.',
        'Accept payments right where your customers already are — inside the chat.'
      ),
      imageUrl: ASSET + '/whatsapp-pay.png',
      imageAlt: L(
        'محادثة واتساب مع Lychee Pay — تأكيد دفعة داخل المحادثة',
        'WhatsApp chat with Lychee Pay — confirming a payment inside the conversation'
      )
    },
    tiles: [
      {
        icon: 'voucher',
        title: L('القسائم', 'Vouchers'),
        description: L('اقبل أموالاً مدفوعة مسبقًا من عملائك', 'Accept prepaid money from customers')
      },
      {
        icon: 'directpay',
        title: L('الدفع المباشر', 'Direct Pay'),
        description: L('إعداد نظام فوترة مجاني للأعمال الصغيرة', 'Free biller-system setup for small businesses')
      },
      {
        icon: 'sell',
        title: L('بِع على سوق ليتشي', 'Sell on Lychee Market'),
        description: L('صِل إلى المتسوّقين عبر التطبيق', 'Reach shoppers across the app')
      }
    ],
    clinic: {
      title: L('أدِر عيادتك على ليتشي', 'Run your clinic on Lychee'),
      body: L(
        'حجوزات، ومدفوعات داخل التطبيق، وتذكيرات ذكية — في مكانٍ واحد.',
        'Bookings, in-app payments, and smart reminders — all in one place.'
      ),
      cta: { label: L('اعرف المزيد', 'Learn more'), href: '#whatsapp-lead:clinic' }
    },
    cta: {
      label: L('أنشئ حساب تاجر', 'Create a merchant account'),
      href: '#whatsapp-lead:create_account'
    }
  },
  developers: {
    eyebrow: L('المطوّرون', 'Developers'),
    title: L(
      'اقبل مدفوعات ليتشي في منصّتك خلال دقائق.',
      'Accept Lychee payments in your platform in minutes.'
    ),
    body: L(
      'حزمة تطوير نظيفة وواجهة REST، مع القسائم والبطاقات وويب‑هوكس جاهزة من الصندوق.',
      'A clean SDK and REST API, with vouchers, cards, and webhooks out of the box.'
    ),
    cta: { label: L('اقرأ الوثائق', 'Read the docs'), href: environment.docsUrl },
    codeCaption: L('قبول دفعة بقسيمة ليتشي', 'Accepting a Lychee voucher payment'),
    codeSample:
      "import { Lychee } from '@lychee/sdk'\n\n" +
      'const lychee = new Lychee(process.env.LYCHEE_KEY)\n\n' +
      '// charge a Lychee voucher — settles to ILS\n' +
      'const payment = await lychee.payments.create({\n' +
      '  amount:   150,\n' +
      "  currency: 'ILS',\n" +
      "  method:   'voucher',\n" +
      "  voucher:  'LY-4829-3310',\n" +
      '})\n\n' +
      "console.log(payment.status) // 'succeeded'"
  },
  contact: {
    eyebrow: L('تواصل معنا', 'Contact us'),
    title: L('فريقنا هنا، ويتحدّث لغتك.', 'Our team is here — and speaks your language.'),
    subtitle: L(
      'سؤال، أو شراكة، أو دعم لحسابك — راسلنا وسنعود إليك خلال يوم عمل واحد.',
      "A question, a partnership, or support for your account — send us a message and we'll get back within one business day."
    ),
    channels: [
      {
        type: 'email',
        label: L('البريد الإلكتروني', 'Email'),
        value: L(environment.contactEmail, environment.contactEmail),
        href: 'mailto:' + environment.contactEmail
      },
      {
        type: 'phone',
        label: L('الهاتف', 'Phone'),
        value: L('+970 598 999 890', '+970 598 999 890'),
        href: 'tel:+970598999890'
      },
      {
        type: 'whatsapp',
        label: L('واتساب', 'WhatsApp'),
        value: L('دعم مباشر عبر المحادثة', 'Live support over chat'),
        href: 'https://wa.me/970598999890'
      },
      {
        type: 'hq',
        label: L('المكتب الرئيسي', 'Head office'),
        value: L('رام الله، الضفة الغربية', 'Ramallah, West Bank'),
        href: ''
      }
    ],
    form: {
      nameLabel: L('الاسم', 'Name'),
      emailLabel: L('البريد الإلكتروني', 'Email'),
      topicLabel: L('الموضوع', 'Topic'),
      messageLabel: L('رسالتك', 'Your message'),
      sendLabel: L('أرسِل الرسالة', 'Send message'),
      sendingLabel: L('جارٍ الإرسال…', 'Sending…'),
      privacyNote: L(
        'بياناتك محميّة ولن تُشارك مع أي طرف ثالث.',
        'Your details are protected and never shared with third parties.'
      ),
      consentLabel: L('أوافق على معالجة بياناتي وفق', 'I agree to the processing of my data under the'),
      consentLinkLabel: L('سياسة الخصوصية', 'Privacy Policy'),
      successMessage: L(
        'شكرًا لك. استلمنا رسالتك وسنعود إليك خلال يوم عمل واحد.',
        "Thank you. We've received your message and will get back within one business day."
      ),
      errorMessage: L(
        'تعذّر إرسال الرسالة. حاول مرة أخرى أو راسلنا مباشرة عبر البريد.',
        'Could not send your message. Please try again or email us directly.'
      ),
      rateLimitMessage: L(
        'أرسلتَ عددًا كبيرًا من الرسائل. حاول لاحقًا.',
        'Too many messages sent. Please try again later.'
      ),
      requiredError: L('هذا الحقل مطلوب', 'This field is required'),
      emailError: L('أدخل بريدًا إلكترونيًا صالحًا', 'Enter a valid email address')
    }
  },
  closer: {
    title: L('أكثر من مجرّد مدفوعات.', 'More than payments.'),
    body: L(
      'ليتشي هو تطبيق يومك في الضفة الغربية — تدفع، وتقبض، وكل ما بينهما.',
      'Lychee is the everyday app for the West Bank — you pay, you get paid, and everything in between.'
    ),
    ecoIcons: ['taxi', 'market', 'courts', 'villa', 'clinic', 'voucher', 'sell'],
    appStore: {
      top: L('حمّله من', 'Download on the'),
      bottom: L('App Store', 'App Store'),
      href: environment.appStoreUrl
    },
    playStore: {
      top: L('احصل عليه من', 'Get it on'),
      bottom: L('Google Play', 'Google Play'),
      href: environment.playStoreUrl
    },
    ctaConsumer: {
      label: L('حمّل التطبيق', 'Download the app'),
      href: environment.appStoreUrl
    },
    ctaMerchant: {
      label: L('ابدأ بقبول المدفوعات', 'Start accepting payments'),
      href: '#whatsapp-lead:start_payments'
    }
  },
  footer: {
    logoLightUrl: ASSET + '/lychee-logo-light.svg',
    tagline: L('غيرنا مستقبل الدفع', 'We Changed the Future of Payments.'),
    columns: [
      {
        title: L('المنتج', 'Product'),
        links: [
          { label: L('للأفراد', 'Personal'), href: '/#consumer' },
          { label: L('للأعمال', 'Business'), href: '/#merchant' },
          { label: L('للمطوّرون', 'Developers'), href: '/#developers' },
          { label: L('الأسئلة الشائعة', 'FAQ'), href: '/faq' }
        ]
      },
      {
        title: L('الشركة', 'Company'),
        links: [
          { label: L('من نحن', 'About'), href: '/about' },
          { label: L('الوظائف', 'Careers'), href: '/careers' },
          { label: L('تواصل معنا', 'Contact'), href: '/#contact' }
        ]
      },
      {
        title: L('قانوني', 'Legal'),
        links: [
          { label: L('الشروط', 'Terms'), href: '/terms' },
          { label: L('الخصوصية', 'Privacy'), href: '/privacy' },
          { label: L('الأمان', 'Security'), href: '/security' },
          { label: L('ملفات تعريف الارتباط', 'Cookies'), href: '/cookies' }
        ]
      }
    ],
    copyright: L('© 2026 ليتشي. جميع الحقوق محفوظة.', '© 2026 Lychee. All rights reserved.'),
    madeIn: L('صُنع في فلسطين 🇵🇸', 'Made in Palestine 🇵🇸')
  }
};
