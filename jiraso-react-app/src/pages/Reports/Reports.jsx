import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Reports() {
  const containerRef = useRef(null);


  return (
    <div className="inner-page-wrapper" ref={containerRef}>
      <div className="ip-hero">
    <div className="ip-hero__orb ip-hero__orb--1"></div>
    <div className="ip-hero__orb ip-hero__orb--2"></div>
    <div className="ip-hero__noise"></div>
    <div className="container" style={{"position":"relative","zIndex":"1"}}>
      <p className="ip-hero__eyebrow" data-reveal data-delay="1">Evidence First</p>
      <h1 className="ip-hero__heading" data-reveal data-delay="2">Reports &amp; Research</h1>
      <p className="ip-hero__sub" data-reveal data-delay="3">Clear documentation to build trust in every purchase decision. Transparency from seed to shelf.</p>
    </div>
  </div>

  <main className="section-margin container">
    
    <div className="reports-stats" data-reveal>
      <div className="reports-stat">
        <span className="reports-stat__num">100%</span>
        <span className="reports-stat__label">Natural Seeds</span>
      </div>
      <div className="reports-stat">
        <span className="reports-stat__num">0</span>
        <span className="reports-stat__label">Chemicals Used</span>
      </div>
      <div className="reports-stat">
        <span className="reports-stat__num">10+</span>
        <span className="reports-stat__label">Quality Parameters</span>
      </div>
      <div className="reports-stat">
        <span className="reports-stat__num">∞</span>
        <span className="reports-stat__label">Batch Traceability</span>
      </div>
    </div>

    
    <div data-reveal style={{"marginTop":"2.5rem"}}>
      <img onLoad={(e) => e.currentTarget.classList.remove('skeleton-loading')} className="skeleton-loading" src="https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/certification02.png?_a=BAMCr6WO0" alt="Certifications" loading="lazy" style={{"width":"100%","height":"auto","display":"block","borderRadius":"20px"}} />
    </div>


    <div className="ip-label" style={{"marginTop":"3.5rem"}} data-reveal>
      <span className="ip-label__text">Documentation</span>
      <span className="ip-label__line"></span>
      <span className="ip-label__text">Research &amp; Reports</span>
    </div>

    
    <div className="reports-grid">
      
      <article className="report-card" data-reveal data-delay="1">
        <div className="report-card__icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
          </svg>
        </div>
        <p className="report-card__label">Quality Report</p>
        <h3 className="report-card__title">Batch Quality Summary</h3>
        <p className="report-card__body">Purity, moisture, FFA, peroxide value, and compliance overview for every production batch.</p>
        <a className="report-card__link" href="#report-viewer-quality">
          View in page
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      </article>

      
      <article className="report-card" data-reveal data-delay="2">
        <div className="report-card__icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
          </svg>
        </div>
        <p className="report-card__label">Research</p>
        <h3 className="report-card__title">Wood Pressed vs Refined</h3>
        <p className="report-card__body">A side-by-side look at extraction methods, nutrient retention, and taste profile differences backed by science.</p>
        <a className="report-card__link" href="#report-viewer-research">
          View in page
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      </article>

      
      <article className="report-card" data-reveal data-delay="3">
        <div className="report-card__icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
        </div>
        <p className="report-card__label">Process Note</p>
        <h3 className="report-card__title">Traditional Process Note</h3>
        <p className="report-card__body">Low temperature extraction and natural settling documentation - our commitment to the Kachi Ghani method.</p>
        <a className="report-card__link" href="process.html">
          Read Process
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      </article>
    </div>

    
    <div data-reveal id="report-viewer-quality" style={{"marginTop":"3.5rem"}}>
      <div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","flexWrap":"wrap","gap":"1rem","marginBottom":"1.5rem"}}>
        <div>
          <p style={{"fontFamily":"var(--font-mono)","fontSize":"0.6875rem","textTransform":"uppercase","letterSpacing":"0.1em","color":"var(--color-text-light)","marginBottom":".35rem"}}>Quality Report</p>
          <h2 style={{"fontFamily":"var(--font-heading)","fontSize":"clamp(1.4rem,2.5vw,2rem)","color":"var(--color-navy)","margin":"0"}}>Batch Quality Summary Report</h2>
        </div>
        <span style={{"display":"inline-flex","alignItems":"center","gap":".55rem","padding":".65rem 1.25rem","background":"#17140F","color":"#fff","borderRadius":"100px","fontSize":".8rem","fontFamily":"var(--font-mono)","textTransform":"uppercase","letterSpacing":".06em","fontWeight":"600"}}>View only</span>
      </div>

      <div style={{"position":"relative","borderRadius":"20px","overflow":"hidden","border":"1.5px solid #DDD6CB","boxShadow":"0 24px 64px rgba(0,0,0,.09)","background":"#f5f2ec"}}>
        <div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","padding":".75rem 1.25rem","background":"#FDFCF8","borderBottom":"1px solid #EDE8DF"}}>
          <div style={{"display":"flex","alignItems":"center","gap":".6rem"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C4923A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <span style={{"fontFamily":"var(--font-mono)","fontSize":".72rem","color":"#5A554E","letterSpacing":".04em"}}>Jiraso_Organics_Purity_Summary_Report.pdf</span>
          </div>
          <span style={{"fontFamily":"var(--font-mono)","fontSize":".68rem","textTransform":"uppercase","letterSpacing":".06em","color":"#C4923A","fontWeight":"600"}}>View only</span>
        </div>

        <iframe
          src="assets/Jiraso_Organics_Purity_Summary_Report.pdf"
          width="100%"
          height="680"
          style={{"display":"block","border":"none"}}
          title="JIRASO Organics - Batch Quality Summary Report"
          loading="lazy">
          <p style={{"padding":"2rem","textAlign":"center","color":"#5A554E"}}>Your browser does not support embedded PDFs.</p>
        </iframe>
      </div>
    </div>

    <div data-reveal id="report-viewer-research" style={{"marginTop":"3.5rem"}}>
      <div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","flexWrap":"wrap","gap":"1rem","marginBottom":"1.5rem"}}>
        <div>
          <p style={{"fontFamily":"var(--font-mono)","fontSize":"0.6875rem","textTransform":"uppercase","letterSpacing":"0.1em","color":"var(--color-text-light)","marginBottom":".35rem"}}>Featured Research</p>
          <h2 style={{"fontFamily":"var(--font-heading)","fontSize":"clamp(1.4rem,2.5vw,2rem)","color":"var(--color-navy)","margin":"0"}}>Wood Pressed Oil Research Report</h2>
        </div>
        <span style={{"display":"inline-flex","alignItems":"center","gap":".55rem","padding":".65rem 1.25rem","background":"#17140F","color":"#fff","borderRadius":"100px","fontSize":".8rem","fontFamily":"var(--font-mono)","textTransform":"uppercase","letterSpacing":".06em","fontWeight":"600"}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          View only
        </span>
      </div>

      
      <div style={{"position":"relative","borderRadius":"20px","overflow":"hidden","border":"1.5px solid #DDD6CB","boxShadow":"0 24px 64px rgba(0,0,0,.09)","background":"#f5f2ec"}}>
        
        <div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","padding":".75rem 1.25rem","background":"#FDFCF8","borderBottom":"1px solid #EDE8DF"}}>
          <div style={{"display":"flex","alignItems":"center","gap":".6rem"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C4923A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <span style={{"fontFamily":"var(--font-mono)","fontSize":".72rem","color":"#5A554E","letterSpacing":".04em"}}>research.pdf</span>
          </div>
          <span style={{"fontFamily":"var(--font-mono)","fontSize":".68rem","textTransform":"uppercase","letterSpacing":".06em","color":"#C4923A","fontWeight":"600"}}>View only</span>
        </div>

        
        <iframe
          src="assets/research.pdf"
          width="100%"
          height="680"
          style={{"display":"block","border":"none"}}
          title="JIRASO Organics – Wood Pressed Oil Research Report"
          loading="lazy">
          <p style={{"padding":"2rem","textAlign":"center","color":"#5A554E"}}>Your browser does not support embedded PDFs.</p>
        </iframe>
      </div>
    </div>

    
    <div style={{"display":"grid","gap":"2rem","marginTop":"4rem","padding":"3rem","background":"var(--color-soft-grey)","borderRadius":"20px","position":"relative","overflow":"hidden"}} data-reveal>
      <div style={{"position":"absolute","top":"-40px","right":"-40px","width":"200px","height":"200px","borderRadius":"50%","background":"rgba(0,11,250,0.06)","pointerEvents":"none"}}></div>
      <p style={{"fontFamily":"var(--font-mono)","fontSize":"0.6875rem","textTransform":"uppercase","letterSpacing":"0.1em","color":"var(--color-text-light)"}}>Our Commitment</p>
      <h2 style={{"fontFamily":"var(--font-heading)","fontSize":"clamp(1.75rem,3vw,2.5rem)","color":"var(--color-navy)","maxWidth":"600px","lineHeight":"1.1"}}>Every bottle is backed by complete process transparency.</h2>
      <p style={{"fontSize":"0.9375rem","lineHeight":"1.75","color":"var(--color-text-light)","maxWidth":"540px"}}>We share our quality reports publicly because we believe customers deserve to know exactly what they're consuming. Our processes are documented, traceable, and held to the highest traditional standards.</p>
      <div style={{"display":"flex","gap":"1rem","flexWrap":"wrap"}}>
        <a className="btn btn--primary" href="contact.html">Request Full Reports
          <svg className="icon-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><path d="M10 5.286h-.88V1.5L.62 10 0 9.38 8.5.88H4.714V0H10v5.286Z"/></svg>
        </a>
        <a className="btn" href="process.html" style={{"background":"var(--color-navy)","color":"#fff"}}>Our Process</a>
      </div>
    </div>
  </main>
    </div>
  );
}
