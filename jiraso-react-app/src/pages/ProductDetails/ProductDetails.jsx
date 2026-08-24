import React, { useEffect, useRef, useState } from 'react';
import './ProductDetails.css';
import '../Cart/Cart.css'; // For modal styles
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import LuxuryButton from '../../components/LuxuryButton';
import { productsData } from '../../data/products';
import SEOHead from '../../components/SEOHead/SEOHead';

export default function ProductDetails() {
  const { id } = useParams();
  const containerRef = useRef(null);
  const { addItem } = useCart();
  const navigate = useNavigate();

  const product = productsData.find(p => p.id === id);
  const defaultSku = product?.skus?.find(s => s.selected) || product?.skus?.[0];

  // State for ordering
  const [size, setSize] = useState(defaultSku?.size || '1 L');
  const [price, setPrice] = useState(defaultSku?.price || 399);

  // When product changes, reset size and price
  useEffect(() => {
    if (product) {
      const defSku = product.skus.find(s => s.selected) || product.skus[0];
      if (defSku) {
        setSize(defSku.size);
        setPrice(defSku.price);
      }
    }
  }, [product]);
  const [quantity, setQuantity] = useState(1);
  const [isOrdering, setIsOrdering] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setIsOrdering(true);
    try {
      const response = await fetch('https://jirao.vercel.app/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          details: `Type: Standard Order (Direct from Product Page)\nAddress: ${formData.address}\nLandmark: ${formData.landmark}\nCity: ${formData.city}\nState: ${formData.state}\nPincode: ${formData.pincode}\nNotes: ${formData.notes}`,
          items: [{
            product: product ? product.fullName : 'Unknown Product',
            size: size,
            quantity: quantity,
            price: price,
            total: price * quantity
          }]
        }),
      });
      
      if (response.ok) {
        setIsOrdering(false);
        setIsSuccess(true);
        setTimeout(() => {
          alert('Order placed successfully! Check your email inbox.');
          setShowModal(false);
          setIsSuccess(false);
          setFormData({ name: '', phone: '', email: '', address: '', landmark: '', city: '', state: '', pincode: '', notes: '' });
        }, 1600); // Wait for success animation to finish
      } else {
        setIsOrdering(false);
        alert('Failed to send request. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setIsOrdering(false);
      alert('Error connecting to the server. Make sure the Node server is running on port 5000.');
    }
  };

  useEffect(() => {
    if (typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined') {
      const gsap = window.gsap;
      const ctx = gsap.context(() => {
        gsap.utils.toArray('[data-reveal]').forEach((el) => {
          gsap.fromTo(el, 
            { y: 30, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: (el.dataset.delay || 0) * 0.1, scrollTrigger: { trigger: el, start: 'top 85%' } }
          );
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, [id]);

  if (!product) {
    return (
      <div className="inner-page-wrapper pdp-wrapper" style={{ paddingTop: '150px', textAlign: 'center', minHeight: '60vh' }}>
        <h2>Product Not Found</h2>
        <Link to="/products" className="pdp-btn-cart" style={{ display: 'inline-block', marginTop: '2rem', padding: '1rem 2rem' }}>Back to Products</Link>
      </div>
    );
  }

  // Build Product Schema (JSON-LD) for this specific product
  const defaultSkuForSchema = product.skus.find(s => s.selected) || product.skus[0];
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.fullName,
    image: [product.img],
    description: `${product.tagline} ${product.fullName} by JIRASO Organics — 100% wood-pressed, chemical-free, traditional kachi ghani method. Lab-tested and FSSAI certified.`,
    brand: {
      '@type': 'Brand',
      name: 'JIRASO Organics',
    },
    sku: product.id,
    mpn: product.id,
    category: 'Cooking Oil',
    url: `https://www.jirasoorganics.com/products/${product.id}`,
    offers: product.skus.map(sku => ({
      '@type': 'Offer',
      price: sku.price,
      priceCurrency: 'INR',
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.outOfStock
        ? 'https://schema.org/OutOfStock'
        : 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'JIRASO Organics',
      },
      url: `https://www.jirasoorganics.com/products/${product.id}`,
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '156',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <div className="inner-page-wrapper pdp-wrapper" ref={containerRef}>
      <SEOHead
        title={`${product.fullName} – Buy Online`}
        description={`Buy ${product.fullName} online. ${product.tagline} 100% wood-pressed, chemical-free, no heat, no additives. FSSAI certified. Traditional kachi ghani oil by JIRASO Organics.`}
        canonical={`https://www.jirasoorganics.com/products/${product.id}`}
        ogImage={product.img}
        ogType="product"
        schemaJson={productSchema}
      />
      <main className="container">
    <div className="pdp-layout">

      
      <div className="pdp-gallery" data-reveal="left">
        <div className="pdp-gallery__main" style={{"cursor":"zoom-in"}} 
          title="Click to view full image">
          <img onLoad={(e) => e.currentTarget.classList.remove('skeleton-loading')} className="skeleton-loading" id="main-img" src={product.img} alt={product.fullName} />
          <span
            style={{"position":"absolute","bottom":".75rem","right":".85rem","background":"rgba(0,0,0,.45)","color":"#fff","fontSize":".6rem","fontFamily":"monospace","padding":".25rem .6rem","borderRadius":"100px","pointerEvents":"none"}}>🔍
            Click to enlarge</span>
        </div>
        <div className="pdp-gallery__thumbs">
          <div className="pdp-gallery__thumb is-active" >
            <img onLoad={(e) => e.currentTarget.classList.remove('skeleton-loading')} className="skeleton-loading" src={product.img} alt={`${product.name} bottle`} />
          </div>
          <div className="pdp-gallery__thumb" >
            <img onLoad={(e) => e.currentTarget.classList.remove('skeleton-loading')} className="skeleton-loading" src="https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/process1.png?_a=BAMCr6WO0" alt="Seeds sourcing process" />
          </div>
          <div className="pdp-gallery__thumb" >
            <img onLoad={(e) => e.currentTarget.classList.remove('skeleton-loading')} className="skeleton-loading" src="https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/process5.png?_a=BAMCr6WO0" alt="Wood pressing process" />
          </div>
        </div>
        <p style={{"fontSize":"0.6rem","opacity":"0.5","marginTop":"1rem","color":"var(--mist)"}}>* Images shown are for illustrative
          purposes only. Actual product may vary in appearance.</p>
      </div>

      
      <div className="pdp-info" data-reveal="right">
        <div>
          {product.badge && <span className="pdp-badge badge--shimmer">{product.badge}</span>}
        </div>

        <div>
          <h1 className="pdp-name">{product.fullName}</h1>
          <p className="pdp-tagline" dangerouslySetInnerHTML={{ __html: product.tagline }}></p>
        </div>

        <div className="pdp-rating">
          <span className="pdp-stars">★★★★★</span>
          <a className="pdp-review-count" href="#reviews">(156 reviews)</a>
        </div>

        <div className="pdp-divider"></div>

        
        <div>
          <p className="pdp-section-label">Select Size</p>
          <div className="pdp-sizes">
            {product.skus.map((sku, index) => (
              <button 
                key={index}
                className={`pdp-size-btn ${size === sku.size ? 'is-active' : ''}`} 
                onClick={() => { setSize(sku.size); setPrice(sku.price); }}
              >
                {sku.label && <span className="pdp-size-popular">{sku.label}</span>}
                {!sku.label && sku.selected && <span className="pdp-size-popular">Popular</span>}
                <span className="pdp-size-btn__ml">{sku.size}</span>
                <span className="pdp-size-btn__price">₹{sku.price}</span>
              </button>
            ))}
          </div>
        </div>

        
        <div>
          <p className="pdp-section-label">Quantity</p>
          <div className="pdp-qty">
            <div className="pdp-qty-ctrl">
              <button className="pdp-qty-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
              <input className="pdp-qty-num" type="number" value={quantity} readOnly />
              <button className="pdp-qty-btn" onClick={() => setQuantity(q => Math.min(50, q + 1))}>+</button>
            </div>
          </div>
        </div>



        
        <div>
          <p className="pdp-price">₹{price * quantity}</p>
          <p className="pdp-price__tax">Inclusive of all taxes</p>
        </div>

        
        <div className="pdp-ctas">
          <button className="pdp-btn-whatsapp" onClick={() => setShowModal(true)}>
            {isOrdering ? 'Sending Order...' : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Order Now
              </>
            )}
          </button>
          <button 
            className="pdp-btn-cart" 
            onClick={() => {
              addItem({
                id: product.id,
                name: product.fullName,
                price: price,
                img: product.img,
                size: size,
                qty: quantity
              });
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Add to Cart
          </button>
        </div>

        
        <div className="pdp-trust">
          <div className="pdp-trust-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path
                d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
            <span>Secure Packaging</span>
          </div>
          <div className="pdp-trust-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
            <span>Free Delivery</span>
          </div>
          <div className="pdp-trust-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>Quality Assured</span>
          </div>
        </div>

        
        <div style={{"marginTop":"1.25rem"}}>
          <img onLoad={(e) => e.currentTarget.classList.remove('skeleton-loading')} className="skeleton-loading" src="https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/certification02.png?_a=BAMCr6WO0" alt="Certifications" loading="lazy"
            style={{"width":"100%","height":"auto","display":"block","borderRadius":"12px"}} />
        </div>
      </div>
    </div>




    
    <div className="pdp-details-grid" data-reveal>
      <div className="pdp-card">
        <h2 className="pdp-card__title">Key Benefits</h2>
        <ul className="pdp-benefits">
          <li className="pdp-benefit">100% Pure Wood Pressed Mustard Oil</li>
          <li className="pdp-benefit">No Chemical Processing</li>
          <li className="pdp-benefit">Rich in Omega-3 &amp; Omega-6</li>
          <li className="pdp-benefit">Lab Tested for Purity</li>
          <li className="pdp-benefit">FSSAI Certified</li>
          <li className="pdp-benefit">Cold Pressed Below 50°C</li>
          <li className="pdp-benefit">No Preservatives or Additives</li>
          <li className="pdp-benefit">Traditional Kachi Ghani Method</li>
        </ul>
      </div>
      <div className="pdp-card">
        <h2 className="pdp-card__title">Nutritional Information</h2>
        <div className="pdp-nutrition">
          <p className="pdp-nutrition__serving">Per 100g serving</p>
          <div className="pdp-nutrition-row"><span className="pdp-nutrition-row__label">Energy</span><span
            className="pdp-nutrition-row__val">899.01 kcal</span></div>
          <div className="pdp-nutrition-row"><span className="pdp-nutrition-row__label">Total Fat</span><span
            className="pdp-nutrition-row__val">99.89g</span></div>
          <div className="pdp-nutrition-row pdp-nutrition-row--indent"><span className="pdp-nutrition-row__label">Saturated
            Fat</span><span className="pdp-nutrition-row__val">10.43g</span></div>
          <div className="pdp-nutrition-row pdp-nutrition-row--indent"><span
            className="pdp-nutrition-row__label">Monounsaturated Fat</span><span className="pdp-nutrition-row__val">63.32g</span>
          </div>
          <div className="pdp-nutrition-row pdp-nutrition-row--indent"><span
            className="pdp-nutrition-row__label">Polyunsaturated Fat</span><span className="pdp-nutrition-row__val">24.54g</span>
          </div>
          <div className="pdp-nutrition-row"><span className="pdp-nutrition-row__label">Trans Fat</span><span
            className="pdp-nutrition-row__val">0.0g</span></div>
          <div className="pdp-nutrition-row"><span className="pdp-nutrition-row__label">Cholesterol</span><span
            className="pdp-nutrition-row__val">0.0mg</span></div>
          <div className="pdp-nutrition-row"><span className="pdp-nutrition-row__label">Omega-3 Fatty Acids</span><span
            className="pdp-nutrition-row__val">6.11g</span></div>
          <div className="pdp-nutrition-row"><span className="pdp-nutrition-row__label">Omega-6 Fatty Acids</span><span
            className="pdp-nutrition-row__val">9.32g</span></div>
          <div className="pdp-nutrition-row"><span className="pdp-nutrition-row__label">Vitamin E</span><span
            className="pdp-nutrition-row__val">17.98mg</span></div>
        </div>
      </div>
    </div>

    
    <section className="pdp-reviews-section" id="reviews" data-reveal>
      <h2 className="pdp-reviews-title">Customer Reviews</h2>
      <div className="pdp-reviews-grid">
        <div className="pdp-review-card">
          <div className="pdp-review-card__top"><span className="pdp-review-card__stars">★★★★★</span><span
              className="pdp-review-card__date">April 2026</span></div>
          <p className="pdp-review-card__name">Meera Singh</p>
          <p className="pdp-review-card__text">"Kachchi ghani sarson ke tel ki baat hi alag hai! Achar aur sabzi mein jo
            jhaas aati hai, bilkul dadi ke haath ke khane jaisi. Ekdum pure!"</p>
        </div>
        <div className="pdp-review-card">
          <div className="pdp-review-card__top"><span className="pdp-review-card__stars">★★★★★</span><span
              className="pdp-review-card__date">March 2026</span></div>
          <p className="pdp-review-card__name">Amit Gupta</p>
          <p className="pdp-review-card__text">"Bhai, best mustard oil hai market mein. Fish curry banayi thi isme, swaad
            dugna ho gaya. Price thoda zyada hai but worth every rupee."</p>
        </div>
        <div className="pdp-review-card">
          <div className="pdp-review-card__top"><span className="pdp-review-card__stars">★★★★★</span><span
              className="pdp-review-card__date">March 2026</span></div>
          <p className="pdp-review-card__name">Kavita Reddy</p>
          <p className="pdp-review-card__text">"Maine monthly delivery subscribe kar li hai. Refined tel chhodne ke baad
            health mein bahut farak pada hai. Highly recommended!"</p>
        </div>
        <div className="pdp-review-card">
          <div className="pdp-review-card__top"><span className="pdp-review-card__stars">★★★★☆</span><span
              className="pdp-review-card__date">February 2026</span></div>
          <p className="pdp-review-card__name">Suresh Kumar</p>
          <p className="pdp-review-card__text">"Purity aur taste dono number one. Bas packaging thodi aur premium ho sakti
            thi. Lekin oil quality mein koi compromise nahi."</p>
        </div>
      </div>
    </section>

    
    <div className="pdp-related" data-reveal>
      <p className="pdp-related__title">You May Also Like</p>
      <div className="pdp-related__grid">
        {productsData.filter(p => p.id !== product.id).slice(0, 3).map(related => (
          <Link key={related.id} to={related.link} className="pdp-related__card">
            <img onLoad={(e) => e.currentTarget.classList.remove('skeleton-loading')} src={related.img} alt={related.name} className="skeleton-loading pdp-related__card-img" loading="lazy" />
            <p className="pdp-related__card-name">{related.name}</p>
          </Link>
        ))}
      </div>
    </div>
  </main>

      {/* Checkout Modal */}
      {showModal && (
        <div className="cart-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="cart-modal" onClick={e => e.stopPropagation()}>
            <div className="cart-modal__header">
              <h2>Complete Your Order</h2>
              <button className="cart-modal__close" onClick={() => setShowModal(false)}>×</button>
            </div>
            
            <form onSubmit={handleFinalSubmit} className="cart-modal__form">
              <div className="form-group">
                <label>Full Name *</label>
                <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="e.g. Rahul Sharma" />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="10-digit number" />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="your@email.com" />
                </div>
              </div>
              
              <div className="form-group">
                <label>Street Address *</label>
                <input type="text" name="address" required value={formData.address} onChange={handleInputChange} placeholder="House/Flat No., Street Name" />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Landmark</label>
                  <input type="text" name="landmark" value={formData.landmark} onChange={handleInputChange} placeholder="Near..." />
                </div>
                <div className="form-group">
                  <label>City *</label>
                  <input type="text" name="city" required value={formData.city} onChange={handleInputChange} placeholder="City" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>State *</label>
                  <input type="text" name="state" required value={formData.state} onChange={handleInputChange} placeholder="State" />
                </div>
                <div className="form-group">
                  <label>Pincode *</label>
                  <input type="text" name="pincode" required value={formData.pincode} onChange={handleInputChange} placeholder="6 digits" />
                </div>
              </div>
              
              <div className="form-group">
                <label>Order Notes (Optional)</label>
                <textarea name="notes" rows="2" value={formData.notes} onChange={handleInputChange} placeholder="Any specific requirements..."></textarea>
              </div>

              <LuxuryButton 
                isOrdering={isOrdering} 
                isSuccess={isSuccess} 
                defaultText="Confirm Order" 
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}