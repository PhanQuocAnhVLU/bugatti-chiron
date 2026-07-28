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

  /* ── MODEL & COLOUR CONFIGURATOR ── */
  (function () {
    const tabsEl = document.getElementById('modelTabs');
    const swatchesEl = document.getElementById('colorSwatches');
    const showcaseImg = document.getElementById('modelShowcaseImg');
    const colorTag = document.getElementById('modelColorTag');
    const viewToggle = document.getElementById('viewToggle');
    const taglineEl = document.getElementById('modelTagline');
    const nameEl = document.getElementById('modelName');
    const descEl = document.getElementById('modelDesc');
    const priceEl = document.getElementById('modelPrice');
    const statHp = document.getElementById('statHp');
    const statSpeed = document.getElementById('statSpeed');
    const statAccel = document.getElementById('statAccel');

    if (!tabsEl || !swatchesEl || !showcaseImg) return;

    /* Camera views — rendered live as vector artwork (see js/car-svg.js),
       so the selected paint colour is an exact fill, never a photo-tint
       approximation. */
    const VIEWS = ['side', 'front', 'rear'];

    /* Colour library — exact paint swatches */
    const COLORS = {
      blue:       { name: 'French Racing Blue', hex: '#0047AB' },
      black:      { name: 'Nocturne Black',      hex: '#0c0d10' },
      white:      { name: 'Glacier White',       hex: '#eef1f5' },
      silver:     { name: 'Argent Silver',       hex: '#b0bec5' },
      red:        { name: 'Italian Red',         hex: '#a3161b' },
      gold:       { name: 'Bronze Gold',         hex: '#a9772f' },
      green:      { name: 'Racing Green',        hex: '#1f4d3a' },
      anthracite: { name: 'Anthracite',          hex: '#3a3d42' }
    };

    /* Model range — a single Chiron, differentiated purely by colour */
    const MODELS = [
      {
        id: 'chiron', name: 'Chiron', tagline: 'The Original Icon',
        desc: 'The car that redefined the hypercar category — pure, uncompromising, timeless.',
        hp: 1500, speed: 420, accel: 2.4, price: '€ 2,998,000',
        colors: ['blue', 'black', 'white', 'silver'], defaultColor: 'blue'
      }
    ];

    let currentModel = MODELS[0];
    let currentColor = COLORS[currentModel.defaultColor];
    let currentView = 'side';

    function animateStat(el, target, decimals) {
      if (!el) return;
      const start = parseFloat(el.textContent) || 0;
      const duration = 700;
      const startTime = performance.now();
      function step(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = start + (target - start) * progress;
        el.textContent = decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString();
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = decimals ? target.toFixed(decimals) : target.toLocaleString();
      }
      requestAnimationFrame(step);
    }

    function renderTabs() {
      tabsEl.innerHTML = MODELS.map(function (m) {
        return '<button type="button" class="model-tab' + (m.id === currentModel.id ? ' active' : '') +
          '" data-model-id="' + m.id + '" role="tab" aria-selected="' + (m.id === currentModel.id) + '">' +
          m.name + '</button>';
      }).join('');
    }

    /* Tailwind classes cho mỗi nút màu. Màu nền thực tế của mỗi nút
       KHÔNG nằm trong class Tailwind (Tailwind không biết trước mã màu
       của từng dòng sơn) — JS đọc từ COLORS[key].hex rồi set trực tiếp
       vào style.backgroundColor của từng <button>. */
    function swatchTwClass(active) {
      return [
        'swatch-tw', 'w-9', 'h-9', 'rounded-full', 'border-2', 'cursor-pointer',
        'relative', 'transition-all', 'duration-300', 'ease-out',
        'shadow-[inset_0_0_0_2px_rgba(0,0,0,0.25)]',
        'hover:-translate-y-1', 'hover:scale-110',
        active
          ? 'border-white ring-4 ring-[#4a9dff]/50 scale-105'
          : 'border-white/20'
      ].join(' ');
    }

    const CHECK_ICON = '<svg class="pointer-events-none absolute inset-0 m-auto w-3.5 h-3.5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M13.49 1.93a1 1 0 0 1 0 1.42l-7.07 7.07a1 1 0 0 1-1.42 0L1.5 6.93a1 1 0 1 1 1.42-1.42L5.7 8.29l6.36-6.36a1 1 0 0 1 1.42 0z"/></svg>';

    function renderSwatches() {
      swatchesEl.innerHTML = currentModel.colors.map(function (key) {
        const c = COLORS[key];
        const active = currentColorKeyActive(key);
        return '<button type="button" class="' + swatchTwClass(active) +
          '" data-color-key="' + key + '" style="background-color:' + c.hex +
          '" aria-label="' + c.name + '" aria-pressed="' + active + '" title="' + c.name + '">' +
          (active ? CHECK_ICON : '') +
          '</button>';
      }).join('');
    }

    function currentColorKeyActive(key) {
      return COLORS[key] === currentColor;
    }

    function paintBody(hex) {
      showcaseImg.querySelectorAll('[data-paint="body"]').forEach(function (panel) {
        panel.setAttribute('fill', hex);
      });
    }

    function renderCar(view) {
      showcaseImg.innerHTML = window.CarSVG.build(view, 'main');
      paintBody(currentColor.hex);
    }

    function applyColor(key, animateSwatchList) {
      currentColor = COLORS[key];
      paintBody(currentColor.hex);
      colorTag.style.opacity = '0';
      setTimeout(function () {
        colorTag.textContent = currentColor.name;
        colorTag.style.opacity = '1';
      }, 200);
      if (animateSwatchList !== false) {
        renderSwatches();
      }
    }

    function applyView(view) {
      currentView = view;
      showcaseImg.classList.add('is-switching');
      setTimeout(function () {
        renderCar(view);
        showcaseImg.classList.remove('is-switching');
      }, 300);
      viewToggle.querySelectorAll('.view-btn').forEach(function (btn) {
        btn.classList.toggle('active', btn.getAttribute('data-view') === view);
      });
    }

    function selectModel(id, skipScroll) {
      const model = MODELS.find(function (m) { return m.id === id; });
      if (!model) return;
      currentModel = model;

      /* Fade out text block */
      [taglineEl, nameEl, descEl].forEach(function (el) { if (el) el.style.opacity = '0'; });

      setTimeout(function () {
        taglineEl.textContent = model.tagline;
        nameEl.textContent = model.name;
        descEl.textContent = model.desc;
        priceEl.textContent = model.price;
        [taglineEl, nameEl, descEl].forEach(function (el) { if (el) el.style.opacity = '1'; });
      }, 220);

      animateStat(statHp, model.hp, 0);
      animateStat(statSpeed, model.speed, 0);
      animateStat(statAccel, model.accel, 1);

      renderTabs();
      applyColor(model.defaultColor, false);
      renderSwatches();

      if (!skipScroll) {
        const section = document.getElementById('models');
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    /* Tab clicks (event delegation) */
    tabsEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.model-tab');
      if (!btn) return;
      selectModel(btn.getAttribute('data-model-id'), true);
    });

    /* Swatch clicks */
    swatchesEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.swatch-tw');
      if (!btn) return;
      applyColor(btn.getAttribute('data-color-key'));
    });

    /* View toggle clicks */
    if (viewToggle) {
      viewToggle.addEventListener('click', function (e) {
        const btn = e.target.closest('.view-btn');
        if (!btn) return;
        applyView(btn.getAttribute('data-view'));
      });
    }

    /* Footer "Models" quick links */
    document.querySelectorAll('[data-model-select]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        selectModel(link.getAttribute('data-model-select'));
      });
    });

    /* Init */
    renderTabs();
    renderSwatches();
    renderCar(currentView);
    applyColor(currentModel.defaultColor, false);
    statHp.textContent = '0';
    statSpeed.textContent = '0';
    statAccel.textContent = '0';

    const modelsCounterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateStat(statHp, currentModel.hp, 0);
          animateStat(statSpeed, currentModel.speed, 0);
          animateStat(statAccel, currentModel.accel, 1);
          modelsCounterObserver.disconnect();
        }
      });
    }, { threshold: 0.4 });
    const modelsSection = document.getElementById('models');
    if (modelsSection) modelsCounterObserver.observe(modelsSection);
  })();

  /* ── SHOWROOM — HYPERCAR ELITE ── */
  (function () {
    const grid = document.getElementById('showroomGrid');
    if (!grid) return;

    const CARS = [
      {
        id: 'chiron', chiron: true,
        brand: 'Bugatti', name: 'Chiron',
        img: 'img/supercars/chiron_showroom.png',
        hp: '1,500', speed: '420', badge: 'House Icon',
        desc: 'Bugatti\'s original hypercar icon — a hand-built masterpiece of carbon fibre and quad-turbo W16 power, wearing the house\'s signature French Racing Blue.'
      },
      {
        id: 'ferrari', brand: 'Ferrari', name: 'SF90 Stradale',
        img: 'img/supercars/ferrari_sf90_stradale.png',
        hp: '986', speed: '340',
        desc: 'Ferrari\'s first series-production plug-in hybrid supercar, pairing a twin-turbo V8 with three electric motors for instant all-wheel-drive response.'
      },
      {
        id: 'lambo', brand: 'Lamborghini', name: 'Aventador SVJ',
        img: 'img/supercars/lamborghini_aventador_svj.png',
        hp: '770', speed: '350',
        desc: 'The final and most extreme naturally-aspirated Aventador, honed on the Nürburgring with active aerodynamics for record-setting cornering grip.'
      },
      {
        id: 'koenigsegg', brand: 'Koenigsegg', name: 'Jesko Absolut',
        img: 'img/supercars/koenigsegg_jesko_absolut.png',
        hp: '1,600', speed: '500+',
        desc: 'A Swedish top-speed specialist stripped of wings and drag, built with one goal: chasing the outer edge of velocity itself.'
      },
      {
        id: 'mclaren', brand: 'McLaren', name: 'Speedtail',
        img: 'img/supercars/mclaren_speedtail.png',
        hp: '1,050', speed: '403',
        desc: 'A three-seat hybrid Hyper-GT with a streamlined teardrop silhouette, engineered for effortless, sustained high-speed cruising.'
      },
      {
        id: 'pagani', brand: 'Pagani', name: 'Huayra BC',
        img: 'img/supercars/pagani_huayra_bc.png',
        hp: '750', speed: '383',
        desc: 'Named after Pagani test driver Benny Caiola, sharpened with carbon-titanium construction and track-focused aerodynamics.'
      },
      {
        id: 'porsche', brand: 'Porsche', name: '918 Spyder',
        img: 'img/supercars/porsche_918_spyder.png',
        hp: '887', speed: '345',
        desc: 'Porsche\'s hybrid hypercar halo model, combining a naturally-aspirated V8 with two electric motors for seamless all-wheel drive.'
      }
    ];

    grid.innerHTML = CARS.map(function (car, i) {
      const delay = 'delay-' + (Math.min(i % 5, 5) + 1);
      return (
        '<div class="showroom-card' + (car.chiron ? ' is-chiron' : '') + ' reveal ' + delay + '" data-car="' + car.id + '" tabindex="0" role="button" aria-label="View details for ' + car.brand + ' ' + car.name + '">' +
          '<div class="showroom-spot" aria-hidden="true"></div>' +
          (car.chiron ? '<span class="showroom-badge">' + car.badge + '</span>' : '') +
          '<div class="showroom-reflection" aria-hidden="true"><img src="' + car.img + '" alt="" loading="lazy" /></div>' +
          '<div class="showroom-pedestal" aria-hidden="true"></div>' +
          '<div class="showroom-figure"><img src="' + car.img + '" alt="' + car.brand + ' ' + car.name + ' on a black studio pedestal" loading="lazy" /></div>' +
          '<span class="showroom-view-hint">View Details</span>' +
          '<div class="showroom-info">' +
            '<p class="showroom-brand">' + car.brand + '</p>' +
            '<h3 class="showroom-name">' + car.name + '</h3>' +
            '<div class="showroom-stats">' +
              '<span><strong>' + car.hp + '</strong>hp</span>' +
              '<span><strong>' + car.speed + '</strong>km/h</span>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    /* Re-observe the freshly injected .reveal cards */
    const showroomRevealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    grid.querySelectorAll('.reveal').forEach(function (el) { showroomRevealObserver.observe(el); });

    /* Subtle 3D tilt toward the cursor — a light showroom-pedestal effect,
       skipped for touch devices and reduced-motion preference. */
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(hover: none)').matches;

    if (!prefersReducedMotion && !isTouchDevice) {
      grid.querySelectorAll('.showroom-card').forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
          const rect = card.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          card.style.transform = 'translateY(-10px) rotateX(' + (py * -8) + 'deg) rotateY(' + (px * 10) + 'deg)';
        });
        card.addEventListener('mouseleave', function () {
          card.style.transform = '';
        });
      });
    }

    /* ── DETAIL MODAL ── */
    function openCarDetail(car) {
      const overlay = document.createElement('div');
      overlay.className = 'showroom-detail-overlay';
      overlay.innerHTML =
        '<div class="showroom-detail-card' + (car.chiron ? ' is-chiron' : '') + '" role="dialog" aria-modal="true" aria-label="' + car.brand + ' ' + car.name + ' details">' +
          '<button type="button" class="showroom-detail-close" aria-label="Close">&times;</button>' +
          '<div class="showroom-detail-spot" aria-hidden="true"></div>' +
          '<div class="showroom-detail-figure"><img src="' + car.img + '" alt="' + car.brand + ' ' + car.name + '" /></div>' +
          '<p class="showroom-detail-brand">' + car.brand + '</p>' +
          '<h3 class="showroom-detail-name">' + car.name + '</h3>' +
          '<p class="showroom-detail-desc">' + car.desc + '</p>' +
          '<div class="showroom-detail-stats">' +
            '<div><strong>' + car.hp + '</strong><span>Horsepower</span></div>' +
            '<div><strong>' + car.speed + '</strong><span>km/h Top Speed</span></div>' +
          '</div>' +
        '</div>';
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(function () { overlay.classList.add('is-open'); });

      function closeModal() {
        overlay.classList.remove('is-open');
        document.body.style.overflow = '';
        setTimeout(function () { overlay.remove(); }, 300);
        document.removeEventListener('keydown', onKeydown);
      }
      function onKeydown(e) { if (e.key === 'Escape') closeModal(); }

      overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
      overlay.querySelector('.showroom-detail-close').addEventListener('click', closeModal);
      document.addEventListener('keydown', onKeydown);
    }

    grid.querySelectorAll('.showroom-card').forEach(function (card) {
      const car = CARS.find(function (c) { return c.id === card.getAttribute('data-car'); });
      if (!car) return;
      card.addEventListener('click', function () { openCarDetail(car); });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCarDetail(car); }
      });
    });
  })();

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
