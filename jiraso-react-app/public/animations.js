window.initJirasoAnimations = function() {

    /* -- HEADER scroll ---------------------------- */
    const hdr = document.getElementById('hdr');
    const heroEl = document.getElementById('hero');
    const io = new IntersectionObserver(e => {
      hdr.classList.toggle('solid', !e[0].isIntersecting);
    }, { threshold: 0.08 });
    io.observe(heroEl);

    /* -- MOBILE DRAWER ---------------------------- */
    const hbg = document.getElementById('hbg');
    const drawer = document.getElementById('mob-drawer');
    const mc = document.getElementById('mob-close');
    const openD = () => { drawer.classList.add('open'); hbg.classList.add('open'); document.body.style.overflow = 'hidden'; };
    const closeD = () => { drawer.classList.remove('open'); hbg.classList.remove('open'); document.body.style.overflow = ''; };
    hbg.addEventListener('click', () => drawer.classList.contains('open') ? closeD() : openD());
    mc.addEventListener('click', closeD);
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeD));

    /* -- OIL DROPS (Hero) -------------------------- */
    const dropsContainer = document.getElementById('hero-drops');
    const dropConfigs = [
      { left: '8%', size: 14, dur: 14, delay: 0 }, { left: '22%', size: 20, dur: 18, delay: 3 },
      { left: '38%', size: 10, dur: 12, delay: 1 }, { left: '55%', size: 18, dur: 20, delay: 5 },
      { left: '70%', size: 12, dur: 15, delay: 2 }, { left: '85%', size: 22, dur: 22, delay: 7 },
      { left: '15%', size: 16, dur: 16, delay: 9 }, { left: '60%', size: 8, dur: 11, delay: 4 },
    ];
    dropConfigs.forEach(c => {
      const d = document.createElement('div');
      d.className = 'drop';
      d.style.cssText = `left:${c.left};width:${c.size}px;height:${c.size * 1.3}px;animation-duration:${c.dur}s;animation-delay:${c.delay}s`;
      dropsContainer.appendChild(d);
    });

    /* -- WORD-BY-WORD reveal (editorial heading) -- */
    function splitWords(el) {
      const text = el.innerHTML;
      const parts = text.split(/(<em>.*?<\/em>|[^\s]+)/g).filter(Boolean);
      el.innerHTML = '';
      parts.forEach(part => {
        if (!part.trim()) { el.appendChild(document.createTextNode(' ')); return; }
        if (part.startsWith('<em>')) {
          const w = document.createElement('em');
          w.innerHTML = part.replace(/<\/?em>/g, '');
          w.classList.add('word');
          el.appendChild(w);
        } else {
          const w = document.createElement('span');
          w.classList.add('word');
          w.textContent = part;
          el.appendChild(w);
        }
        el.appendChild(document.createTextNode(' '));
      });
    }
    const edHead = document.getElementById('ed-heading');
    splitWords(edHead);
    const words = edHead.querySelectorAll('.word');
    const wordObs = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      words.forEach((w, i) => setTimeout(() => w.classList.add('show'), i * 60));
      wordObs.disconnect();
    }, { threshold: 0.2 });
    wordObs.observe(edHead);

    /* -- SCROLL REVEAL (global) -------------------- */
    const rvEls = document.querySelectorAll('.rv');
    const rvObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); rvObs.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    rvEls.forEach(el => rvObs.observe(el));

    /* -- SPOTLIGHT reveal --------------- */
    const spotImg = document.getElementById('spot-img');
    const spotObs = new IntersectionObserver(e => {
      if (e[0].isIntersecting) { spotImg.classList.add('reveal'); spotObs.disconnect(); }
    }, { threshold: 0.1 });
    spotObs.observe(spotImg);

    /* -- STATS ring + count-up --------------------- */
    const statItems = document.querySelectorAll('.stat-item');
    const statObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const item = entry.target;
        item.classList.add('animated');
        const numEl = item.querySelector('.stat-num');
        if (!numEl) return;
        // Skip count-up if no data-count attribute (e.g. infinity symbol)
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

    /* -- COMPARISON bars animate ------------------- */
    const compGrid = document.getElementById('comp-grid');
    const compObs = new IntersectionObserver(e => {
      if (!e[0].isIntersecting) return;
      document.querySelectorAll('.bar-fill').forEach(bar => {
        bar.style.width = (bar.dataset.w || 50) + '%';
      });
      compObs.disconnect();
    }, { threshold: 0.3 });
    compObs.observe(compGrid);

    /* -- TESTIMONIAL reveal ------------------------ */
    const testiQ = document.getElementById('testi-quote');
    const tObs = new IntersectionObserver(e => {
      if (e[0].isIntersecting) { testiQ.classList.add('show'); tObs.disconnect(); }
    }, { threshold: 0.4 });
    tObs.observe(testiQ);

    /* -- CART -------------------------------------- */
    function updateCart() {
      const c = JSON.parse(localStorage.getItem('jiraso_cart') || '[]');
      const n = c.reduce((s, i) => s + (i.qty || 1), 0);
      const el = document.getElementById('cart-count');
      if (el) el.textContent = n > 0 ? n : '0';
    }
    updateCart();
    document.querySelectorAll('.pc__overlay-cart').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        const p = btn.dataset.product;
        let c = JSON.parse(localStorage.getItem('jiraso_cart') || '[]');
        const ex = c.find(i => i.name === p);
        ex ? ex.qty++ : c.push({ name: p, qty: 1 });
        localStorage.setItem('jiraso_cart', JSON.stringify(c));
        updateCart();

        btn.textContent = 'Added to Cart';
        btn.classList.add('is-added');
        setTimeout(() => {
          btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> Add to Cart';
          btn.classList.remove('is-added');
        }, 2000);

        // Trigger the fly animation
        const imgEl = btn.closest('.pc').querySelector('.pc__img');
        const imgSrc = imgEl ? imgEl.getAttribute('src') : 'assets/sesame.png';
        if (typeof window.animateFlyToCart === 'function') {
          window.animateFlyToCart(btn, imgSrc);
        }
      });
    });

    /* -- FAQ: smooth accordion with measured height -- */
    document.querySelectorAll('.faq').forEach(det => {
      const sum = det.querySelector('summary');
      const body = det.querySelector('.faq__body');
      sum.addEventListener('click', e => {
        e.preventDefault();
        const isOpen = det.hasAttribute('open');
        // Close all others smoothly
        document.querySelectorAll('.faq[open]').forEach(d => {
          if (d === det) return;
          const b = d.querySelector('.faq__body');
          b.style.maxHeight = b.scrollHeight + 'px';
          requestAnimationFrame(() => { b.style.maxHeight = '0'; });
          setTimeout(() => d.removeAttribute('open'), 480);
        });
        if (isOpen) {
          body.style.maxHeight = body.scrollHeight + 'px';
          requestAnimationFrame(() => { body.style.maxHeight = '0'; });
          setTimeout(() => det.removeAttribute('open'), 480);
        } else {
          det.setAttribute('open', '');
          body.style.maxHeight = '0';
          requestAnimationFrame(() => { body.style.maxHeight = body.scrollHeight + 'px'; });
          setTimeout(() => { body.style.maxHeight = 'none'; }, 520);
        }
      });
    });

    /* -- ACTIVE NAV highlight on scroll ------------ */
    const sections = document.querySelectorAll('section[id], footer');
    const navLinks = document.querySelectorAll('.nav-links a');
    const activeObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach(a => {
          a.style.color = '';
          if (a.getAttribute('href') === '#' + id || (id === 'hero' && a.getAttribute('href') === 'index.html')) {
            a.style.color = 'var(--gold-l)';
          }
        });
      });
    }, { threshold: 0.35 });
    sections.forEach(s => activeObs.observe(s));

    /* -- GSAP enhanced animations ------------------ */
    window.addEventListener('load', () => {
      if (typeof gsap === 'undefined') return;
      gsap.registerPlugin(ScrollTrigger);

      /* Ticker parallax counter-scroll */
      gsap.to('#ticker', {
        x: '+=80',
        ease: 'none',
        scrollTrigger: {
          trigger: '.ticker-wrap',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      /* Hero parallax */
      gsap.to('.hero__bg', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      });

      /* Editorial heading dramatic scale */
      gsap.fromTo('.editorial__ghost', { scale: 1 }, {
        scale: 1.06,
        ease: 'none',
        scrollTrigger: { trigger: '.editorial', start: 'top bottom', end: 'bottom top', scrub: 1 }
      });

      /* Prod-cards stagger */
      gsap.from('.pc', {
        y: 60, opacity: 0, stagger: 0.14, duration: .9, ease: 'power3.out',
        scrollTrigger: { trigger: '.prod-grid', start: 'top 78%', toggleActions: 'play none none none' }
      });

      /* Stats bounce */
      gsap.utils.toArray('.stat-item').forEach((el, i) => {
        gsap.from(el, {
          y: 40, opacity: 0, duration: .8, delay: i * .1, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none none' }
        });
      });

      /* Strip scroll speed tie */
      ScrollTrigger.create({
        trigger: '.strip-section',
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: self => {
          const vel = self.getVelocity();
          if (Math.abs(vel) > 10) {
            document.getElementById('strip').style.animationPlayState = 'running';
          }
        }
      });

      /* Spotlight parallax */
      gsap.to('#spot-img img', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: '#spot-img', start: 'top bottom', end: 'bottom top', scrub: 1 }
      });
    });

    /* -- GSAP SplitText hero heading -------------- */
    window.addEventListener('load', () => {
      // Already handled by CSS clip animation, skip if SplitText unavailable
    });

    /* -- SCROLL PROGRESS BAR ----------------------- */
    const progBar = document.getElementById('progress-bar');
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      progBar.style.width = Math.min((scrolled / total) * 100, 100) + '%';
    }, { passive: true });

    /* -- LENIS SMOOTH SCROLL ----------------------- */
    if (typeof Lenis !== 'undefined') {
      const lenis = new Lenis({
        duration: 1.3,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        mouseMultiplier: 1.2,
      });
      function lenisRaf(time) {
        lenis.raf(time);
        requestAnimationFrame(lenisRaf);
      }
      requestAnimationFrame(lenisRaf);

      // Sync GSAP ScrollTrigger with Lenis
      if (typeof ScrollTrigger !== 'undefined') {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(time => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
      }
    }

    /* -- SECTION ENTRANCE: split number counter glow -- */
    document.querySelectorAll('.trust-item__number, .stat-num').forEach(el => {
      el.addEventListener('transitionend', () => {
        el.style.textShadow = '0 0 24px rgba(196,146,58,0.4)';
        setTimeout(() => { el.style.textShadow = ''; }, 800);
      });
    })

    // Dismiss preloader after ~1.8s
    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        document.getElementById('preloader').classList.add('done');
      }, 1800);
    })  

    function openFsModal(el) {
      const img = el.querySelector('img');
      if (!img) return;
      const modal = document.getElementById('fsModal');
      const modalImg = document.getElementById('fsModalImg');
      modalImg.src = img.src;
      modal.classList.add('active');
    }

    function closeFsModal() {
      const modal = document.getElementById('fsModal');
      modal.classList.remove('active');
    }
  
};
