import { LANDING_CONTENT_DEFAULTS } from './landing-content.defaults';

describe('LANDING_CONTENT_DEFAULTS', () => {
  it('has no placeholder # hrefs for CTAs that should be real URLs', () => {
    const c = LANDING_CONTENT_DEFAULTS;
    expect(c.closer.appStore.href).not.toBe('#');
    expect(c.closer.playStore.href).not.toBe('#');
    expect(c.closer.ctaConsumer.href).not.toBe('#');
    expect(c.developers.cta.href).not.toBe('#');
    expect(c.footer.columns.flatMap((col) => col.links.map((l) => l.href))).not.toContain('#');
  });

  it('routes merchant CTAs through WhatsApp lead intents', () => {
    const c = LANDING_CONTENT_DEFAULTS;
    expect(c.hero.ctaMerchant.href).toBe('#whatsapp-lead:start_payments');
    expect(c.closer.ctaMerchant.href).toBe('#whatsapp-lead:start_payments');
    expect(c.merchant.cta.href).toBe('#whatsapp-lead:create_account');
    expect(c.merchant.clinic.cta.href).toBe('#whatsapp-lead:clinic');
  });

  it('uses info@lycheeapp.org for contact email', () => {
    const email = LANDING_CONTENT_DEFAULTS.contact.channels.find((ch) => ch.type === 'email');
    expect(email?.href).toContain('info@lycheeapp.org');
  });
});
