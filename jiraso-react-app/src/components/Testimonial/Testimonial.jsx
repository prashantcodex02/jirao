import React, { useEffect, useRef, useState } from 'react';

export default function Testimonial() {
  const quoteRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    if (quoteRef.current) {
      observer.observe(quoteRef.current);
    }

    return () => {
      if (quoteRef.current) observer.unobserve(quoteRef.current);
    };
  }, []);

  return (
    <section className="testi-section" id="product-quote">
      <img onLoad={(e) => e.currentTarget.classList.remove('skeleton-loading')} className="skeleton-loading testi__bottle" src="https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/flying_bottle.png?_a=BAMCr6WO0" alt="" aria-hidden="true" loading="lazy" />
      <div className="testi__inner">
        <div className="testi__stars">
          <span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span>
        </div>
        <blockquote 
          className={`testi__quote ${isVisible ? 'show' : ''}`} 
          id="testi-quote" 
          ref={quoteRef}
        >
          "JIRASO oils bring back the authentic taste of traditional cooking.
          You can feel the difference in both flavour and health
          with every single drop."
        </blockquote>
        <cite className="testi__cite">&mdash; Happy Customer &bull; JIRASO Organics</cite>
      </div>
    </section>
  );
}
