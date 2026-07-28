export type LandingLocale = 'ar' | 'en';

export interface LocalizedString {
  ar: string;
  en: string;
}

export interface LandingCta {
  label: LocalizedString;
  href: string;
}

export interface LandingImage {
  url: string;
  alt: LocalizedString;
}

export interface LandingNavLink {
  label: LocalizedString;
  href: string;
}

export interface LandingTile {
  icon: string;
  title: LocalizedString;
  description: LocalizedString;
}

export interface LandingFeatureCard {
  tag: LocalizedString;
  title: LocalizedString;
  body: LocalizedString;
  chip?: LocalizedString;
  imageUrl?: string;
  demoCode?: string;
  demoAmount?: string;
}

export interface LandingMerchantLeadCard {
  tag: LocalizedString;
  title: LocalizedString;
  body: LocalizedString;
  demoUrl?: string;
  demoAmount?: string;
  amountLabel?: LocalizedString;
  methodsLabel?: LocalizedString;
  methods?: LocalizedString[];
  imageUrl?: string;
  imageAlt?: LocalizedString;
}

export interface LandingChannel {
  type: 'email' | 'phone' | 'whatsapp' | 'hq';
  label: LocalizedString;
  value: LocalizedString;
  href: string;
}

export interface LandingFooterLink {
  label: LocalizedString;
  href: string;
}

export interface LandingFooterColumn {
  title: LocalizedString;
  links: LandingFooterLink[];
}

export interface LandingHowItWorksStep {
  number: string;
  title: LocalizedString;
  body: LocalizedString;
}

export interface LandingFaqItem {
  question: LocalizedString;
  answer: LocalizedString;
}

export interface LandingContent {
  seo: {
    title: LocalizedString;
    description: LocalizedString;
    ogImage: string;
  };
  langSwitch: LocalizedString;
  nav: {
    logoFullUrl: string;
    logoMarkUrl: string;
    links: LandingNavLink[];
    cta: LandingCta;
  };
  hero: {
    eyebrow: LocalizedString;
    title: LocalizedString;
    subtitle: LocalizedString;
    ctaConsumer: LandingCta;
    ctaMerchant: LandingCta;
    trustLabel: LocalizedString;
    trustLogos: LandingImage[];
    phoneScreenshotAr: string;
    phoneScreenshotEn: string;
    phoneScreenshotAlt: LocalizedString;
    taxiImageUrl: string;
    taxiImageAlt: LocalizedString;
    taxiPinUrl: string;
    taxiPinAlt: LocalizedString;
    partnership: {
      kicker: LocalizedString;
      name: LocalizedString;
      markUrl: string;
      markAlt: LocalizedString;
    };
  };
  howItWorks: {
    eyebrow: LocalizedString;
    title: LocalizedString;
    subtitle: LocalizedString;
    steps: LandingHowItWorksStep[];
  };
  faqTeaser: {
    eyebrow: LocalizedString;
    title: LocalizedString;
    items: LandingFaqItem[];
    cta: LandingCta;
  };
  consumer: {
    eyebrow: LocalizedString;
    title: LocalizedString;
    subtitle: LocalizedString;
    onepay: LandingFeatureCard;
    paytag: LandingFeatureCard;
    tiles: LandingTile[];
    cta: LandingCta;
  };
  merchant: {
    eyebrow: LocalizedString;
    title: LocalizedString;
    subtitle: LocalizedString;
    paymentLinks: LandingMerchantLeadCard;
    whatsappPay: LandingMerchantLeadCard;
    tiles: LandingTile[];
    clinic: {
      title: LocalizedString;
      body: LocalizedString;
      cta: LandingCta;
    };
    cta: LandingCta;
  };
  developers: {
    eyebrow: LocalizedString;
    title: LocalizedString;
    body: LocalizedString;
    cta: LandingCta;
    codeCaption: LocalizedString;
    codeSample: string;
  };
  contact: {
    eyebrow: LocalizedString;
    title: LocalizedString;
    subtitle: LocalizedString;
    channels: LandingChannel[];
    form: {
      nameLabel: LocalizedString;
      emailLabel: LocalizedString;
      topicLabel: LocalizedString;
      messageLabel: LocalizedString;
      sendLabel: LocalizedString;
      sendingLabel: LocalizedString;
      privacyNote: LocalizedString;
      consentLabel: LocalizedString;
      consentLinkLabel: LocalizedString;
      successMessage: LocalizedString;
      errorMessage: LocalizedString;
      rateLimitMessage: LocalizedString;
      requiredError: LocalizedString;
      emailError: LocalizedString;
    };
  };
  closer: {
    title: LocalizedString;
    body: LocalizedString;
    ecoIcons: string[];
    appStore: {
      top: LocalizedString;
      bottom: LocalizedString;
      href: string;
    };
    playStore: {
      top: LocalizedString;
      bottom: LocalizedString;
      href: string;
    };
    ctaConsumer: LandingCta;
    ctaMerchant: LandingCta;
  };
  footer: {
    logoLightUrl: string;
    tagline: LocalizedString;
    columns: LandingFooterColumn[];
    copyright: LocalizedString;
    madeIn: LocalizedString;
  };
}

export function L(ar: string, en: string): LocalizedString {
  return { ar, en };
}

export function resolveLocalized(
  value: LocalizedString | undefined | null,
  locale: LandingLocale
): string {
  if (!value) {
    return '';
  }
  return locale === 'en' ? value.en : value.ar;
}
