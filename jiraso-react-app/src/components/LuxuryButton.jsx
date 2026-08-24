import React from 'react';
import './LuxuryButton.css';

export default function LuxuryButton({ isOrdering, isSuccess, defaultText, type = "submit" }) {
  // Determine state class
  let stateClass = '';
  if (isOrdering) stateClass = 'state-loading';
  if (isSuccess) stateClass = 'state-success';

  return (
    <div className="ultra-lux-container">
      <button 
        type={type} 
        disabled={isOrdering || isSuccess} 
        className={`ultra-lux-btn ${stateClass}`}
      >
        <div className="lux-loader-ring"></div>
        
        <span className="lux-sparkle lux-sparkle-1"></span>
        <span className="lux-sparkle lux-sparkle-2"></span>
        <span className="lux-sparkle lux-sparkle-3"></span>

        <span className="lux-content-layer lux-idle">
          {defaultText}
        </span>
        
        <span className="lux-content-layer lux-loading">
          <span style={{ zIndex: 3 }}>Processing...</span>
        </span>
        
        <span className="lux-content-layer lux-success">
          <svg className="lux-check-svg" viewBox="0 0 50 50">
            <path d="M14,26 L22,34 L38,16" />
          </svg>
          <span className="lux-success-text">Order Confirmed</span>
        </span>
      </button>
    </div>
  );
}
