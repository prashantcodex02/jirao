import React, { useEffect, useRef, useState } from 'react';

const images = [
  { src: 'https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/1.png?_a=BAMCr6WO0', alt: 'Our Promise of Purity' },
  { src: 'https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/3.png?_a=BAMCr6WO0', alt: 'Quality Assurance' },
  { src: 'https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/4.png?_a=BAMCr6WO0', alt: 'Traditional Extraction' },
  { src: 'https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/5.png?_a=BAMCr6WO0', alt: 'Wood Pressed Method' },
  { src: 'https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/6.png?_a=BAMCr6WO0', alt: 'Infographic Guide' },
  { src: 'https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/7.png?_a=BAMCr6WO0', alt: 'Small Batch Production' },
  { src: 'https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/8.png?_a=BAMCr6WO0', alt: 'Seed to Oil Story' }
];

export default function StripGallery() {
  const stripRef = useRef(null);
  const trackRef = useRef(null);
  const [modalImg, setModalImg] = useState(null);

  useEffect(() => {
    if (typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined') {
      const ScrollTrigger = window.ScrollTrigger;
      const ctx = window.gsap.context(() => {
        ScrollTrigger.create({
          trigger: stripRef.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: self => {
            const vel = self.getVelocity();
            if (Math.abs(vel) > 10 && trackRef.current) {
              trackRef.current.style.animationPlayState = 'running';
            }
          }
        });
      }, stripRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <>
      <section className="strip-section" id="gallery" aria-label="Gallery" ref={stripRef}>
        <div className="strip-track" id="strip" ref={trackRef}>
          {images.map((img, i) => (
            <div key={`a-${i}`} className="strip-img" onClick={() => setModalImg(img.src)}>
              <img onLoad={(e) => e.currentTarget.classList.remove('skeleton-loading')} className="skeleton-loading" src={img.src} alt={img.alt} loading="lazy" />
              <div className="strip-overlay"><span>View</span></div>
            </div>
          ))}
          {/* Duplicate for infinite marquee effect */}
          {images.map((img, i) => (
            <div key={`b-${i}`} className="strip-img" onClick={() => setModalImg(img.src)}>
              <img onLoad={(e) => e.currentTarget.classList.remove('skeleton-loading')} className="skeleton-loading" src={img.src} alt="" aria-hidden="true" loading="lazy" />
              <div className="strip-overlay"><span>View</span></div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal rendered purely via React State */}
      <div className={`fs-modal ${modalImg ? 'active' : ''}`} onClick={() => setModalImg(null)}>
        <button className="fs-modal__close" onClick={() => setModalImg(null)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
        <div className="fs-modal__content" onClick={e => e.stopPropagation()}>
          {modalImg && <img onLoad={(e) => e.currentTarget.classList.remove('skeleton-loading')} className="skeleton-loading" src={modalImg} alt="Gallery item" />}
        </div>
      </div>
    </>
  );
}
