import React, { useEffect, useRef, useState } from 'react';
import './Products.css';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import SEOHead from '../../components/SEOHead/SEOHead';
import { productsData } from '../../data/products';

const productsPageSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.jirasoorganics.com/' },
      { '@type': 'ListItem', position: 2, name: 'Shop Oils', item: 'https://www.jirasoorganics.com/products' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'JIRASO Organics – Wood-Pressed Oils',
    description: 'Buy 100% pure wood-pressed, chemical-free cooking oils online in India.',
    url: 'https://www.jirasoorganics.com/products',
    itemListElement: productsData.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://www.jirasoorganics.com${p.link}`,
      name: p.fullName,
    })),
  },
];

export default function Products() {
  const containerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const { addItem } = useCart();

  const filteredProducts = productsData.filter(
    (product) => activeCategory === 'all' || product.category === activeCategory
  );

  useEffect(() => {
    // Re-run the reveal logic whenever products are filtered
    // This prevents them from staying hidden after React re-renders and wipes the 'is-visible' class
    const timer = setTimeout(() => {
      const dataRevealEls = document.querySelectorAll('#products-grid [data-reveal]');
      if (dataRevealEls.length > 0) {
        const drObs = new IntersectionObserver(entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              e.target.classList.add('is-visible');
              drObs.unobserve(e.target);
            }
          });
        }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
        
        dataRevealEls.forEach(el => drObs.observe(el));
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [activeCategory]);

  return (
    <div className="inner-page-wrapper" ref={containerRef}>
      <SEOHead
        title="Shop Wood-Pressed & Natural Cooking Oils"
        description="Buy 100% pure wood-pressed, chemical-free cooking oils online. JIRASO Organics offers traditional kachi ghani mustard oil, sesame oil, coconut oil & groundnut oil. Free delivery across India."
        canonical="https://www.jirasoorganics.com/products"
        schemaJson={productsPageSchema}
      />
      <div className="ip-hero">

    <div className="ip-hero__orb ip-hero__orb--1"></div>
    <div className="ip-hero__orb ip-hero__orb--2"></div>
    <div className="ip-hero__noise"></div>
    <div className="container" style={{"position":"relative","zIndex":"1"}}>
      <p className="ip-hero__eyebrow" data-reveal data-delay="1">01 / Our Offerings</p>
      <h1 className="ip-hero__heading" data-reveal data-delay="2">Our Products</h1>
      <p className="ip-hero__sub" data-reveal data-delay="3">Everyday essentials, traditionally crafted for healthier
        kitchens — wood-pressed and unrefined.</p>
    </div>
  </div>

  
  <main>
    <section className="section-margin container" id="products">
      <div className="ip-label" data-reveal>
        <span className="ip-label__text">Shop by Category</span>
        <span className="ip-label__line"></span>
        <span className="ip-label__text">Edible Oils</span>
      </div>

      <div className="products-filter-bar" data-reveal data-delay="1">
        <button className={`filter-chip ${activeCategory === 'all' ? 'is-active' : ''}`} onClick={() => setActiveCategory('all')}>All Oils</button>
        <button className={`filter-chip ${activeCategory === 'cooking' ? 'is-active' : ''}`} onClick={() => setActiveCategory('cooking')}>Cooking</button>
        <button className={`filter-chip ${activeCategory === 'wellness' ? 'is-active' : ''}`} onClick={() => setActiveCategory('wellness')}>Wellness</button>
        <button className={`filter-chip ${activeCategory === 'tropical' ? 'is-active' : ''}`} onClick={() => setActiveCategory('tropical')}>Tropical</button>
      </div>

      <div className="products-grid" id="products-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className={`product-card-wrap ${product.outOfStock ? 'oos' : ''}`} data-reveal data-delay={product.delay} data-category={product.category}>
            {product.outOfStock && <span className="oos-badge">Out of Stock</span>}
            <div className="product-card" style={{ "--card-bg": product.bg }}>
              <div className="product-card__header">
                <p className="product-card__name" style={product.headerTextColor ? { color: product.headerTextColor } : {}}>{product.name}</p>
                <p className="product-card__price-display" style={product.headerTextColor ? { color: product.headerTextColor } : {}}>{product.priceHeader}</p>
              </div>
              <span className="badge badge--shimmer">{product.badge}</span>
              <div className="product-card__image-wrap">
                <img onLoad={(e) => e.currentTarget.classList.remove('skeleton-loading')} className="skeleton-loading product-card__img" src={product.img} alt={product.fullName} title="Click to view" loading="lazy" />
              </div>
              <div className="product-card__footer">
                <div className="product-card__title-row" style={{ "display": "none" }}>
                  <p className="product-card__name">{product.fullName}</p>
                  <p className="product-card__size eyebrow" id={`${product.id}-size-label`}>{product.sizeLabel}</p>
                </div>
                
                <div className="card-skus">
                  {product.skus.map((sku, i) => (
                    <button key={i} className={`card-sku-chip ${sku.selected ? 'is-selected' : ''}`} data-price={sku.dataPrice}>
                      {sku.size} — {sku.price}
                    </button>
                  ))}
                </div>
                <div className="product-card__ingredients">
                  <div className="ingredients-track">
                    {product.ingredients.map((ing, i) => <span key={i}>{ing} / </span>)}
                    {product.ingredients.map((ing, i) => <span key={`dup-${i}`}>{ing} / </span>)}
                  </div>
                </div>
              </div>
              
              <div className="product-card__overlay">
                <Link className="product-card__overlay-view" to={product.link}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  View Product
                </Link>
                <button 
                  className="product-card__overlay-cart" 
                  onClick={(e) => {
                    e.preventDefault(); // Prevent accidental navigation if nested
                    addItem({
                      id: product.id,
                      name: product.fullName,
                      price: Number(product.skus.find(s => s.selected)?.dataPrice || 0),
                      img: product.img,
                      size: product.sizeLabel,
                      qty: 1,
                      outOfStock: product.outOfStock
                    });
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{ "display": "grid", "gridTemplateColumns": "repeat(auto-fit,minmax(200px,1fr))", "gap": "1px", "background": "var(--color-border)", "border": "1px solid var(--color-border)", "borderRadius": "16px", "overflow": "hidden", "marginTop": "4rem" }}
        data-reveal>
        <div style={{"background":"#fff","padding":"2rem 1.5rem"}}>
          <p
            style={{"fontFamily":"var(--font-heading)","fontSize":"2.5rem","color":"var(--color-navy)","lineHeight":"1","marginBottom":"0.5rem"}}>
            0°</p>
          <p
            style={{"fontFamily":"var(--font-mono)","fontSize":"0.6875rem","textTransform":"uppercase","letterSpacing":"0.06em","color":"var(--color-text-light)"}}>
            Chemical Processing</p>
        </div>
        <div style={{"background":"#fff","padding":"2rem 1.5rem"}}>
          <p
            style={{"fontFamily":"var(--font-heading)","fontSize":"2.5rem","color":"var(--color-navy)","lineHeight":"1","marginBottom":"0.5rem"}}>
            100%</p>
          <p
            style={{"fontFamily":"var(--font-mono)","fontSize":"0.6875rem","textTransform":"uppercase","letterSpacing":"0.06em","color":"var(--color-text-light)"}}>
            Natural Seeds</p>
        </div>
        <div style={{"background":"#fff","padding":"2rem 1.5rem"}}>
          <p
            style={{"fontFamily":"var(--font-heading)","fontSize":"2.5rem","color":"var(--color-navy)","lineHeight":"1","marginBottom":"0.5rem"}}>
            4+</p>
          <p
            style={{"fontFamily":"var(--font-mono)","fontSize":"0.6875rem","textTransform":"uppercase","letterSpacing":"0.06em","color":"var(--color-text-light)"}}>
            Oil Varieties</p>
        </div>
        <div style={{"background":"#fff","padding":"2rem 1.5rem"}}>
          <p
            style={{"fontFamily":"var(--font-heading)","fontSize":"2.5rem","color":"var(--color-navy)","lineHeight":"1","marginBottom":"0.5rem"}}>
            10</p>
          <p
            style={{"fontFamily":"var(--font-mono)","fontSize":"0.6875rem","textTransform":"uppercase","letterSpacing":"0.06em","color":"var(--color-text-light)"}}>
            Quality Steps</p>
        </div>
      </div>

      
      <div style={{"textAlign":"center","paddingBlock":"3.5rem 1rem"}} data-reveal>
        <a className="btn btn--primary" href="contact.html">Request Bulk Pricing
          <svg className="icon-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
            <path d="M10 5.286h-.88V1.5L.62 10 0 9.38 8.5.88H4.714V0H10v5.286Z" />
          </svg>
        </a>
      </div>
    </section>
  </main>
    </div>
  );
}
