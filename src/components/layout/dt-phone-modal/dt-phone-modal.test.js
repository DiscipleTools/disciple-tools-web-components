import { html } from 'lit';
import { fixture, expect, aTimeout, nextFrame } from '@open-wc/testing';
import { DtPhoneModal } from './dt-phone-modal.js';

describe('DtPhoneModal', () => {
  it('can be instantiated', async () => {
    const el = await fixture(html`<dt-phone-modal></dt-phone-modal>`);
    expect(el).to.exist;
    expect(el.phoneNumber).to.equal('');
    expect(el.isOpen).to.be.false;
  });

  it('has default messaging services', async () => {
    const el = await fixture(html`<dt-phone-modal></dt-phone-modal>`);
    
    expect(el.messagingServices).to.exist;
    expect(el.messagingServices.phone).to.exist;
    expect(el.messagingServices.whatsapp).to.exist;
    expect(el.messagingServices.viber).to.exist;
    expect(el.messagingServices.signal).to.exist;
    expect(el.messagingServices.telegram).to.exist;
  });

  it('opens with phone number', async () => {
    const el = await fixture(html`<dt-phone-modal></dt-phone-modal>`);
    
    el.open('+1-555-123-4567');
    await nextFrame();
    
    expect(el.phoneNumber).to.equal('+1-555-123-4567');
    expect(el.isOpen).to.be.true;
    expect(el.style.display).to.equal('block');
  });

  it('closes modal', async () => {
    const el = await fixture(html`<dt-phone-modal></dt-phone-modal>`);
    
    // Open first
    el.open('+1-555-123-4567');
    await nextFrame();
    expect(el.isOpen).to.be.true;
    
    // Then close
    el.close();
    await nextFrame();
    
    expect(el.isOpen).to.be.false;
    expect(el.style.display).to.equal('none');
  });

  it('renders modal content when open', async () => {
    const el = await fixture(html`<dt-phone-modal></dt-phone-modal>`);
    
    el.open('+1-555-123-4567');
    await nextFrame();
    
    const modal = el.shadowRoot.querySelector('dt-modal');
    expect(modal).to.exist;
    
    const services = el.shadowRoot.querySelectorAll('.messaging-service');
    expect(services.length).to.be.at.least(5); // At least 5 services
  });

  it('does not render when closed', async () => {
    const el = await fixture(html`<dt-phone-modal></dt-phone-modal>`);
    
    const modal = el.shadowRoot.querySelector('dt-modal');
    expect(modal).to.not.exist;
  });

  it('creates correct service links for different messaging apps', async () => {
    const phoneNumber = '+1-555-123-4567';
    const services = {
      phone: { link: 'tel:PHONE_NUMBER' },
      whatsapp: { link: 'https://wa.me/PHONE_NUMBER_NO_PLUS' },
      telegram: { link: 'https://t.me/PHONE_NUMBER_NO_PLUS' },
      viber: { link: 'viber://chat?number=PHONE_NUMBER' },
      signal: { link: 'sgnl://signal.me/#p/PHONE_NUMBER' }
    };

    // Test tel link
    const telLink = DtPhoneModal._createServiceLink(services.phone, phoneNumber);
    expect(telLink).to.equal('tel:+1-555-123-4567');

    // Test WhatsApp link (should remove plus and leading 1)
    const whatsappLink = DtPhoneModal._createServiceLink(services.whatsapp, phoneNumber);
    expect(whatsappLink).to.equal('https://wa.me/5551234567');

    // Test Telegram link (should remove plus and leading 1)
    const telegramLink = DtPhoneModal._createServiceLink(services.telegram, phoneNumber);
    expect(telegramLink).to.equal('https://t.me/5551234567');

    // Test Viber link
    const viberLink = DtPhoneModal._createServiceLink(services.viber, phoneNumber);
    expect(viberLink).to.equal('viber://chat?number=+1-555-123-4567');

    // Test Signal link
    const signalLink = DtPhoneModal._createServiceLink(services.signal, phoneNumber);
    expect(signalLink).to.equal('sgnl://signal.me/#p/+1-555-123-4567');
  });

  it('handles phone numbers without leading 1', async () => {
    const phoneNumber = '+33123456789';
    const service = { link: 'https://wa.me/PHONE_NUMBER_NO_PLUS' };

    const link = DtPhoneModal._createServiceLink(service, phoneNumber);
    expect(link).to.equal('https://wa.me/33123456789');
  });

  it('renders correct number of messaging services', async () => {
    const el = await fixture(html`<dt-phone-modal></dt-phone-modal>`);
    
    el.open('+1-555-123-4567');
    await nextFrame();
    
    const serviceLinks = el.shadowRoot.querySelectorAll('.messaging-service');
    
    // Should have at least 5 base services (phone, whatsapp, viber, signal, telegram)
    expect(serviceLinks.length).to.be.at.least(5);
    
    // Check that each service has proper structure
    serviceLinks.forEach(service => {
      expect(service.href).to.exist;
      expect(service.querySelector('dt-icon')).to.exist;
      expect(service.querySelector('.service-text')).to.exist;
    });
  });

  it('includes phone number in service text', async () => {
    const el = await fixture(html`<dt-phone-modal></dt-phone-modal>`);
    const phoneNumber = '+1-555-123-4567';
    
    el.open(phoneNumber);
    await nextFrame();
    
    const phoneNumberSpans = el.shadowRoot.querySelectorAll('.phone-number');
    expect(phoneNumberSpans.length).to.be.at.least(1);
    
    phoneNumberSpans.forEach(span => {
      expect(span.textContent).to.equal(phoneNumber);
    });
  });

  it('closes modal when service link is clicked', async () => {
    const el = await fixture(html`<dt-phone-modal></dt-phone-modal>`);
    
    el.open('+1-555-123-4567');
    await nextFrame();
    
    const serviceLink = el.shadowRoot.querySelector('.messaging-service');
    expect(serviceLink).to.exist;
    
    // Mock the close behavior
    let closeCalled = false;
    const originalClose = el.close.bind(el);
    el.close = () => {
      closeCalled = true;
      originalClose();
    };
    
    serviceLink.click();
    await aTimeout(50);
    
    expect(closeCalled).to.be.true;
  });

  it('adds iMessage on Apple devices', async () => {
    const el = await fixture(html`<dt-phone-modal></dt-phone-modal>`);
    
    // Mock Apple device detection
    const originalPlatform = navigator.platform;
    Object.defineProperty(navigator, 'platform', {
      writable: true,
      value: 'iPhone'
    });
    
    el.open('+1-555-123-4567');
    await nextFrame();
    
    const serviceLinks = el.shadowRoot.querySelectorAll('.messaging-service');
    const serviceTexts = Array.from(serviceLinks).map(link => 
      link.querySelector('.service-name').textContent
    );
    
    expect(serviceTexts).to.include('iMessage');
    
    // Restore original platform
    Object.defineProperty(navigator, 'platform', {
      writable: true,
      value: originalPlatform
    });
  });

  it('handles modal close event', async () => {
    const el = await fixture(html`<dt-phone-modal></dt-phone-modal>`);
    
    el.open('+1-555-123-4567');
    await nextFrame();
    
    const modal = el.shadowRoot.querySelector('dt-modal');
    expect(modal).to.exist;
    
    // Simulate modal close event
    modal.dispatchEvent(new CustomEvent('close'));
    await nextFrame();
    
    expect(el.isOpen).to.be.false;
    expect(el.style.display).to.equal('none');
  });
});