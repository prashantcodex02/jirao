import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import LuxuryButton from '../../components/LuxuryButton';
import SEOHead from '../../components/SEOHead/SEOHead';

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.jirasoorganics.com/#localbusiness',
  name: 'JIRASO Organics Private Limited',
  image: 'https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/hero.png?_a=BAMCr6WO0',
  url: 'https://www.jirasoorganics.com',
  telephone: '+91-8393976770',
  email: 'Jirasoorganics@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Madhavpur, Rampur Road Salempur',
    addressLocality: 'Deoria',
    addressRegion: 'Uttar Pradesh',
    postalCode: '274509',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 26.2,
    longitude: 83.8,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  priceRange: '₹₹',
  description: 'JIRASO Organics — Premium wood-pressed, chemical-free cooking oils. Traditional kachi ghani mustard, sesame, coconut and groundnut oils. FSSAI certified.',
  sameAs: ['https://www.instagram.com/jiraso_organics'],
};

export default function Contact() {
  const containerRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    inquiry: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const response = await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          details: `Type: Contact Form (${formData.inquiry || 'General'})\nMessage: ${formData.message}`,
        }),
      });
      
      if (response.ok) {
        setIsSending(false);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({ name: '', phone: '', email: '', inquiry: '', message: '' });
        }, 1600);
      } else {
        setIsSending(false);
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setIsSending(false);
      alert('Error connecting to the server. Make sure the Node server is running on port 5000.');
    }
  };


  return (
    <div className="inner-page-wrapper" ref={containerRef}>
      <SEOHead
        title="Contact Us – JIRASO Organics"
        description="Get in touch with JIRASO Organics for retail orders, wholesale enquiries, and distributor partnerships. Call +91 83939 76770 or email Jirasoorganics@gmail.com. Based in Deoria, UP."
        canonical="https://www.jirasoorganics.com/contact"
        schemaJson={contactSchema}
      />
      <div className="ip-hero">
    <div className="ip-hero__orb ip-hero__orb--1"></div>
    <div className="ip-hero__orb ip-hero__orb--2"></div>
    <div className="ip-hero__noise"></div>
    <div className="container" style={{"position":"relative","zIndex":"1"}}>
      <p className="ip-hero__eyebrow" data-reveal data-delay="1">Get In Touch</p>
      <h1 className="ip-hero__heading" data-reveal data-delay="2">Contact Us</h1>
      <p className="ip-hero__sub" data-reveal data-delay="3">Reach out for retail, wholesale, and product support. We're here to help.</p>
    </div>
  </div>

  <main className="section-margin container">
    <div className="ip-label" data-reveal>
      <span className="ip-label__text">Connect</span>
      <span className="ip-label__line"></span>
      <span className="ip-label__text">Response within 24h</span>
    </div>

    <div className="contact-layout">
      
      <div style={{"display":"flex","flexDirection":"column","gap":"1.5rem"}}>
        <div data-reveal data-delay="1">
          <h2 style={{"fontFamily":"var(--font-heading)","fontSize":"clamp(1.75rem,3vw,2.5rem)","lineHeight":"1.1","marginBottom":"1rem"}}>We'd love to<br />hear from you.</h2>
          <p style={{"fontSize":"0.9375rem","lineHeight":"1.75","color":"var(--color-text-light)","maxWidth":"400px"}}>Whether you're a home cook, a distributor, or just curious about our oils - every inquiry is welcome.</p>
        </div>

        <div className="contact-info-strip">
          
          <article className="contact-card" data-reveal data-delay="2">
            <div className="contact-card__icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div>
              <p className="contact-card__label">Address</p>
              <p className="contact-card__value"><a href="https://maps.app.goo.gl/FFoxwsuSLHEWuctB9?g_st=aw" target="_blank" rel="noopener noreferrer">Madhavpur, Rampur Road Salempur,<br />Deoria, Uttar Pradesh 274509</a></p>
            </div>
          </article>

          
          <article className="contact-card" data-reveal data-delay="3">
            <div className="contact-card__icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div>
              <p className="contact-card__label">Phone</p>
              <p className="contact-card__value">
                <a href="tel:+918393976770">+91 83939 76770</a>
              </p>
            </div>
          </article>

          
          <article className="contact-card" data-reveal data-delay="4">
            <div className="contact-card__icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <div>
              <p className="contact-card__label">Email</p>
              <p className="contact-card__value">
                <a href="mailto:Jirasoorganics@gmail.com">Jirasoorganics@gmail.com</a>
              </p>
            </div>
          </article>

          
          <article className="contact-card" data-reveal data-delay="5" style={{"borderColor":"#1f9d57"}}>
            <div className="contact-card__icon" style={{"background":"#1f9d57"}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
            </div>
            <div>
              <p className="contact-card__label">WhatsApp</p>
              <p className="contact-card__value">
                <a href="https://wa.me/918393976770" target="_blank" rel="noopener">Chat with us on WhatsApp</a>
              </p>
            </div>
          </article>
        </div>

        
        <div data-reveal style={{"marginTop":"1rem"}}>
          <img onLoad={(e) => e.currentTarget.classList.remove('skeleton-loading')} className="skeleton-loading" src="https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/certification02.png?_a=BAMCr6WO0" alt="Certifications" loading="lazy" style={{"width":"100%","height":"auto","display":"block","borderRadius":"14px"}} />
        </div>

        
        <div className="contact-map" data-reveal data-delay="6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14300!2d83.8!3d26.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3993cbd5e95fc1cd%3A0x51b5fff4d51dd5d9!2sJiraso%20Organics%20Private%20Limited!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
            title="JIRASO Organics Location">
          </iframe>
        </div>
      </div>

      
      <div data-reveal data-delay="2">
        <div className="contact-form-premium">
          <div>
            <h2 className="contact-form-premium__heading">Send Us a Message</h2>
            <p className="contact-form-premium__sub">Fill the form and we'll respond within 24 hours.</p>
          </div>

          <form id="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="name">Full Name</label>
                <input id="name" name="name" type="text" placeholder="Your full name" required value={formData.name} onChange={handleInputChange} />
              </div>
              <div className="form-field">
                <label htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="tel" placeholder="+91 XXXXX XXXXX" required value={formData.phone} onChange={handleInputChange} />
              </div>
            </div>

            <div className="form-field" style={{"marginTop":"1rem"}}>
              <label htmlFor="email">Email Address</label>
              <input id="email" name="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleInputChange} />
            </div>

            <div className="form-field" style={{"marginTop":"1rem"}}>
              <label htmlFor="inquiry">Inquiry Type</label>
              <select id="inquiry" name="inquiry" style={{"fontFamily":"var(--font-body)","fontSize":"0.9375rem","color":"var(--color-navy)","background":"var(--color-chalk)","border":"1.5px solid var(--color-border)","borderRadius":"10px","padding":"0.75rem 1rem","outline":"none","transition":"border-color 0.2s,box-shadow 0.2s","width":"100%","WebkitAppearance":"none"}} value={formData.inquiry} onChange={handleInputChange}>
                <option value="">Select an inquiry type</option>
                <option value="retail">Retail Order</option>
                <option value="bulk">Bulk / Wholesale</option>
                <option value="distributor">Distributor Partnership</option>
                <option value="general">General Inquiry</option>
              </select>
            </div>

            <div className="form-field" style={{"marginTop":"1rem"}}>
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" placeholder="Tell us about your inquiry..." required value={formData.message} onChange={handleInputChange}></textarea>
            </div>

            <div style={{"marginTop":"1.5rem","display":"flex","gap":"1rem","flexWrap":"wrap","alignItems":"center"}}>
              <LuxuryButton 
                isOrdering={isSending} 
                isSuccess={isSuccess} 
                defaultText="Send Message" 
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
    </div>
  );
}
