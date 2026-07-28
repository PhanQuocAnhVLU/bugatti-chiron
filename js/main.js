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
    const reflImg = document.getElementById('carReflectionImg');
    const carFigure = document.getElementById('carFigure');
    const carReflection = document.querySelector('.car-reflection');
    const mainHue = document.getElementById('mainHue');
    const mainLum = document.getElementById('mainLum');
    const reflHue = document.getElementById('reflHue');
    const reflLum = document.getElementById('reflLum');
    const stageFloorGlow = document.getElementById('stageFloorGlow');
    const modelShowcase = document.getElementById('modelShowcase');
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

    /* Camera views — car cut out on a transparent background so paint
       colour only ever touches the body, never the studio backdrop */
    const VIEWS = {
      side:  'img/side-car.png',
      front: 'img/front-car.png',
      rear:  'img/rear-car.png'
    };

    /* Colour library. Each swatch repaints the car in two passes on top of
       a fully desaturated base photo:
         hue  → mix-blend-mode:color, casts the actual paint hue/saturation
         lum  → multiply (darken) or screen (lighten) to hit the right value,
                masked to the same car silhouette so nothing bleeds onto the stage */
    const COLORS = {
      blue:       { name: 'French Racing Blue', hex: '#0047AB', hueOpacity: 0.70, lumMode: 'none',     lumOpacity: 0 },
      black:      { name: 'Nocturne Black',      hex: '#0c0d10', hueOpacity: 0.35, lumMode: 'multiply', lumOpacity: 0.58, lumColor: '#000000' },
      white:      { name: 'Glacier White',       hex: '#eef1f5', hueOpacity: 0.20, lumMode: 'screen',   lumOpacity: 0.62, lumColor: '#ffffff' },
      silver:     { name: 'Argent Silver',       hex: '#b0bec5', hueOpacity: 0.32, lumMode: 'screen',   lumOpacity: 0.22, lumColor: '#ffffff' },
      red:        { name: 'Italian Red',         hex: '#a3161b', hueOpacity: 0.78, lumMode: 'none',     lumOpacity: 0 },
      gold:       { name: 'Bronze Gold',         hex: '#a9772f', hueOpacity: 0.72, lumMode: 'multiply', lumOpacity: 0.10, lumColor: '#000000' },
      green:      { name: 'Racing Green',        hex: '#1f4d3a', hueOpacity: 0.72, lumMode: 'multiply', lumOpacity: 0.26, lumColor: '#000000' },
      anthracite: { name: 'Anthracite',          hex: '#3a3d42', hueOpacity: 0.40, lumMode: 'multiply', lumOpacity: 0.36, lumColor: '#000000' }
    };

    /* Model range */
    const MODELS = [
      {
        id: 'chiron', name: 'Chiron', tagline: 'The Original Icon',
        desc: 'The car that redefined the hypercar category — pure, uncompromising, timeless.',
        hp: 1500, speed: 420, accel: 2.4, price: '€ 2,998,000',
        colors: ['blue', 'black', 'white', 'silver'], defaultColor: 'blue'
      },
      {
        id: 'sport', name: 'Chiron Sport', tagline: 'Track-Tuned Precision',
        desc: 'Sharper reflexes and a lighter footprint, honed on the Nürburgring for pure driving feedback.',
        hp: 1500, speed: 420, accel: 2.4, price: '€ 3,260,000',
        colors: ['blue', 'black', 'red', 'anthracite'], defaultColor: 'anthracite'
      },
      {
        id: 'supersport', name: 'Chiron Super Sport 300+', tagline: 'Beyond 300 mph',
        desc: 'The first production car to exceed 300 mph — an elongated tail and reworked aero for absolute top-end stability.',
        hp: 1600, speed: 490, accel: 2.4, price: '€ 3,900,000',
        colors: ['black', 'silver', 'white', 'blue'], defaultColor: 'black'
      },
      {
        id: 'pursport', name: 'Chiron Pur Sport', tagline: 'Corner-Carving Purist',
        desc: 'Shorter gearing, wider track and a fixed rear wing built for one purpose: devouring apexes.',
        hp: 1500, speed: 380, accel: 2.3, price: '€ 3,550,000',
        colors: ['green', 'black', 'gold', 'silver'], defaultColor: 'green'
      },
      {
        id: 'divo', name: 'Divo', tagline: 'Agility Redefined',
        desc: 'Named after a legendary Bugatti racer — 35kg lighter and built to generate maximum downforce through corners.',
        hp: 1500, speed: 380, accel: 2.4, price: '€ 5,000,000',
        colors: ['black', 'blue', 'anthracite', 'white'], defaultColor: 'black'
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

    function renderSwatches() {
      swatchesEl.innerHTML = currentModel.colors.map(function (key) {
        const c = COLORS[key];
        return '<button type="button" class="swatch' + (currentColorKeyActive(key) ? ' active' : '') +
          '" data-color-key="' + key + '" style="background:' + c.hex +
          '" aria-label="' + c.name + '" title="' + c.name + '"></button>';
      }).join('');
    }

    function currentColorKeyActive(key) {
      return COLORS[key] === currentColor;
    }

    /* Paint a single hue/lum overlay pair to match a colour entry */
    function tintPair(hueEl, lumEl, color) {
      if (!hueEl || !lumEl) return;
      hueEl.style.backgroundColor = color.hex;
      hueEl.style.opacity = color.hueOpacity;
      if (color.lumMode === 'none') {
        lumEl.style.opacity = 0;
      } else {
        lumEl.style.backgroundColor = color.lumColor;
        lumEl.style.mixBlendMode = color.lumMode;
        lumEl.style.opacity = color.lumOpacity;
      }
    }

    function applyColor(key, animateSwatchList) {
      currentColor = COLORS[key];

      tintPair(mainHue, mainLum, currentColor);
      tintPair(reflHue, reflLum, currentColor);

      /* Studio floor glow picks up the paint colour for cohesion */
      if (stageFloorGlow) stageFloorGlow.style.background =
        'radial-gradient(ellipse at center, ' + currentColor.hex + ' 0%, transparent 75%)';
      if (modelShowcase) modelShowcase.style.setProperty('--paint-hex', currentColor.hex);

      colorTag.style.opacity = '0';
      colorTag.style.transform = 'translateY(4px)';
      setTimeout(function () {
        colorTag.textContent = currentColor.name;
        colorTag.style.opacity = '1';
        colorTag.style.transform = 'translateY(0)';
      }, 200);

      if (animateSwatchList !== false) {
        swatchesEl.querySelectorAll('.swatch').forEach(function (sw) {
          sw.classList.toggle('active', sw.getAttribute('data-color-key') === key);
        });
      }
    }

    function setImages(view) {
      const url = 'url(' + VIEWS[view] + ')';
      showcaseImg.src = VIEWS[view];
      if (reflImg) reflImg.src = VIEWS[view];
      /* Tint overlays are masked by the same cutout so colour never
         spills past the car's silhouette, matching whichever angle is shown */
      [mainHue, mainLum, reflHue, reflLum].forEach(function (el) {
        if (!el) return;
        el.style.webkitMaskImage = url;
        el.style.maskImage = url;
      });
    }

    function applyView(view) {
      currentView = view;
      carFigure.classList.add('is-switching');
      if (carReflection) carReflection.classList.add('is-switching');
      setTimeout(function () {
        setImages(view);
        carFigure.classList.remove('is-switching');
        if (carReflection) carReflection.classList.remove('is-switching');
      }, 320);
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

      /* "Turntable swap" — the outgoing car twists off, the new one settles in */
      carFigure.classList.remove('is-model-switching');
      void carFigure.offsetWidth; /* restart animation */
      carFigure.classList.add('is-model-switching');

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
      const btn = e.target.closest('.swatch');
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
    setImages(currentView);
    renderTabs();
    renderSwatches();
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
