import React, { useEffect, useRef, useState } from 'react';
import './Products.css';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import SEOHead from '../../components/SEOHead/SEOHead';
import { productsData } from '../../data/products';

const oilProducts = productsData.filter(p => p.mainCategory === 'oils');
const naturalProducts = productsData.filter(p => p.mainCategory === 'natural-foods');

const productsPageSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.jirasoorganics.com/' },
      { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://www.jirasoorganics.com/products' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'JIRASO Organics – Products',
    description: 'Buy 100% pure wood-pressed oils, millet flours, healthy snacks & natural foods online in India.',
    url: 'https://www.jirasoorganics.com/products',
    itemListElement: productsData.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://www.jirasoorganics.com${p.link}`,
      name: p.fullName,
    })),
  },
];

const oilSubCategories = [
  { key: 'all', label: 'All Oils' },
  { key: 'cooking', label: 'Cooking' },
  { key: 'wellness', label: 'Wellness' },
  { key: 'tropical', label: 'Tropical' },
];

const naturalSubCategories = [
  { key: 'all', label: 'All' },
  { key: 'flour', label: 'Flours' },
  { key: 'snack', label: 'Snacks' },
  { key: 'grain', label: 'Grains & Rice' },
  { key: 'sweetener', label: 'Sweeteners' },
];

export default function Products() {
  const containerRef = useRef(null);
  const [mainTab, setMainTab] = useState('oils');
  const [activeCategory, setActiveCategory] = useState('all');
  const { addItem } = useCart();

  const currentProducts = mainTab === 'oils' ? oilProducts : naturalProducts;
  const currentSubCategories = mainTab === 'oils' ? oilSubCategories : naturalSubCategories;

  const filteredProducts = currentProducts.filter(
    (product) => activeCategory === 'all' || product.category === activeCategory
  );

  // Reset sub-filter when switching main tabs
  const handleMainTabChange = (tab) => {
    setMainTab(tab);
    setActiveCategory('all');
  };

  useEffect(() => {
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
  }, [activeCategory, mainTab]);

  return (
    <div className="inner-page-wrapper" ref={containerRef}>
      <SEOHead
        title="Shop Wood-Pressed Oils & Natural Foods"
        description="Buy 100% pure wood-pressed oils, millet flours, healthy snacks & natural foods online. JIRASO Organics offers traditional products — chemical-free & nutritious. Free delivery across India."
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
            kitchens — wood-pressed oils and ancient grain superfoods.</p>
        </div>
      </div>

      <main>
        <section className="section-margin container" id="products">

          {/* Main Category Tabs */}
          <div className="main-category-tabs">
            <button
              className={`main-tab ${mainTab === 'oils' ? 'is-active' : ''}`}
              onClick={() => handleMainTabChange('oils')}
            >
              <span className="main-tab__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C12 2 5 9 5 14a7 7 0 0 0 14 0c0-5-7-12-7-12z"/>
                </svg>
              </span>
              <span className="main-tab__label">Edible Oils</span>
              <span className="main-tab__count">{oilProducts.length}</span>
            </button>
            <button
              className={`main-tab ${mainTab === 'natural-foods' ? 'is-active' : ''}`}
              onClick={() => handleMainTabChange('natural-foods')}
            >
              <span className="main-tab__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 22l1-1h18l1 1"/>
                  <path d="M6 20V8c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v12"/>
                  <path d="M12 4V2"/>
                  <path d="M9 6c0-1.7 1.3-3 3-3s3 1.3 3 3"/>
                </svg>
              </span>
              <span className="main-tab__label">Millets &amp; Natural Foods</span>
              <span className="main-tab__count">{naturalProducts.length}</span>
            </button>
          </div>

          {/* Section Label */}
          <div className="ip-label" data-reveal>
            <span className="ip-label__text">Shop by Category</span>
            <span className="ip-label__line"></span>
            <span className="ip-label__text">{mainTab === 'oils' ? 'Edible Oils' : 'Millets & Natural Foods'}</span>
          </div>

          {/* Sub-category Filter Chips */}
          <div className="products-filter-bar" data-reveal data-delay="1">
            {currentSubCategories.map(sub => (
              <button
                key={sub.key}
                className={`filter-chip ${activeCategory === sub.key ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(sub.key)}
              >
                {sub.label}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="products-grid" id="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className={`product-card-wrap ${product.outOfStock ? 'oos' : ''}`} data-reveal data-delay={product.delay} data-category={product.category}>
                {product.outOfStock && <span className="oos-badge">Out of Stock</span>}
                <div className="product-card" style={{ "--card-bg": product.bg }}>
                  <div className="product-card__header">
                    <p className="product-card__name" style={product.headerTextColor ? { color: product.headerTextColor } : {}}>{product.name}</p>
                    <p className="product-card__price-display" style={product.headerTextColor ? { color: product.headerTextColor } : {}}>{product.priceHeader}</p>
                  </div>
                  {product.badge && <span className="badge badge--shimmer">{product.badge}</span>}
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
                          {sku.size} — ₹{sku.price}
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
                        e.preventDefault();
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

          {/* Stats Strip */}
          <div
            style={{ "display": "grid", "gridTemplateColumns": "repeat(auto-fit,minmax(200px,1fr))", "gap": "1px", "background": "var(--color-border)", "border": "1px solid var(--color-border)", "borderRadius": "16px", "overflow": "hidden", "marginTop": "4rem" }}
            data-reveal>
            <div style={{"background":"#fff","padding":"2rem 1.5rem"}}>
              <p style={{"fontFamily":"var(--font-heading)","fontSize":"2.5rem","color":"var(--color-navy)","lineHeight":"1","marginBottom":"0.5rem"}}>
                0°</p>
              <p style={{"fontFamily":"var(--font-mono)","fontSize":"0.6875rem","textTransform":"uppercase","letterSpacing":"0.06em","color":"var(--color-text-light)"}}>
                Chemical Processing</p>
            </div>
            <div style={{"background":"#fff","padding":"2rem 1.5rem"}}>
              <p style={{"fontFamily":"var(--font-heading)","fontSize":"2.5rem","color":"var(--color-navy)","lineHeight":"1","marginBottom":"0.5rem"}}>
                100%</p>
              <p style={{"fontFamily":"var(--font-mono)","fontSize":"0.6875rem","textTransform":"uppercase","letterSpacing":"0.06em","color":"var(--color-text-light)"}}>
                Natural Ingredients</p>
            </div>
            <div style={{"background":"#fff","padding":"2rem 1.5rem"}}>
              <p style={{"fontFamily":"var(--font-heading)","fontSize":"2.5rem","color":"var(--color-navy)","lineHeight":"1","marginBottom":"0.5rem"}}>
                18+</p>
              <p style={{"fontFamily":"var(--font-mono)","fontSize":"0.6875rem","textTransform":"uppercase","letterSpacing":"0.06em","color":"var(--color-text-light)"}}>
                Product Varieties</p>
            </div>
            <div style={{"background":"#fff","padding":"2rem 1.5rem"}}>
              <p style={{"fontFamily":"var(--font-heading)","fontSize":"2.5rem","color":"var(--color-navy)","lineHeight":"1","marginBottom":"0.5rem"}}>
                10</p>
              <p style={{"fontFamily":"var(--font-mono)","fontSize":"0.6875rem","textTransform":"uppercase","letterSpacing":"0.06em","color":"var(--color-text-light)"}}>
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
