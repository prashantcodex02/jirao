import React, { useRef, useState } from 'react';
import './Cart.css';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import LuxuryButton from '../../components/LuxuryButton';

export default function Cart() {
  const containerRef = useRef(null);
  const { cart, totalQty, updateQty, removeItem } = useCart();
  
  // Checkout Modal State
  const [showModal, setShowModal] = useState(false);
  const [orderType, setOrderType] = useState('standard'); // 'standard' or 'bulk'
  const [isOrdering, setIsOrdering] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
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

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const openCheckoutModal = (type) => {
    if (cart.length === 0) return;
    setOrderType(type);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    setIsOrdering(true);
    try {
      const response = await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          details: `Type: ${orderType === 'bulk' ? 'Bulk Pricing Request' : 'Standard Order'}\nAddress: ${formData.address}\nLandmark: ${formData.landmark}\nCity: ${formData.city}\nState: ${formData.state}\nPincode: ${formData.pincode}\nNotes: ${formData.notes}`,
          items: cart.map(item => ({
            product: item.name,
            size: item.size,
            quantity: item.qty,
            price: item.price,
            total: item.price * item.qty
          }))
        }),
      });
      
      if (response.ok) {
        setIsOrdering(false);
        setIsSuccess(true);
        setTimeout(() => {
          alert(orderType === 'bulk' ? 'Bulk pricing request sent successfully! We will contact you soon.' : 'Order placed successfully! Check your email inbox.');
          // Clear cart after successful order
          cart.forEach(item => removeItem(item.name, item.size));
          setShowModal(false);
          setIsSuccess(false);
          setFormData({ name: '', phone: '', email: '', address: '', landmark: '', city: '', state: '', pincode: '', notes: '' });
        }, 1600); // Wait for success animation
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

  return (
    <div className="inner-page-wrapper" ref={containerRef}>
      {/* Hero Section */}
      <div className="ip-hero">
        <div className="ip-hero__orb ip-hero__orb--1"></div>
        <div className="ip-hero__orb ip-hero__orb--2"></div>
        <div className="ip-hero__noise"></div>
        <div className="container" style={{ position: "relative", zIndex: "1" }}>
          <h1 className="ip-hero__heading">Your Cart</h1>
          <p className="ip-hero__sub">Review your selection of wood-pressed oils before ordering.</p>
        </div>
      </div>

      <main>
        <div className="cart-wrap">
          <div>
            {/* Cart Header */}
            <div className="cart-sh">
              <span className="cart-sh__title">Selected Items</span>
              <div style={{ display: "flex", alignItems: "center", gap: ".9rem" }}>
                <span className="cart-sh__count">{totalQty} items</span>
                {cart.length > 0 && (
                   <button className="cart-clear" onClick={() => {
                     cart.forEach(item => removeItem(item.name, item.size));
                   }}>Clear All</button>
                )}
              </div>
            </div>

            {/* Cart Items or Empty State */}
            {cart.length === 0 ? (
              <div className="cm-empty">
                <div className="cm-empty__icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                </div>
                <h2 className="cm-empty__title">Your cart is empty</h2>
                <p className="cm-empty__sub">Explore our premium wood-pressed oils and add your favourites.</p>
                <Link to="/products" className="cm-browse">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  Browse Products
                </Link>
              </div>
            ) : (
              <>
                <ul id="cart-page-items" role="list">
                  {cart.map((item, index) => (
                    <li key={index} className="cmi">
                      <div className="cmi-thumb">
                        <img src={item.img || 'https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/mustard.png?_a=BAMCr6WO0'} alt={item.name} />
                      </div>
                      <div className="cmi-body">
                        <h3 className="cmi-name">{item.name}</h3>
                        <span className="cmi-size">{item.size} • ₹{item.price}</span>
                        <div className="cmi-actions">
                          <div className="cmi-qty">
                            <button type="button" className="cmi-qbtn" onClick={() => updateQty(item.name, item.size, item.qty - 1)}>−</button>
                            <span className="cmi-qnum">{item.qty}</span>
                            <button type="button" className="cmi-qbtn" onClick={() => updateQty(item.name, item.size, item.qty + 1)}>+</button>
                          </div>
                          <button type="button" className="cmi-rm" onClick={() => removeItem(item.name, item.size)}>Remove</button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                
                <Link to="/products" className="cart-continue" style={{ display: "inline-flex", marginTop: "1.5rem" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                  Continue Shopping
                </Link>
              </>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <aside className={`cm-sum ${cart.length > 0 ? 'show' : ''}`} style={{ display: cart.length > 0 ? 'flex' : 'none' }}>
            <p className="cm-sum__title">Order Summary</p>
            <div className="cm-sum__row"><span>Items</span><span>{totalQty}</span></div>
            <div className="cm-sum__row"><span>Subtotal</span><span>₹{subtotal}</span></div>
            <div className="cm-sum__row" style={{ borderBottom: "none" }}><span>Delivery</span><span>Free above ₹999</span></div>
            <div className="cm-sum__divider"></div>
            <div className="cm-sum__total">
              <span className="cm-sum__tlabel">Total</span>
              <span className="cm-sum__tval">₹{subtotal}</span>
            </div>
            <div className="cm-sum__divider"></div>
            
            <button type="button" onClick={() => openCheckoutModal('standard')} className="cm-wa-big" style={{ cursor: 'pointer', border: 'none', width: '100%' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              Order Now
            </button>
            
            <button type="button" onClick={() => openCheckoutModal('bulk')} className="cm-bulk" style={{ cursor: 'pointer', border: 'none', width: '100%' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Request Bulk Pricing
            </button>
            
            <div className="cm-trust">
              <div className="cm-tbadge"><svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>100% Natural</div>
              <div className="cm-tbadge"><svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>Wood Pressed</div>
              <div className="cm-tbadge"><svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>Farm Direct</div>
            </div>
            <p className="cm-note">Prices exclusive of GST. Final pricing confirmed via Email.</p>
          </aside>
        </div>
      </main>

      {/* Checkout Modal */}
      {showModal && (
        <div className="cart-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="cart-modal" onClick={e => e.stopPropagation()}>
            <div className="cart-modal__header">
              <h2>{orderType === 'bulk' ? 'Request Bulk Pricing' : 'Complete Your Order'}</h2>
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
                defaultText={`Confirm ${orderType === 'bulk' ? 'Request' : 'Order'}`}
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
