import { L, LocalizedString } from '../../core/models/landing-page.model';

export type WhatsappLeadIntentId = 'start_payments' | 'create_account' | 'clinic';

export interface WhatsappLeadIntent {
  title: LocalizedString;
  helper: LocalizedString;
  message: LocalizedString;
}

export const WHATSAPP_LEAD_INTENTS: Record<WhatsappLeadIntentId, WhatsappLeadIntent> = {
  start_payments: {
    title: L('ابدأ بقبول المدفوعات', 'Start accepting payments'),
    helper: L(
      'عدّل الرسالة أدناه ثم تابع على واتساب وسيتواصل معك فريق ليتشي.',
      'Edit the message below, then continue on WhatsApp — the Lychee team will follow up.'
    ),
    message: L(
      'مرحبًا ليتشي، أرغب في بدء قبول المدفوعات لنشاطي التجاري. أرجو مساعدتي في الخطوات التالية.',
      'Hi Lychee, I want to start accepting payments for my business. Please help me with the next steps.'
    )
  },
  create_account: {
    title: L('أنشئ حساب تاجر', 'Create a merchant account'),
    helper: L(
      'عدّل الرسالة ثم أرسلها عبر واتساب لنبدأ إعداد حساب التاجر.',
      'Edit the message, then send it on WhatsApp so we can start setting up your merchant account.'
    ),
    message: L(
      'مرحبًا ليتشي، أود إنشاء حساب تاجر على ليتشي. أرجو إرشادي حول المتطلبات والخطوات.',
      'Hi Lychee, I’d like to create a merchant account on Lychee. Please guide me on the requirements and next steps.'
    )
  },
  clinic: {
    title: L('أدِر عيادتك على ليتشي', 'Run your clinic on Lychee'),
    helper: L(
      'أخبرنا عن عيادتك عبر واتساب وسنساعدك في الحجوزات والمدفوعات.',
      'Tell us about your clinic on WhatsApp and we’ll help with bookings and payments.'
    ),
    message: L(
      'مرحبًا ليتشي، أنا مهتم بتشغيل عيادتي على ليتشي (حجوزات ومدفوعات وتذكيرات). أرجو التواصل معي.',
      'Hi Lychee, I’m interested in running my clinic on Lychee (bookings, payments, and reminders). Please get in touch.'
    )
  }
};
