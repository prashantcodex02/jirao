import React, { useEffect, useState } from 'react';


const criticalImages = [
  "https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/hero.png?_a=BAMCr6WO0",
  "https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/logo-white.png?_a=BAMCr6WO0",
  "https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/certification02.png?_a=BAMCr6WO0"
];

export default function Preloader() {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let isMinTimeElapsed = false;
    let areImagesLoaded = false;
    
    // Ensure the preloader shows for at least 1800ms for the animation
    const minTimer = setTimeout(() => {
      isMinTimeElapsed = true;
      if (areImagesLoaded) setIsDone(true);
    }, 1800);

    // Fallback maximum wait time of 4 seconds in case of network issues
    const maxTimer = setTimeout(() => {
      setIsDone(true);
    }, 4000);

    // Preload critical images in the background
    Promise.all(criticalImages.map(src => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = resolve; // Continue even if one fails
      });
    })).then(() => {
      areImagesLoaded = true;
      if (isMinTimeElapsed) {
        setIsDone(true);
        clearTimeout(maxTimer);
      }
    });

    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
    };
  }, []);

  return (
    <>
      <div id="preloader" className={isDone ? 'done' : ''}>
        <div className="pre-logo">JIRA<span>SO</span></div>
        <div className="pre-bar-wrap">
          <div className="pre-bar"></div>
        </div>
        <p className="pre-tag">Authentic Wood Pressed</p>
      </div>
      <div id="progress-bar"></div>
    </>
  );
}
