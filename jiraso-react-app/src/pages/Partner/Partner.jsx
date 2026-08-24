import React, { useEffect, useRef, useState } from 'react';
import './Partner.css';
import { Link } from 'react-router-dom';
import LuxuryButton from '../../components/LuxuryButton';
import SEOHead from '../../components/SEOHead/SEOHead';

export default function Partner() {
  const containerRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    business: '',
    city: '',
    type: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    // Strip "pf-" prefix from id to get state key
    const name = id.replace('pf-', '');
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const response = await fetch('https://jirao.vercel.app/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: 'N/A',
          phone: formData.phone,
          details: `Type: Partnership Enquiry (${formData.type})\nBusiness: ${formData.business}\nCity: ${formData.city}\nMessage: ${formData.message}`,
        }),
      });
      
      if (response.ok) {
        setIsSending(false);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({ name: '', phone: '', business: '', city: '', type: '', message: '' });
        }, 1600);
      } else {
        setIsSending(false);
        alert('Failed to send enquiry. Please try again.');
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
        title="Partner With Us – Wholesale & Distributor Enquiries"
        description="Become a retail or wholesale partner with JIRASO Organics. We supply premium wood-pressed, chemical-free cooking oils across India. Contact us for bulk pricing, distributor terms, and trade partnerships."
        canonical="https://www.jirasoorganics.com/partner"
      />
      <div className="ip-hero">
    <div className="ip-hero__orb ip-hero__orb--1"></div>
    <div className="ip-hero__orb ip-hero__orb--2"></div>
    <div className="ip-hero__noise"></div>
    <div className="container" style={{"position":"relative","zIndex":"1"}}>
      <p className="ip-hero__eyebrow" data-reveal data-delay="1">Grow Together</p>
      <h1 className="ip-hero__heading" data-reveal data-delay="2">Partner With Us</h1>
      <p className="ip-hero__sub" data-reveal data-delay="3">Join the JIRASO network as a distributor, stockist, or retail partner. Bring authentic wood-pressed oils to your customers.</p>
    </div>
  </div>

  <main className="section-margin container">

    <div className="ip-label" data-reveal>
      <span className="ip-label__text">Partnership Models</span>
      <span className="ip-label__line"></span>
      <span className="ip-label__text">3 Options</span>
    </div>

    <div className="partner-grid">
      <div className="partner-card" data-reveal data-delay="1">
        <div className="partner-card__icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </div>
        <p className="partner-card__title">Retail Stockist</p>
        <p className="partner-card__text">Stock JIRASO oils in your store — grocery shops, supermarkets, organic stores. Minimum order: 24 units. Attractive margins with branding support.</p>
      </div>

      <div className="partner-card" data-reveal data-delay="2">
        <div className="partner-card__icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
        </div>
        <p className="partner-card__title">Area Distributor</p>
        <p className="partner-card__text">Distribute JIRASO across your city or district. Exclusive territorial rights, volume-based pricing, and dedicated support from our team.</p>
      </div>

      <div className="partner-card" data-reveal data-delay="3">
        <div className="partner-card__icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        </div>
        <p className="partner-card__title">Online / D2C Partner</p>
        <p className="partner-card__text">Sell JIRASO on your own platform or social channels. We provide product assets, pricing support, and fulfilment assistance.</p>
      </div>
    </div>

    <div className="partner-stats" data-reveal>
      <div className="partner-stat">
        <p className="partner-stat__num">20%+</p>
        <p className="partner-stat__label">Retailer Margin</p>
      </div>
      <div className="partner-stat">
        <p className="partner-stat__num">48h</p>
        <p className="partner-stat__label">Order Dispatch</p>
      </div>
      <div className="partner-stat">
        <p className="partner-stat__num">100%</p>
        <p className="partner-stat__label">Pure & Lab Tested</p>
      </div>
      <div className="partner-stat">
        <p className="partner-stat__num">FSSAI</p>
        <p className="partner-stat__label">Certified</p>
      </div>
    </div>

    <div className="partner-form-wrap" data-reveal>
      <h2>Start the Conversation</h2>
      <p>Fill the form below and our team will reach out within 24 hours via WhatsApp or phone.</p>

      <form id="partner-form" onSubmit={handleSubmit}>
        <div className="pf-grid">
          <div className="pf-field">
            <label className="pf-label" htmlFor="pf-name">Full Name *</label>
            <input className="pf-input" type="text" id="pf-name" placeholder="Your name" required value={formData.name} onChange={handleInputChange} />
          </div>
          <div className="pf-field">
            <label className="pf-label" htmlFor="pf-phone">WhatsApp / Phone *</label>
            <input className="pf-input" type="tel" id="pf-phone" placeholder="10-digit number" maxLength="10" required value={formData.phone} onChange={handleInputChange} />
          </div>
          <div className="pf-field">
            <label className="pf-label" htmlFor="pf-business">Business / Shop Name</label>
            <input className="pf-input" type="text" id="pf-business" placeholder="Your business name" value={formData.business} onChange={handleInputChange} />
          </div>
          <div className="pf-field">
            <label className="pf-label" htmlFor="pf-city">City / District *</label>
            <input className="pf-input" type="text" id="pf-city" placeholder="Your city" required value={formData.city} onChange={handleInputChange} />
          </div>
          <div className="pf-field pf-full">
            <label className="pf-label" htmlFor="pf-type">Partnership Type *</label>
            <select className="pf-input" id="pf-type" required value={formData.type} onChange={handleInputChange}>
              <option value="">Select partnership type</option>
              <option value="Retail Stockist">Retail Stockist</option>
              <option value="Area Distributor">Area Distributor</option>
              <option value="Online / D2C Partner">Online / D2C Partner</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="pf-field pf-full">
            <label className="pf-label" htmlFor="pf-msg">Additional Message</label>
            <textarea className="pf-input" id="pf-msg" rows="3" placeholder="Tell us more about your business..." value={formData.message} onChange={handleInputChange}></textarea>
          </div>
        </div>
        
        <div style={{"marginTop":"1.5rem"}}>
          <LuxuryButton 
            isOrdering={isSending} 
            isSuccess={isSuccess} 
            defaultText="Submit Enquiry" 
          />
        </div>
      </form>
    </div>

  </main>
    </div>
  );
}
