import React from 'react';

export default function Education() {
  return (
    <section className="edu-section" id="articles">
      <div className="container">
        <div className="edu-label rv">
          <p className="sec-num">Education</p>
        </div>
        <a className="article-card rv d1" href="#article-link" id="article-link">
          <div className="article-card__imgwrap">
            <img onLoad={(e) => e.currentTarget.classList.remove('skeleton-loading')} className="skeleton-loading" src="https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/last_image.png?_a=BAMCr6WO0" alt="What is Wood Pressed Oil?" loading="lazy" />
          </div>
          <div className="article-card__body">
            <p className="mono">Read · Knowledge</p>
            <h3>What is Wood Pressed Oil?</h3>
            <div className="read-bar">
              <div className="read-bar__fill" id="read-fill"></div>
            </div>
            <p>Wood pressed oil is extracted using a traditional wooden churner at low temperatures, preserving nutrients,
              aroma and natural composition - making it far healthier than refined alternatives.</p>
            <span className="btn btn--dark">
              Read More
              <span className="arr"><svg width="10" height="10" viewBox="0 0 10 10">
                  <path d="M10 5.286h-.88V1.5L.62 10 0 9.38 8.5.88H4.714V0H10v5.286Z" fill="currentColor" />
                </svg></span>
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}
