import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Process() {
  const containerRef = useRef(null);


  return (
    <div className="inner-page-wrapper" ref={containerRef}>
      <div className="ip-hero">
    <div className="ip-hero__orb ip-hero__orb--1"></div>
    <div className="ip-hero__orb ip-hero__orb--2"></div>
    <div className="ip-hero__noise"></div>
    <div className="container" style={{"position":"relative","zIndex":"1"}}>
      <p className="ip-hero__eyebrow" data-reveal data-delay="1">Our Process</p>
      <h1 className="ip-hero__heading" data-reveal data-delay="2">From Seed to<br />Premium Bottle</h1>
      <p className="ip-hero__sub" data-reveal data-delay="3">Traditional low-heat extraction with modern quality controls - a 10-step journey that preserves nature's goodness.</p>
      <div style={{"marginTop":"2rem","display":"flex","gap":"1.5rem","justifyContent":"center","flexWrap":"wrap"}} data-reveal data-delay="4">
        <span className="badge" style={{"background":"rgba(255,255,255,0.12)","color":"rgba(255,255,255,0.85)","padding":"0.4rem 1rem","borderRadius":"99px","fontFamily":"var(--font-mono)","fontSize":"0.6875rem","letterSpacing":"0.08em","textTransform":"uppercase"}}>10 Steps</span>
        <span className="badge" style={{"background":"rgba(255,255,255,0.12)","color":"rgba(255,255,255,0.85)","padding":"0.4rem 1rem","borderRadius":"99px","fontFamily":"var(--font-mono)","fontSize":"0.6875rem","letterSpacing":"0.08em","textTransform":"uppercase"}}>Zero Chemicals</span>
        <span className="badge" style={{"background":"rgba(255,255,255,0.12)","color":"rgba(255,255,255,0.85)","padding":"0.4rem 1rem","borderRadius":"99px","fontFamily":"var(--font-mono)","fontSize":"0.6875rem","letterSpacing":"0.08em","textTransform":"uppercase"}}>Kachi Ghani</span>
        <span className="badge" style={{"background":"rgba(255,255,255,0.12)","color":"rgba(255,255,255,0.85)","padding":"0.4rem 1rem","borderRadius":"99px","fontFamily":"var(--font-mono)","fontSize":"0.6875rem","letterSpacing":"0.08em","textTransform":"uppercase"}}>Farm Direct</span>
      </div>
    </div>
  </div>

  
  <main className="section-margin container">
    <div className="ip-label" data-reveal>
      <span className="ip-label__text">The Journey</span>
      <span className="ip-label__line"></span>
      <span className="ip-label__text">10 Steps</span>
    </div>

    <section className="process-timeline" aria-label="JIRASO process storyboard">

      
      <article className="process-step">
        <div className="process-step__content" data-reveal="left">
          <p className="process-step__index eyebrow">Step 01</p>
          <h2 className="process-step__title">Responsible Seed Sourcing</h2>
          <p className="process-step__text">We begin with farm-direct procurement, selecting mature mustard, sesame, coconut, and groundnut seeds from trusted growers so purity starts at the source.</p>
        </div>
        <div className="process-step__node"><div className="process-step__num">01</div></div>
        <figure className="process-step__media" data-reveal="right">
          <img onLoad={(e) => e.currentTarget.classList.remove('skeleton-loading')} className="skeleton-loading" src="https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/process1.png?_a=BAMCr6WO0" alt="Selected seeds at sourcing stage" loading="lazy" />
        </figure>
      </article>

      
      <article className="process-step">
        <figure className="process-step__media" data-reveal="left">
          <img onLoad={(e) => e.currentTarget.classList.remove('skeleton-loading')} className="skeleton-loading" src="https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/process2.png?_a=BAMCr6WO0" alt="Seed cleaning and grading" loading="lazy" />
        </figure>
        <div className="process-step__node"><div className="process-step__num">02</div></div>
        <div className="process-step__content" data-reveal="right">
          <p className="process-step__index eyebrow">Step 02</p>
          <h2 className="process-step__title">Cleaning and Grading</h2>
          <p className="process-step__text">Raw seeds are cleaned to remove dust, stones, and foreign matter, then graded for uniform size to maintain pressing consistency and flavor quality.</p>
        </div>
      </article>

      
      <article className="process-step">
        <div className="process-step__content" data-reveal="left">
          <p className="process-step__index eyebrow">Step 03</p>
          <h2 className="process-step__title">Moisture Conditioning</h2>
          <p className="process-step__text">Before pressing, seeds are conditioned to balanced moisture levels, helping us keep extraction stable and avoid nutrient damage from excess heat.</p>
        </div>
        <div className="process-step__node"><div className="process-step__num">03</div></div>
        <figure className="process-step__media" data-reveal="right">
          <img onLoad={(e) => e.currentTarget.classList.remove('skeleton-loading')} className="skeleton-loading" src="https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/process3.png?_a=BAMCr6WO0" alt="Seeds prepared for pressing" loading="lazy" />
        </figure>
      </article>

      
      <article className="process-step">
        <figure className="process-step__media" data-reveal="left">
          <img onLoad={(e) => e.currentTarget.classList.remove('skeleton-loading')} className="skeleton-loading" src="https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/process4.png?_a=BAMCr6WO0" alt="Traditional wooden ghani" loading="lazy" />
        </figure>
        <div className="process-step__node"><div className="process-step__num">04</div></div>
        <div className="process-step__content" data-reveal="right">
          <p className="process-step__index eyebrow">Step 04</p>
          <h2 className="process-step__title">Traditional Kachi Ghani Setup</h2>
          <p className="process-step__text">The wooden ghani setup is calibrated for low-RPM pressing, preserving natural aroma while avoiding aggressive industrial extraction methods.</p>
        </div>
      </article>

      
      <article className="process-step">
        <div className="process-step__content" data-reveal="left">
          <p className="process-step__index eyebrow">Step 05</p>
          <h2 className="process-step__title">Slow Wood Press Extraction</h2>
          <p className="process-step__text">Seeds are pressed slowly in wooden churners so oil is extracted gently, helping retain native micronutrients, body, and authentic taste.</p>
        </div>
        <div className="process-step__node"><div className="process-step__num">05</div></div>
        <figure className="process-step__media" data-reveal="right">
          <img onLoad={(e) => e.currentTarget.classList.remove('skeleton-loading')} className="skeleton-loading" src="https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/process5.png?_a=BAMCr6WO0" alt="Slow wood pressing" loading="lazy" />
        </figure>
      </article>

      
      <article className="process-step">
        <figure className="process-step__media" data-reveal="left">
          <img onLoad={(e) => e.currentTarget.classList.remove('skeleton-loading')} className="skeleton-loading" src="https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/process6.png?_a=BAMCr6WO0" alt="Oil settling tanks" loading="lazy" />
        </figure>
        <div className="process-step__node"><div className="process-step__num">06</div></div>
        <div className="process-step__content" data-reveal="right">
          <p className="process-step__index eyebrow">Step 06</p>
          <h2 className="process-step__title">Natural Settling Time</h2>
          <p className="process-step__text">Freshly extracted oil is rested in stainless vessels, allowing natural sediment to settle without harsh chemical refining.</p>
        </div>
      </article>

      
      <article className="process-step">
        <div className="process-step__content" data-reveal="left">
          <p className="process-step__index eyebrow">Step 07</p>
          <h2 className="process-step__title">Fine Cloth Filtration</h2>
          <p className="process-step__text">We use careful filtration to remove remaining particles while preserving oil character, clarity, and the signature aroma of each seed variety.</p>
        </div>
        <div className="process-step__node"><div className="process-step__num">07</div></div>
        <figure className="process-step__media" data-reveal="right">
          <img onLoad={(e) => e.currentTarget.classList.remove('skeleton-loading')} className="skeleton-loading" src="https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/process7.png?_a=BAMCr6WO0" alt="Oil filtration stage" loading="lazy" />
        </figure>
      </article>

      
      <article className="process-step">
        <figure className="process-step__media" data-reveal="left">
          <img onLoad={(e) => e.currentTarget.classList.remove('skeleton-loading')} className="skeleton-loading" src="https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/process8.png?_a=BAMCr6WO0" alt="Quality testing" loading="lazy" />
        </figure>
        <div className="process-step__node"><div className="process-step__num">08</div></div>
        <div className="process-step__content" data-reveal="right">
          <p className="process-step__index eyebrow">Step 08</p>
          <h2 className="process-step__title">Quality and Purity Checks</h2>
          <p className="process-step__text">Each batch is reviewed for physical and quality parameters so every bottle reflects consistent purity and process integrity.</p>
        </div>
      </article>

      
      <article className="process-step">
        <div className="process-step__content" data-reveal="left">
          <p className="process-step__index eyebrow">Step 09</p>
          <h2 className="process-step__title">Hygienic Bottling</h2>
          <p className="process-step__text">The final oil is filled into food-grade bottles under controlled hygiene standards, then sealed to lock freshness.</p>
        </div>
        <div className="process-step__node"><div className="process-step__num">09</div></div>
        <figure className="process-step__media" data-reveal="right">
          <img onLoad={(e) => e.currentTarget.classList.remove('skeleton-loading')} className="skeleton-loading" src="https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/process9.png?_a=BAMCr6WO0" alt="Oil bottling line" loading="lazy" />
        </figure>
      </article>

      
      <article className="process-step">
        <figure className="process-step__media" data-reveal="left">
          <img onLoad={(e) => e.currentTarget.classList.remove('skeleton-loading')} className="skeleton-loading" src="https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/process10.png?_a=BAMCr6WO0" alt="Packed bottles ready" loading="lazy" />
        </figure>
        <div className="process-step__node"><div className="process-step__num">10</div></div>
        <div className="process-step__content" data-reveal="right">
          <p className="process-step__index eyebrow">Step 10</p>
          <h2 className="process-step__title">Packed for Your Kitchen</h2>
          <p className="process-step__text">From batch coding to dispatch, every bottle is traceable and ready to deliver authentic wood-pressed goodness to modern homes.</p>
        </div>
      </article>

    </section>

    
    <div className="process-cta-strip" data-reveal>
      <div>
        <p className="process-cta-strip__eyebrow">Ready to taste the difference?</p>
        <p className="process-cta-strip__heading">Order your first bottle today</p>
      </div>
      <div className="process-cta-strip__actions">
        <a className="btn btn--primary" href="products.html">Shop Now
          <svg className="icon-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><path d="M10 5.286h-.88V1.5L.62 10 0 9.38 8.5.88H4.714V0H10v5.286Z"/></svg>
        </a>
        <a className="process-cta-strip__ghost" href="contact.html">Bulk Inquiry</a>
      </div>
    </div>

    </main>
    </div>
  );
}
