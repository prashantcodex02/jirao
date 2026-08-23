import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const dropConfigs = [
  { left: '8%', size: 14, dur: 14, delay: 0 },
  { left: '22%', size: 20, dur: 18, delay: 3 },
  { left: '38%', size: 10, dur: 12, delay: 1 },
  { left: '55%', size: 18, dur: 20, delay: 5 },
  { left: '70%', size: 12, dur: 15, delay: 2 },
  { left: '85%', size: 22, dur: 22, delay: 7 },
  { left: '15%', size: 16, dur: 16, delay: 9 },
  { left: '60%', size: 8, dur: 11, delay: 4 },
];

export default function Hero() {
  const heroRef = useRef(null);
  const tickerWrapRef = useRef(null);
  const tickerRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    if (typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined') {
      const gsap = window.gsap;
      gsap.registerPlugin(window.ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.to(tickerRef.current, {
          x: '+=80',
          ease: 'none',
          scrollTrigger: {
            trigger: tickerWrapRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });

        gsap.to(bgRef.current, {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      });
      return () => ctx.revert();
    }
  }, []);

  return (
    <>
      <section className="hero" id="hero" ref={heroRef}>
        <div className="cert-bar"><img onLoad={(e) => e.currentTarget.classList.remove('skeleton-loading')} className="skeleton-loading" src="https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/certification02.png?_a=BAMCr6WO0" alt="Certified" fetchPriority="high" /></div>
        <img onLoad={(e) => e.currentTarget.classList.remove('skeleton-loading')} className="skeleton-loading hero__bg" src="https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/hero.png?_a=BAMCr6WO0" alt="JIRASO hero" ref={bgRef} fetchPriority="high" />
        
        <div className="hero-drops" id="hero-drops">
          {dropConfigs.map((c, i) => (
            <div
              key={i}
              className="drop"
              style={{
                left: c.left,
                width: `${c.size}px`,
                height: `${c.size * 1.3}px`,
                animationDuration: `${c.dur}s`,
                animationDelay: `${c.delay}s`
              }}
            />
          ))}
        </div>

        <div className="hero__content">
          <p className="hero__tag">Shuddhata aisi pahle jaisi</p>
          <h1 className="hero__h1">Crafting <em>Purity</em><br />for Modern India</h1>
          <p className="hero__sub">Premium wood-pressed oils inspired by tradition and backed by modern wellness. Pure. Authentic. Timeless.</p>
          <div className="hero__ctas">
            <a className="btn btn--gold" href="#products">
              Explore Collection
              <span className="arr"><svg width="10" height="10" viewBox="0 0 10 10">
                  <path d="M10 5.286h-.88V1.5L.62 10 0 9.38 8.5.88H4.714V0H10v5.286Z" fill="currentColor" />
                </svg></span>
            </a>
            <Link className="btn btn--wire" to="/process">Our Process</Link>
          </div>
        </div>

        <div className="hero__scroll">
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      <div className="ticker-wrap" aria-hidden="true" ref={tickerWrapRef}>
        <div className="ticker-belt" id="ticker" ref={tickerRef}>
          {[1, 2].map((_, idx) => (
            <React.Fragment key={idx}>
              <div className="ticker-item"><span className="ticker-item__label">Get</span><span className="ticker-item__word">Focused</span><span className="ticker-sep"></span></div>
              <div className="ticker-item"><span className="ticker-item__label">Feel</span><span className="ticker-item__word">Energized</span><span className="ticker-sep"></span></div>
              <div className="ticker-item"><span className="ticker-item__label">Enhance</span><span className="ticker-item__word">Health</span><span className="ticker-sep"></span></div>
              <div className="ticker-item"><span className="ticker-item__label">Fuel</span><span className="ticker-item__word">Ambition</span><span className="ticker-sep"></span></div>
              <div className="ticker-item"><span className="ticker-item__label">Live</span><span className="ticker-item__word">Authentically</span><span className="ticker-sep"></span></div>
              <div className="ticker-item"><span className="ticker-item__label">Cook</span><span className="ticker-item__word">Traditionally</span><span className="ticker-sep"></span></div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
