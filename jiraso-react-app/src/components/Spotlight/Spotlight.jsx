import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Spotlight() {
  const spotImgRef = useRef(null);

  useEffect(() => {
    if (typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined') {
      const gsap = window.gsap;
      const ctx = gsap.context(() => {
        gsap.to(spotImgRef.current, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: { 
            trigger: '#spot-img', 
            start: 'top bottom', 
            end: 'bottom top', 
            scrub: 1 
          }
        });
      });
      return () => ctx.revert();
    }
  }, []);

  return (
    <section className="spotlight" id="variety">
      <div className="container">
        <div className="spotlight__grid">
          <div>
            <div className="spotlight__img" id="spot-img">
              <img onLoad={(e) => e.currentTarget.classList.remove('skeleton-loading')} className="skeleton-loading" src="https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/mid_bottle.png?_a=BAMCr6WO0" alt="Product Range" ref={spotImgRef} loading="lazy" />
            </div>
          </div>
          <div className="spotlight__content rv d2">
            <p className="sec-num">Product Range</p>
            <h2>One Brand.<br /><em>Complete Kitchen.</em></h2>
            <p>From wood-pressed oils to ghee, pulses, spices and natural sweeteners - everything you need for a healthy
              and traditional kitchen.</p>
            <ul className="chk">
              <li>Wood Pressed Oils</li>
              <li>A2 Desi Ghee</li>
              <li>Pulses &amp; Flours</li>
              <li>Natural Sweeteners</li>
              <li>Spices &amp; Condiments</li>
            </ul>
            <a className="btn btn--dark" href="#products">
              Explore Range
              <span className="arr"><svg width="10" height="10" viewBox="0 0 10 10">
                  <path d="M10 5.286h-.88V1.5L.62 10 0 9.38 8.5.88H4.714V0H10v5.286Z" fill="currentColor" />
                </svg></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
