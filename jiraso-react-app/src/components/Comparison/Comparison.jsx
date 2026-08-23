import React, { useEffect, useRef, useState } from 'react';

const comparisonData = [
  { label: 'Nutrients Preserved', width: 95, jText: '✓ 95% Retained', rText: '✕ ~15% Retained' },
  { label: 'Chemical-Free Score', width: 100, jText: '✓ Zero Chemicals', rText: '✕ Hexane & More' },
  { label: 'Natural Taste Score', width: 90, jText: '✓ Natural Aroma', rText: '✕ Bland / Artificial' },
  { label: 'Health Benefit Index', width: 88, jText: '✓ High Benefits', rText: '✕ Low Benefits' }
];

export default function Comparison() {
  const compRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    if (compRef.current) {
      observer.observe(compRef.current);
    }

    return () => {
      if (compRef.current) observer.unobserve(compRef.current);
    };
  }, []);

  return (
    <section className="comp-section" id="comparison">
      <div className="container">
        <div className="comp-head rv">
          <p className="sec-num" style={{ color: 'var(--gold-l)' }}>Wood Pressed vs Refined</p>
          <h2>Natural <em>vs</em> Refined Oils</h2>
        </div>
        <div className="comp-grid rv d2" id="comp-grid" ref={compRef}>
          
          <div className="cc cc--head">Feature</div>
          <div className="cc cc--head comp-col--j">JIRASO Wood Pressed</div>
          <div className="cc cc--head comp-col--r">Refined Oils</div>
          
          {comparisonData.map((item, idx) => (
            <React.Fragment key={idx}>
              <div className="cc cc--bar comp-col--lbl">
                <div className="bar-label">{item.label}</div>
                <div className="bar-track">
                  <div 
                    className="bar-fill" 
                    style={{ width: isVisible ? `${item.width}%` : '0%' }}
                  />
                </div>
              </div>
              <div className="cc comp-col--j"><span className="cc__val yes2">{item.jText}</span></div>
              <div className="cc comp-col--r"><span className="cc__val no2">{item.rText}</span></div>
            </React.Fragment>
          ))}
          
        </div>
        <p className="comp-note rv">*JIRASO products are a dietary addition, not a medical treatment. Use as directed.</p>
        <div style={{ textAlign: 'center', marginTop: '3rem' }} className="rv d2">
          <a className="btn btn--gold" href="#products">
            Explore Collection
            <span className="arr"><svg width="10" height="10" viewBox="0 0 10 10">
                <path d="M10 5.286h-.88V1.5L.62 10 0 9.38 8.5.88H4.714V0H10v5.286Z" fill="currentColor" />
              </svg></span>
          </a>
        </div>
      </div>
    </section>
  );
}
