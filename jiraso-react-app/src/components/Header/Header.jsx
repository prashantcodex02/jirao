import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Header.css';


export default function Header() {
  const { totalQty } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isProductDetails = location.pathname.startsWith('/products/');

  return (
    <>
      <header className={`hdr ${isScrolled || isProductDetails ? 'solid' : ''}`} id="hdr">
        <div className="container hdr__inner">
          <Link className="hdr__logo" to="/">
            <img onLoad={(e) => e.currentTarget.classList.remove('skeleton-loading')} src="https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/logo-white.png?_a=BAMCr6WO0" className="skeleton-loading logo-light" alt="JIRASO Organics" fetchPriority="high" />
            <img onLoad={(e) => e.currentTarget.classList.remove('skeleton-loading')} src="https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/logo.png?_a=BAMCr6WO0" className="skeleton-loading logo-dark" alt="JIRASO Organics" fetchPriority="high" />
          </Link>
          <nav aria-label="Main">
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/process">Process</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/reports">Reports</Link></li>
              <li><Link to="/know-your-oil">Know Your Oil</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/partner">Partner Us</Link></li>
            </ul>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
            <Link className="hdr__cart" to="/cart" id="cart-btn">
              <div style={{ position: 'relative', display: 'inline-flex' }}>
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {totalQty > 0 && (
                  <span id="cart-count" className="cart-count">{totalQty}</span>
                )}
              </div>
              Bag
            </Link>
            <button
              className={`hbg ${isMobileMenuOpen ? 'open' : ''}`}
              id="hbg"
              aria-label="Menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`mob-drawer ${isMobileMenuOpen ? 'open' : ''}`} id="mob-drawer">
        <button className="mob-close" id="mob-close" onClick={() => setIsMobileMenuOpen(false)}>×</button>
        <Link to="/">Home</Link>
        <Link to="/process">Process</Link>
        <Link to="/products">Products</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/know-your-oil">Know Your Oil</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/partner">Partner Us</Link>
      </div>
    </>
  );
}
