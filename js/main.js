/* =============================================
   BUGATTI CHIRON — JAVASCRIPT
   Bootstrap Studio 4 Compatible
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ── NAVBAR SCROLL ── */
  const mainNav = document.getElementById('mainNav');
  function handleNavScroll() {
    if (window.scrollY > 60) {
      mainNav.classList.add('scrolled');
    } else {
      mainNav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  /* ── SMOOTH SCROLL FOR NAV LINKS ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile menu if open
        const navCollapse = document.getElementById('navbarCollapse');
        if (navCollapse && navCollapse.classList.contains('show')) {
          navCollapse.classList.remove('show');
        }
      }
    });
  });

  /* ── SCROLL REVEAL ── */
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ── ANIMATED SPEC BARS ── */
  const barObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const bars = entry.target.querySelectorAll('.spec-bar[data-width]');
        bars.forEach(function (bar) {
          setTimeout(function () {
            bar.style.width = bar.getAttribute('data-width') + '%';
          }, 200);
        });
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const specsSection = document.getElementById('specs');
  if (specsSection) barObserver.observe(specsSection);

  /* ── COUNTER ANIMATION ── */
  function animateCounter(el, target, duration, suffix) {
    const start = 0;
    const step = (target / (duration / 16));
    let current = start;
    const interval = setInterval(function () {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      el.textContent = Math.floor(current).toLocaleString() + (suffix || '');
    }, 16);
  }

  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('[data-count]').forEach(function (el) {
          const target = parseFloat(el.getAttribute('data-count'));
          const suffix = el.getAttribute('data-suffix') || '';
          animateCounter(el, target, 1800, suffix);
        });
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('[data-count-section]').forEach(function (el) {
    counterObserver.observe(el);
  });

  /* ── PARALLAX ON HERO ── */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', function () {
      const scrolled = window.scrollY;
      heroBg.style.transform = 'scale(1.05) translateY(' + (scrolled * 0.3) + 'px)';
    }, { passive: true });
  }

  /* ── MOBILE NAV TOGGLE ── */
  const toggler = document.getElementById('navToggler');
  const navCollapse = document.getElementById('navbarCollapse');
  if (toggler && navCollapse) {
    toggler.addEventListener('click', function () {
      navCollapse.classList.toggle('show');
    });
  }

  /* ── GALLERY LIGHTBOX (simple) ── */
  document.querySelectorAll('.g-item').forEach(function (item) {
    item.addEventListener('click', function () {
      const img = item.querySelector('img');
      if (!img) return;
      const overlay = document.createElement('div');
      overlay.id = 'lightbox-overlay';
      overlay.style.cssText = [
        'position:fixed', 'inset:0', 'z-index:9999',
        'background:rgba(0,0,0,0.92)', 'display:flex',
        'align-items:center', 'justify-content:center',
        'cursor:pointer', 'animation:fadeIn 0.3s ease'
      ].join(';');
      const lightImg = document.createElement('img');
      lightImg.src = img.src;
      lightImg.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:4px;box-shadow:0 0 80px rgba(0,71,171,0.4)';
      overlay.appendChild(lightImg);
      overlay.addEventListener('click', function () { overlay.remove(); });
      document.body.appendChild(overlay);
    });
  });

  /* ── FORM SUBMIT ── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = contactForm.querySelector('[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = '✓ Request Sent';
        btn.style.background = 'linear-gradient(135deg, #1a6b3a, #27ae60)';
        setTimeout(function () {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
          contactForm.reset();
        }, 3000);
      }, 1500);
    });
  }

  /* ── CURSOR GLOW EFFECT ── */
  const cursorGlow = document.createElement('div');
  cursorGlow.style.cssText = [
    'position:fixed', 'pointer-events:none', 'z-index:9998',
    'width:300px', 'height:300px', 'border-radius:50%',
    'background:radial-gradient(circle, rgba(74,157,255,0.06) 0%, transparent 70%)',
    'transform:translate(-50%,-50%)', 'transition:opacity 0.3s ease',
    'top:0', 'left:0'
  ].join(';');
  document.body.appendChild(cursorGlow);
  document.addEventListener('mousemove', function (e) {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });

});
