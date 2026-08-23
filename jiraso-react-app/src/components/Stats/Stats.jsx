import React, { useEffect, useRef, useState } from 'react';

const statsData = [
  { target: 100, dashoffset: 0, suffix: '%', label: 'Natural Ingredients', infinite: false },
  { target: 0, dashoffset: 345, suffix: '', label: 'Chemicals Added', infinite: false },
  { target: 5, dashoffset: 276, suffix: '+', label: 'Oil Varieties', infinite: false },
  { target: null, dashoffset: 0, suffix: '', label: 'Traditional Wisdom', infinite: true }
];

function StatItem({ stat, index }) {
  const itemRef = useRef(null);
  const ringRef = useRef(null);
  const [count, setCount] = useState(stat.infinite ? '∞' : 0);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    let observer;
    if (!stat.infinite) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          
          const dur = 1400;
          const start = performance.now();
          const target = stat.target;
          
          const step = (time) => {
            const prog = Math.min((time - start) / dur, 1);
            const ease = 1 - Math.pow(1 - prog, 3);
            const currentCount = Math.floor(ease * target);
            setCount(currentCount);
            
            if (prog < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(target);
              // Trigger glow effect via inline style or class
              const numEl = entry.target.querySelector('.stat-num');
              if (numEl) {
                numEl.style.textShadow = '0 0 24px rgba(196,146,58,0.4)';
                setTimeout(() => { numEl.style.textShadow = ''; }, 800);
              }
            }
          };
          requestAnimationFrame(step);

          if (ringRef.current) {
            ringRef.current.style.strokeDashoffset = stat.dashoffset;
          }
          
          observer.unobserve(el);
        });
      }, { threshold: 0.6 });
      
      observer.observe(el);
    }

    return () => {
      if (observer && el) observer.unobserve(el);
    };
  }, [stat]);

  return (
    <div className={`stat-item rv d${index + 1}`} ref={itemRef}>
      <div className="stat-ring">
        <svg viewBox="0 0 120 120">
          <circle className="stat-ring__bg" cx="60" cy="60" r="55" />
          <circle 
            className="stat-ring__fg" 
            cx="60" cy="60" r="55" 
            ref={ringRef}
            style={stat.infinite ? {} : { strokeDashoffset: 345 }} // Start empty
          />
        </svg>
        <div className="stat-num">
          {count}{!stat.infinite && stat.suffix}
        </div>
      </div>
      <p className="stat-ttl">{stat.label}</p>
    </div>
  );
}

export default function Stats() {
  const containerRef = useRef(null);


  return (
    <section className="stats-section" id="stats" ref={containerRef}>
      <div className="container">
        <div className="stats-label rv">
          <p className="sec-num">Pure &amp; Trusted</p>
          <h2>Purity by the Numbers</h2>
        </div>
        <div className="stats-grid">
          {statsData.map((stat, idx) => (
            <StatItem key={idx} stat={stat} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
