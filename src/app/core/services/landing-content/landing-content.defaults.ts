import {
  LandingContent,
  L
} from '../../models/landing-page.model';

const ASSET = 'assets/landing';

export const LANDING_CONTENT_DEFAULTS: LandingContent = {
  seo: {
    title: L('ليتشي — تطبيق واحد للدفع والتحصيل', 'Lychee — One app for paying and getting paid')
  },
  langSwitch: L('English', 'العربية'),
  nav: {
    logoFullUrl: ASSET + '/lychee-logo.svg',
    logoMarkUrl: ASSET + '/lychee-mark.svg',
    links: [
      { label: L('الأفراد', 'Personal'), href: '#consumer' },
      { label: L('الأعمال', 'Business'), href: '#merchant' },
      { label: L('المطوّرون', 'Developers'), href: '#developers' },
      { label: L('تواصل معنا', 'Contact'), href: '#contact' }
    ],
    cta: { label: L('حمّل ليتشي', 'Get Lychee'), href: '#closer' }
  },
  hero: {
    eyebrow: L('البوابة الفلسطينية', 'The Palestinian payment gateway'),
    title: L(
      'تطبيقٌ واحد للدفع، والتحصيل، وكلّ ما بينهما.',
      'One app for paying, getting paid, and everything in between.'
    ),
    subtitle: L(
      'ليتشي هي بوابة الدفع المصمّمة لفلسطين والضفة الغربية — أرسِل، وادفع، واستلم الدفعات بكل ثقة، من هاتفك.',
      'Lychee is the payment gateway built for Palestine and the West Bank — send, spend, and get paid with confidence, right from your phone.'
    ),
    ctaConsumer: { label: L('حمّل التطبيق', 'Download the app'), href: '#closer' },
    ctaMerchant: { label: L('ابدأ بقبول المدفوعات', 'Start accepting payments'), href: '#merchant' },
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
    )
  },
  consumer: {
    eyebrow: L('لك أنت', 'For you'),
    title: L('يومك كلّه، في بوابةٍ واحدة.', 'Your whole day, one payment gateway.'),
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
    cta: { label: L('اكتشف التطبيق', 'Explore the app'), href: '#closer' }
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
      cta: { label: L('اعرف المزيد', 'Learn more'), href: '#closer' }
    },
    cta: { label: L('أنشئ حساب تاجر', 'Create a merchant account'), href: '#closer' }
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
    cta: { label: L('اقرأ الوثائق', 'Read the docs'), href: '#' },
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
        value: L('hello@lychee.ps', 'hello@lychee.ps'),
        href: 'mailto:hello@lychee.ps'
      },
      {
        type: 'phone',
        label: L('الهاتف', 'Phone'),
        value: L('+970 2 200 0000', '+970 2 200 0000'),
        href: 'tel:+970022000000'
      },
      {
        type: 'whatsapp',
        label: L('واتساب', 'WhatsApp'),
        value: L('دعم مباشر عبر المحادثة', 'Live support over chat'),
        href: 'https://wa.me/970599000000'
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
      privacyNote: L(
        'بياناتك محميّة ولن تُشارك مع أي طرف ثالث.',
        'Your details are protected and never shared with third parties.'
      )
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
      href: '#'
    },
    playStore: {
      top: L('احصل عليه من', 'Get it on'),
      bottom: L('Google Play', 'Google Play'),
      href: '#'
    },
    ctaConsumer: { label: L('حمّل التطبيق', 'Download the app'), href: '#' },
    ctaMerchant: { label: L('ابدأ بقبول المدفوعات', 'Start accepting payments'), href: '#merchant' }
  },
  footer: {
    logoLightUrl: ASSET + '/lychee-logo-light.svg',
    tagline: L('البوابة الفلسطينية للدفع اليومي.', 'The Palestinian payment gateway for everyday money.'),
    columns: [
      {
        title: L('المنتج', 'Product'),
        links: [
          { label: L('للأفراد', 'Personal'), href: '#consumer' },
          { label: L('للأعمال', 'Business'), href: '#merchant' },
          { label: L('للمطوّرون', 'Developers'), href: '#developers' }
        ]
      },
      {
        title: L('الشركة', 'Company'),
        links: [
          { label: L('من نحن', 'About'), href: '#' },
          { label: L('الوظائف', 'Careers'), href: '#' },
          { label: L('تواصل معنا', 'Contact'), href: '#contact' }
        ]
      },
      {
        title: L('قانوني', 'Legal'),
        links: [
          { label: L('الشروط', 'Terms'), href: '/terms' },
          { label: L('الخصوصية', 'Privacy'), href: '/privacy' },
          { label: L('الأمان', 'Security'), href: '#' }
        ]
      }
    ],
    copyright: L('© 2026 ليتشي. جميع الحقوق محفوظة.', '© 2026 Lychee. All rights reserved.'),
    madeIn: L('صُنع في فلسطين 🇵🇸', 'Made in Palestine 🇵🇸')
  }
};
