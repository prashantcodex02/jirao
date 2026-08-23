import React, { useEffect, useRef } from 'react';
import './KnowYourOil.css';
import { Link } from 'react-router-dom';

export default function KnowYourOil() {
  const containerRef = useRef(null);


  return (
    <div className="inner-page-wrapper" ref={containerRef}>
      <div className="ip-hero">
    <div className="ip-hero__orb ip-hero__orb--1"></div>
    <div className="ip-hero__orb ip-hero__orb--2"></div>
    <div className="ip-hero__noise"></div>
    <div className="container" style={{"position":"relative","zIndex":"1"}}>
      <p className="ip-hero__eyebrow" data-reveal data-delay="1">Education</p>
      <h1 className="ip-hero__heading" data-reveal data-delay="2">Know Your Oil</h1>
      <p className="ip-hero__sub" data-reveal data-delay="3">Jaaniye kya hai asli tel aur kyun zaruri hai aapke liye.</p>
    </div>
  </div>

  <main className="section-spacing container">
    
    <section style={{"marginBottom":"8rem"}}>
      <div style={{"textAlign":"center"}} data-reveal>
        <h2 className="narrative-title">What is Lakdi Ghani?</h2>
        <p className="narrative-subtitle" style={{"marginInline":"auto"}}>Understanding the traditional wood pressed method passed down through generations.</p>
      </div>

      <div className="premium-split">
        <div className="premium-img-wrapper" data-reveal data-delay="1">
          <img onLoad={(e) => e.currentTarget.classList.remove('skeleton-loading')} className="skeleton-loading" src="https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/process2.png?_a=BAMCr6WO0" alt="Traditional Lakdi Ghani Process" loading="lazy" onError={(e) => e.target.src='https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/mustard.png?_a=BAMCr6WO0'} />
          <div className="premium-img-badge">100%<br />Pure</div>
        </div>
        
        <div className="feature-list">
          <div className="feature-item" data-reveal data-delay="2">
            <div className="feature-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
            </div>
            <div className="feature-text">
              <h3>Traditional Roots</h3>
              <p>Lakdi Ghani is the ancient Indian method of extracting oil using a wooden press (ghani). This slow, natural process honors traditional wisdom.</p>
            </div>
          </div>
          
          <div className="feature-item" data-reveal data-delay="3">
            <div className="feature-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <div className="feature-text">
              <h3>True Cold Pressed</h3>
              <p>The temperature never exceeds 50°C during extraction. This gentle processing ensures all vital nutrients, vitamins, and minerals remain completely intact.</p>
            </div>
          </div>

          <div className="feature-item" data-reveal data-delay="4">
            <div className="feature-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 2v7.31"/><path d="M14 9.3V1.99"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/></svg>
            </div>
            <div className="feature-text">
              <h3>Zero Chemicals</h3>
              <p>Absolutely no chemicals, hexanes, or solvents are used in our extraction. What you get is 100% pure, unadulterated natural goodness.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    
    <section style={{"marginBottom":"2rem"}}>
      <div style={{"textAlign":"center","marginBottom":"4rem"}} data-reveal>
        <div className="ip-label" style={{"justifyContent":"center"}}>
          <span className="ip-label__line" style={{"width":"40px"}}></span>
          <span className="ip-label__text">The Difference</span>
          <span className="ip-label__line" style={{"width":"40px"}}></span>
        </div>
        <h2 className="narrative-title" style={{"marginTop":"1.5rem"}}>Wood Pressed vs Refined</h2>
      </div>
      
      <div className="comparison-grid">
        <div className="comp-card comp-card--wood" data-reveal data-delay="1">
          <div className="comp-card-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
          </div>
          <h3>Wood Pressed</h3>
          <ul className="comp-list">
            <li><svg className="icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              <div><strong>Nutrients Intact</strong>Vitamins, minerals, and antioxidants are fully preserved.</div>
            </li>
            <li><svg className="icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              <div><strong>Natural Aroma</strong>Retains the authentic flavor and smell of the original seeds.</div>
            </li>
            <li><svg className="icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              <div><strong>Chemical Free</strong>No solvents or chemical bleaching applied at any stage.</div>
            </li>
            <li><svg className="icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              <div><strong>Heart Healthy</strong>Excellent Omega-3 to Omega-6 balance for cardiovascular health.</div>
            </li>
          </ul>
        </div>

        <div className="comp-card comp-card--refined" data-reveal data-delay="2">
          <div className="comp-card-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2c0 0-5 3.5-5 10a5 5 0 0 0 10 0c0-6.5-5-10-5-10z"/></svg>
          </div>
          <h3>Refined Oil</h3>
          <ul className="comp-list">
            <li><svg className="icon-cross" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              <div><strong>Nutrients Destroyed</strong>High heat processing (200°C+) eliminates most health benefits.</div>
            </li>
            <li><svg className="icon-cross" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              <div><strong>Chemical Extraction</strong>Uses Hexane and other chemical solvents to maximize yield.</div>
            </li>
            <li><svg className="icon-cross" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              <div><strong>Bland & Tasteless</strong>Deodorization processes strip away all natural properties.</div>
            </li>
            <li><svg className="icon-cross" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              <div><strong>Trans Fats</strong>Hydrogenation often introduces unhealthy trans fats.</div>
            </li>
          </ul>
        </div>
      </div>
      
      
      <div className="science-banner" data-reveal>
        <div className="science-content">
          <h3>Backed by Science</h3>
          <p>Clinical studies consistently prove that cold-pressed extraction preserves vital micronutrients, offering significantly higher antioxidant levels compared to conventionally refined counterparts.</p>
          <div className="science-stats">
            <div className="s-stat">
              <h4>3x</h4>
              <p>More Antioxidants</p>
            </div>
            <div className="s-stat">
              <h4>0%</h4>
              <p>Chemical Residue</p>
            </div>
          </div>
        </div>
        <div style={{"flexShrink":"0","opacity":"0.2"}}>
          <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
      </div>
    </section>
  </main>
    </div>
  );
}
