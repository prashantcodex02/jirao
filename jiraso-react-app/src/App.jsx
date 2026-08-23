import React, { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Preloader from './components/Preloader/Preloader'
import { CartProvider } from './context/CartContext'

import Home from './pages/Home/Home'
import Products from './pages/Products/Products'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import Cart from './pages/Cart/Cart'
import Contact from './pages/Contact/Contact'
import Process from './pages/Process/Process'
import KnowYourOil from './pages/KnowYourOil/KnowYourOil'
import Partner from './pages/Partner/Partner'
import Reports from './pages/Reports/Reports'

// A wrapper to handle body classes, scroll to top, and intersection observers based on route
function RouteWrapper() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    if (isHome) {
      document.body.classList.remove('inner-page');
    } else {
      document.body.classList.add('inner-page');
    }
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname, isHome]);

  useEffect(() => {
    // We need a short timeout to ensure React has rendered the DOM nodes for this route
    const timer = setTimeout(() => {
      /* -- SCROLL REVEAL (global rv) -------------------- */
      const rvEls = document.querySelectorAll('.rv');
      if (rvEls.length > 0) {
        const rvObs = new IntersectionObserver(entries => {
          entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); rvObs.unobserve(e.target); } });
        }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
        rvEls.forEach(el => rvObs.observe(el));
      }

      /* -- SCROLL REVEAL (data-reveal for inner pages) -- */
      const dataRevealEls = document.querySelectorAll('[data-reveal]');
      if (dataRevealEls.length > 0) {
        const drObs = new IntersectionObserver(entries => {
          entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); drObs.unobserve(e.target); } });
        }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
        dataRevealEls.forEach(el => drObs.observe(el));
      }

      /* -- EDITORIAL HEAD ------------------------------- */
      const edHead = document.getElementById('ed-heading');
      if (edHead) {
        // Split text logic if needed
        let html = edHead.innerHTML;
        // Basic split text if not already split
        if (!html.includes('class="word"')) {
          edHead.innerHTML = html.split(' ').map(w => `<span class="word">${w}</span>`).join(' ');
        }
        const words = edHead.querySelectorAll('.word');
        const wordObs = new IntersectionObserver(entries => {
          if (!entries[0].isIntersecting) return;
          words.forEach((w, i) => setTimeout(() => w.classList.add('show'), i * 60));
          wordObs.disconnect();
        }, { threshold: 0.2 });
        wordObs.observe(edHead);
      }

      /* -- SPOTLIGHT reveal ----------------------------- */
      const spotImg = document.getElementById('spot-img');
      if (spotImg) {
        const spotObs = new IntersectionObserver(e => {
          if (e[0].isIntersecting) { spotImg.classList.add('reveal'); spotObs.disconnect(); }
        }, { threshold: 0.1 });
        spotObs.observe(spotImg);
      }

      /* -- STATS ring + count-up ------------------------ */
      const statItems = document.querySelectorAll('.stat-item');
      if (statItems.length > 0) {
        const statObs = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const item = entry.target;
            item.classList.add('animated');
            const numEl = item.querySelector('.stat-num');
            if (!numEl) return;
            if (!('count' in numEl.dataset)) { statObs.unobserve(item); return; }
            const target = parseInt(numEl.dataset.count);
            const suffix = numEl.dataset.suffix ?? '';
            if (isNaN(target)) { statObs.unobserve(item); return; }
            let start = null;
            const dur = 1800;
            function step(ts) {
              if (!start) start = ts;
              const p = Math.min((ts - start) / dur, 1);
              const ease = 1 - Math.pow(1 - p, 3);
              numEl.textContent = Math.round(ease * target) + suffix;
              if (p < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
            statObs.unobserve(item);
          });
        }, { threshold: 0.4 });
        statItems.forEach(el => statObs.observe(el));
      }

      /* -- COMPARISON bars animate ---------------------- */
      const compGrid = document.getElementById('comp-grid');
      if (compGrid) {
        const compObs = new IntersectionObserver(e => {
          if (!e[0].isIntersecting) return;
          document.querySelectorAll('.bar-fill').forEach(bar => {
            bar.style.width = (bar.dataset.w || 50) + '%';
          });
          compObs.disconnect();
        }, { threshold: 0.3 });
        compObs.observe(compGrid);
      }

      /* -- TESTIMONIAL reveal --------------------------- */
      const testiQ = document.getElementById('testi-quote');
      if (testiQ) {
        const tObs = new IntersectionObserver(e => {
          if (e[0].isIntersecting) { testiQ.classList.add('show'); tObs.disconnect(); }
        }, { threshold: 0.4 });
        tObs.observe(testiQ);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <main style={{ overflowX: 'hidden' }}>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/process" element={<Process />} />
          <Route path="/know-your-oil" element={<KnowYourOil />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
    </main>
  );
}

function App() {
  React.useEffect(() => {
    if (typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined') {
      window.gsap.registerPlugin(window.ScrollTrigger);
    }
  }, []);

  return (
    <CartProvider>
      <Router>
        <Preloader />
        <Header />
        <RouteWrapper />
        <Footer />
      </Router>
    </CartProvider>
  )
}

export default App
