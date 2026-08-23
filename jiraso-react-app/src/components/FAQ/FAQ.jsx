import React, { useState, useRef, useEffect } from 'react';

const faqData = [
  {
    q: 'How is wood pressed oil different from refined?',
    a: 'Wood pressed oils are extracted without heat or chemicals, preserving their natural nutrients and flavour. Refined oils undergo intensive industrial processing that destroys most nutritional value.'
  },
  {
    q: 'Is JIRASO oil completely chemical-free?',
    a: 'Yes - 100%. All JIRASO oils are unrefined and free from hexane, preservatives, or any synthetic additives. What you get is pure oil, exactly as nature intended.'
  },
  {
    q: 'Can I use it for daily cooking?',
    a: 'Absolutely - they\'re designed for everyday use. High nutritional value and authentic taste make them perfect for frying, tempering, sautéing, and even raw dressings.'
  },
  {
    q: 'Does it retain its nutrients?',
    a: 'Yes. The traditional wood-press method generates minimal heat keeping vital nutrients, antioxidants and natural fatty acids intact - unlike high-heat industrial processing.'
  },
  {
    q: 'Which oil is best for my health?',
    a: 'Mustard for bold traditional cooking, Sesame for wellness & South Indian cuisine, Coconut for tropical cooking & skincare, Groundnut for a light daily all-rounder.'
  }
];

function FAQItem({ item, isOpen, onClick }) {
  const bodyRef = useRef(null);
  const [height, setHeight] = useState('0px');

  useEffect(() => {
    if (isOpen) {
      setHeight(`${bodyRef.current.scrollHeight}px`);
      const timer = setTimeout(() => { setHeight('none'); }, 520);
      return () => clearTimeout(timer);
    } else {
      if (height === 'none') {
        setHeight(`${bodyRef.current.scrollHeight}px`);
        // Force reflow
        void bodyRef.current.offsetHeight;
      }
      // Needs a tiny timeout for the transition to catch the concrete px value
      const timer = setTimeout(() => { setHeight('0px'); }, 10);
      return () => clearTimeout(timer);
    }
  }, [isOpen]); // height intentionally omitted to avoid infinite loop

  return (
    <details className="faq" open={isOpen} onClick={e => e.preventDefault()}>
      <summary className="faq summary" onClick={onClick}>
        <span>{item.q}</span>
        <span className="fq-icon">+</span>
      </summary>
      <div 
        className="faq__body" 
        ref={bodyRef} 
        style={{ maxHeight: height, overflow: 'hidden', transition: 'max-height 0.4s ease' }}
      >
        <p>{item.a}</p>
      </div>
    </details>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faqs-section" id="faqs">
      <div className="container">
        <div className="faqs-grid">
          <div className="faqs-left rv">
            <p className="sec-num">FAQs</p>
            <h2>Common Questions About Our Oils</h2>
            <p>Everything you need to know about wood-pressed oils and why they outperform refined alternatives in taste, nutrition, and purity.</p>
            <div className="faqs-img">
              <img onLoad={(e) => e.currentTarget.classList.remove('skeleton-loading')} className="skeleton-loading" src="https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/certification02.png?_a=BAMCr6WO0" alt="JIRASO Quality Certifications" loading="lazy" />
            </div>
          </div>
          <div className="faq-list rv d2">
            {faqData.map((faq, index) => (
              <FAQItem 
                key={index} 
                item={faq} 
                isOpen={openIndex === index} 
                onClick={() => handleToggle(index)} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
