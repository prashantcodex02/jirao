import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Editorial() {
  const editorialRef = useRef(null);

  useEffect(() => {
    if (typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined') {
      const gsap = window.gsap;
      const ctx = gsap.context(() => {
        gsap.fromTo('.editorial__ghost', { scale: 1 }, {
          scale: 1.06,
          ease: 'none',
          scrollTrigger: { 
            trigger: editorialRef.current, 
            start: 'top bottom', 
            end: 'bottom top', 
            scrub: 1 
          }
        });
      }, editorialRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <section className="editorial" id="about" ref={editorialRef}>
      <div className="editorial__ghost" aria-hidden="true">JIRASO</div>
      <div className="container editorial__inner">
        <p className="editorial__eye">Why We Exist</p>
        <h2 className="editorial__heading" id="ed-heading">
          We exist to bring back <em>purity</em> in everyday cooking -
          reviving traditional wood-pressed methods that <em>nourish</em>
          your body, enhance taste and support long-term wellness.
        </h2>
        <div className="editorial__foot">
          <p>Nature-powered oils. Real nutrition. Experience the difference of chemical-free living.</p>
          <Link className="btn btn--gold" to="/process">
            Discover Process
            <span className="arr"><svg width="10" height="10" viewBox="0 0 10 10">
                <path d="M10 5.286h-.88V1.5L.62 10 0 9.38 8.5.88H4.714V0H10v5.286Z" fill="currentColor" />
              </svg></span>
          </Link>
        </div>
      </div>
    </section>
  );
}
