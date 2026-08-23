import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const products = [
  {
    id: 'mustard',
    name: 'Wood Pressed Black Mustard oil',
    shortName: 'Mustard',
    img: 'https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/mustard.png?_a=BAMCr6WO0',
    badge: 'Best Seller',
    desc: 'Bold, pungent oil perfect for traditional Indian cooking.',
    ribbon: ['Mustard Seeds', 'Omega-3', 'Vitamin E', 'Antioxidants'],
    pills: ['Wood Pressed', '1 L'],
    price: 350,
    outOfStock: false,
    link: '/products/mustard'
  },
  {
    id: 'sesame',
    name: 'Sesame Oil',
    shortName: 'Sesame',
    img: 'https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/sesame.png?_a=BAMCr6WO0',
    badge: 'Popular',
    desc: 'Rich aroma ideal for South Indian & wellness cooking.',
    ribbon: ['Sesame Seeds', 'Calcium', 'Iron', 'Sesamin'],
    pills: ['Wood Pressed', '1 L'],
    price: 450,
    outOfStock: true,
    link: '/products/sesame'
  },
  {
    id: 'coconut',
    name: 'Coconut Oil',
    shortName: 'Coconut',
    img: 'https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/coconut.png?_a=BAMCr6WO0',
    badge: 'Popular',
    desc: 'Pure tropical oil for cooking, skin and holistic health.',
    ribbon: ['Coconuts', 'Lauric Acid', 'MCTs', 'Vitamin K'],
    pills: ['Wood Pressed', '1 L'],
    price: 320,
    outOfStock: true,
    link: '/products/coconut'
  },
  {
    id: 'groundnut',
    name: 'Groundnut Oil',
    shortName: 'Groundnut',
    img: 'https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/groundnut.png?_a=BAMCr6WO0',
    badge: 'Popular',
    desc: 'Light, versatile oil for everyday home cooking.',
    ribbon: ['Peanuts', 'Vitamin A', 'Vitamin E', 'Folate'],
    pills: ['Wood Pressed', '1 L'],
    price: 280,
    outOfStock: true,
    link: '/products/groundnut'
  }
];

function ProductCard({ product, delayIndex }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    if (product.outOfStock) return;
    
    addItem({ name: product.name, size: '1 L', price: product.price, img: product.img, qty: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);

    // Call global fly animation if available
    if (typeof window.animateFlyToCart === 'function') {
      window.animateFlyToCart(e.currentTarget, product.img);
    }
  };

  return (
    <div className={`pc rv d${delayIndex + 1} ${product.outOfStock ? 'oos' : ''}`} id={`pc-${product.id}`}>
      {product.outOfStock && <span className="oos-badge">Out of Stock</span>}
      <p className="pc__num">{product.shortName}</p>
      {product.badge && <span className="badge badge--shimmer">{product.badge}</span>}
      
      <div className="pc__img-wrap">
        <img onLoad={(e) => e.currentTarget.classList.remove('skeleton-loading')} className="skeleton-loading pc__img" src={product.img} alt={product.name} loading="lazy" />
      </div>
      
      <div className="pc__body">
        <p className="pc__name">{product.name}</p>
        <p className="pc__desc">{product.desc}</p>
        <div className="pc__ribbon">
          <div className="ribbon-track">
            {product.ribbon.map((r, i) => <span key={i}>{r} /&nbsp;</span>)}
            {product.ribbon.map((r, i) => <span key={`dup-${i}`}>{r} /&nbsp;</span>)}
          </div>
        </div>
        <div className="pc__foot">
          <div className="pc__pills">
            {product.pills.map((pill, i) => <span key={i} className="pill">{pill}</span>)}
          </div>
        </div>
      </div>
      
      <div className="pc__overlay">
        <Link className="pc__overlay-view" to={product.link}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          View Product
        </Link>
        <button className={`pc__overlay-cart ${added ? 'is-added' : ''}`} onClick={handleAdd}>
          {added ? (
            'Added to Cart'
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function ProductGrid() {
  const gridRef = useRef(null);


  return (
    <section className="prod-section" id="products">
      <div className="container">
        <div className="prod-header rv">
          <div>
            <p className="sec-num">Our Offerings</p>
            <h2>Shop by<br /><em>Category</em></h2>
          </div>
          <p>Premium wood-pressed oils extracted the traditional way - no heat, no chemicals, nothing but pure goodness from nature's finest seeds.</p>
        </div>
        <div className="prod-grid" ref={gridRef}>
          {products.map((p, index) => (
            <ProductCard key={p.id} product={p} delayIndex={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
