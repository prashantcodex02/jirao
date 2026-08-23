import React from 'react';
import { Link } from 'react-router-dom';


export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="fb">
            <Link to="/" className="fb__logo">
              <img onLoad={(e) => e.currentTarget.classList.remove('skeleton-loading')} className="skeleton-loading" src="https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/logo-white.png?_a=BAMCr6WO0" alt="Jiraso Organics" loading="lazy" style={{ height: '55px', width: 'auto' }} />
            </Link>
            <p>100% Natural &bull; No Chemicals<br />Traditional Wood Pressed Oils<br />Madhwapur, Salempur, Uttar Pradesh, India</p>
          </div>
          <div className="fc">
            <h4>Support</h4>
            <ul>
              <li><a href="#faqs">FAQs</a></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div className="fc">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><Link to="/products">Our Products</Link></li>
              <li><Link to="/process">Our Process</Link></li>
              <li><a href="#articles">Blog</a></li>
            </ul>
          </div>
          <div className="fc">
            <h4>Connect</h4>
            <ul>
              <li><a href="https://www.instagram.com/jiraso_organics" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://www.facebook.com/share/17VwAFejdC/" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://www.youtube.com/@Jiraso_organics" target="_blank" rel="noopener noreferrer">YouTube</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-btm">
          <p style={{ marginBottom: '1.5rem', opacity: 0.6, fontSize: '0.75rem' }}>
            Disclaimer: Images shown are for illustrative purposes only. The actual product may vary in appearance.
          </p>
          <p>&copy; 2026 JIRASO Organics. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
