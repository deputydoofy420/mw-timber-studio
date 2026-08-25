/* ============================================================
   MW TIMBER STUDIO — interactions
   ============================================================ */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasVT = window.CSS && CSS.supports && CSS.supports("view-transition-name: none");

  /* ---------- catalogue ---------- */
  const PRODUCTS = {
    "end-grain": {
      name: "End-Grain Classics",
      sizes: [
        { label: 'Small · 12×9"', price: 85 },
        { label: 'Medium · 16×12"', price: 110 },
        { label: 'Large · 18×14"', price: 145 },
      ],
    },
    "edge-grain": {
      name: "Edge-Grain Everyday",
      sizes: [
        { label: 'Compact · 12×8"', price: 45 },
        { label: 'Classic · 15×10"', price: 60 },
        { label: 'XL · 18×12"', price: 78 },
      ],
    },
    serving: {
      name: "Serving & Cheese Boards",
      sizes: [
        { label: 'Paddle · 16×7"', price: 55 },
        { label: 'Rectangle · 14×10"', price: 70 },
        { label: "Live-edge · varies", price: 95 },
      ],
    },
    engraved: {
      name: "Custom Engraved",
      sizes: [
        { label: "One line of text", price: 65 },
        { label: "Monogram + border", price: 85 },
        { label: "Full logo / design", price: 120 },
      ],
    },
  };
  const money = (n) => `$${n.toLocaleString()}`;

  /* ---------- preloader ---------- */
  const loader = document.getElementById("loader");
  const finishLoad = () => {
    if (!loader) return;
    setTimeout(() => {
      loader.classList.add("done");
      document.body.classList.remove("is-loading");
      setTimeout(() => loader.remove(), 800);
    }, 900);
  };
  if (document.readyState === "complete") finishLoad();
  else window.addEventListener("load", finishLoad);
  // safety net in case load never fires (stalled font, etc.)
  setTimeout(finishLoad, 3500);

  /* ---------- stagger indices ---------- */
  document.querySelectorAll(".grid-stagger").forEach((grid) => {
    [...grid.children].forEach((el, i) => { el.style.setProperty("--i", i); });
  });

  /* ---------- hero letter delays ---------- */
  document.querySelectorAll(".hero-title .line").forEach((line, li) => {
    line.querySelectorAll(".ch").forEach((ch, i) => {
      ch.style.animationDelay = `${0.15 + li * 0.25 + i * 0.07}s`;
    });
  });

  /* ---------- section title letter-split ---------- */
  document.querySelectorAll(".section-title em").forEach((em) => {
    if (!em.textContent.trim()) return;
    const text = em.textContent;
    em.setAttribute("aria-label", text);
    em.textContent = "";
    [...text].forEach((ch, i) => {
      const s = document.createElement("span");
      s.className = "w-ch";
      s.setAttribute("aria-hidden", "true");
      s.style.setProperty("--d", i);
      s.textContent = ch === " " ? "\u00a0" : ch;
      em.appendChild(s);
    });
  });

  /* ---------- nav: scrolled state + mobile toggle ---------- */
  const nav = document.getElementById("nav");
  const onNavScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
  onNavScroll();
  window.addEventListener("scroll", onNavScroll, { passive: true });

  document.getElementById("nav-toggle").addEventListener("click", () =>
    document.body.classList.toggle("nav-open")
  );
  document.querySelectorAll(".nav-links a").forEach((a) => {
    a.addEventListener("click", () => document.body.classList.remove("nav-open"));
  });

  /* ---------- active section highlighting (index only) ---------- */
  const links = [...document.querySelectorAll(".nav-links a")];
  const sections = links
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);
  if (sections.length) {
    const sectionSpy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          links.forEach((l) => {
            l.classList.toggle(
              "active",
              l.getAttribute("href") === `#${e.target.id}`
            );
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => { sectionSpy.observe(s); });
  }

  /* ---------- reveal on scroll ---------- */
  const revealer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          revealer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal, .swatch").forEach((el) => { revealer.observe(el); });

  /* ---------- tree rings draw-on ---------- */
  const ringsSvg = document.getElementById("rings-svg");
  if (ringsSvg) {
    const ringObs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          ringsSvg.classList.add("drawn");
          ringObs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    ringObs.observe(ringsSvg);
  }

  /* ---------- counters ---------- */
  const animateCount = (el) => {
    const target = parseInt(el.dataset.target || "0", 10);
    const suffix = el.dataset.suffix || "";
    const dur = 1600;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const countObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          animateCount(e.target);
          countObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  document.querySelectorAll(".num[data-target]").forEach((el) => { countObs.observe(el); });

  /* ---------- card tilt + cursor glow ---------- */
  if (!reduceMotion && matchMedia("(hover:hover)").matches) {
    document.querySelectorAll(".tilt").forEach((card) => {
      let raf = null;
      card.addEventListener("mousemove", (ev) => {
        const r = card.getBoundingClientRect();
        const px = (ev.clientX - r.left) / r.width;
        const py = (ev.clientY - r.top) / r.height;
        if (raf) return;
        raf = requestAnimationFrame(() => {
          card.style.transform =
            `perspective(800px) rotateX(${(0.5 - py) * 10}deg) rotateY(${(px - 0.5) * 12}deg) translateY(-6px)`;
          card.style.setProperty("--mx", `${px * 100}%`);
          card.style.setProperty("--my", `${py * 100}%`);
          raf = null;
        });
      });
      card.addEventListener("mouseleave", () => {
        cancelAnimationFrame(raf);
        raf = null;
        card.style.transform = "";
      });
    });
  }

  /* ---------- hero parallax (+ plaid drift-on-scroll) ---------- */
  const heroInner = document.querySelector(".hero-inner");
  const treelineBack = document.querySelector(".treeline-back");
  const treelineFront = document.querySelector(".treeline-front");
  const heroPlaid = document.querySelector(".hero-plaid");
  if (!reduceMotion && heroInner) {
    let ticking = false;
    const parallax = () => {
      const y = window.scrollY;
      const h = window.innerHeight;
      if (y < h * 1.2) {
        heroInner.style.transform = `translateY(${y * 0.28}px)`;
        heroInner.style.opacity = String(Math.max(1 - y / (h * 0.75), 0));
        treelineBack.style.translate = `0 ${y * 0.12}px`;
        treelineFront.style.translate = `0 ${y * 0.05}px`;
        if (heroPlaid) {
          heroPlaid.style.transform =
            `scale(${1 + y * 0.00012}) rotate(${y * 0.006}deg) translateY(${y * -0.04}px)`;
        }
      }
      ticking = false;
    };
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(parallax);
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  /* ---------- scroll progress ruler ---------- */
  const progressFill = document.createElement("div");
  progressFill.id = "scroll-progress";
  progressFill.innerHTML = '<span class="fill"></span>';
  document.body.appendChild(progressFill);
  const fillEl = progressFill.firstElementChild;
  let progTick = false;
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    fillEl.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
    progTick = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!progTick) {
        requestAnimationFrame(updateProgress);
        progTick = true;
      }
    },
    { passive: true }
  );
  updateProgress();

  /* ---------- sawdust particle field (+ click bursts) ---------- */
  let sawdustBurst = () => {};
  const canvas = document.getElementById("sawdust");
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext("2d");
    const COLORS = ["#d9b98c", "#b98a54", "#e6cf9f", "#a87f4a"];
    let W, H, particles;
    const COUNT = () => Math.min(90, Math.floor(window.innerWidth / 16));

    const makeParticle = (spawnTop) => ({
      x: Math.random() * W,
      y: spawnTop ? -10 : Math.random() * H,
      r: 0.8 + Math.random() * 2.4,
      vy: 0.35 + Math.random() * 0.9,
      vx: -0.25 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
      sway: 0.3 + Math.random() * 0.8,
      alpha: 0.18 + Math.random() * 0.45,
      color: COLORS[(Math.random() * COLORS.length) | 0],
      ttl: Infinity,
      decay: 0,
    });

    const resize = () => {
      W = canvas.width = window.innerWidth * devicePixelRatio;
      H = canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      W = window.innerWidth;
      H = window.innerHeight;
      if (!particles) particles = Array.from({ length: COUNT() }, () => makeParticle(false));
      else while (particles.length > COUNT()) particles.pop();
    };
    resize();
    window.addEventListener("resize", resize);

    sawdustBurst = (x, y, n = 16) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = 1.5 + Math.random() * 4;
        particles.push({
          x, y,
          r: 1 + Math.random() * 2.6,
          vy: Math.sin(a) * sp - 1.2,
          vx: Math.cos(a) * sp,
          phase: Math.random() * Math.PI * 2,
          sway: 0,
          alpha: 0.5 + Math.random() * 0.5,
          color: COLORS[(Math.random() * COLORS.length) | 0],
          ttl: 46 + (Math.random() * 24 | 0),
          decay: 0.985,
          grav: 0.09,
        });
      }
    };

    let running = true;
    document.addEventListener("visibilitychange", () => {
      running = !document.hidden;
      if (running) requestAnimationFrame(frame);
    });

    let t = 0;
    function frame() {
      if (!running) return;
      t += 0.008;
      ctx.clearRect(0, 0, W, H);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx + Math.sin(t * 2 + p.phase) * p.sway * 0.3;
        p.y += p.vy;
        if (p.grav) p.vy += p.grav;
        if (p.ttl !== Infinity) {
          p.ttl--;
          p.alpha *= p.decay;
          if (p.ttl <= 0 || p.alpha < 0.02) { particles.splice(i, 1); continue; }
        }
        if (p.y > H + 12 || p.x < -12 || p.x > W + 12) {
          Object.assign(p, makeParticle(true));
        }
        ctx.globalAlpha = Math.max(p.alpha, 0);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    // sawdust kick on quick pointer presses anywhere
    if (!matchMedia("(hover:none)").matches) {
      window.addEventListener("pointerdown", (e) => {
        if (e.button !== 0) return;
        sawdustBurst(e.clientX, e.clientY, 8);
      }, { passive: true });
    }
  }

  /* ---------- marquee content boost (adds plaid bullets) ---------- */
  document.querySelectorAll(".marquee-track span").forEach((span) => {
    span.innerHTML = span.innerHTML.replaceAll("•", "<b>◆</b>");
  });

  /* ---------- magnetic buttons ---------- */
  if (!reduceMotion && matchMedia("(hover:hover)").matches) {
    document.querySelectorAll(".btn-primary, .btn-cream, #cart-btn").forEach((el) => {
      let raf = null;
      el.addEventListener("mousemove", (ev) => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          const r = el.getBoundingClientRect();
          const dx = (ev.clientX - (r.left + r.width / 2)) / r.width;
          const dy = (ev.clientY - (r.top + r.height / 2)) / r.height;
          el.style.translate = `${dx * 7}px ${dy * 7}px`;
          raf = null;
        });
      });
      el.addEventListener("mouseleave", () => {
        cancelAnimationFrame(raf);
        raf = null;
        el.style.translate = "";
      });
    });
  }

  /* ============================================================
     PAGE EXIT TRANSITION (fallback when no cross-doc VT)
     ============================================================ */
  if (!hasVT) {
    document.addEventListener("click", (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest('a[href$=".html"]');
      if (!a || a.target === "_blank") return;
      e.preventDefault();
      document.body.classList.add("page-exit");
      setTimeout(() => { window.location.href = a.href; }, reduceMotion ? 0 : 240);
    });
  }

  /* ============================================================
     TOAST
     ============================================================ */
  let toastEl = null, toastTimer = null;
  const toast = (html) => {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.id = "toast";
      toastEl.setAttribute("role", "status");
      document.body.appendChild(toastEl);
    }
    toastEl.innerHTML = `<span class="t-chip"></span><span>${html}</span>`;
    requestAnimationFrame(() => toastEl.classList.add("show"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2600);
  };

  /* ============================================================
     CART — state, UI injection, rendering
     ============================================================ */
  const STORE_KEY = "mw-timber-cart-v1";
  const loadCart = () => {
    try {
      const raw = JSON.parse(localStorage.getItem(STORE_KEY));
      if (Array.isArray(raw)) return raw.filter((i) => PRODUCTS[i.id] && i.qty > 0);
    } catch (_) { /* corrupt storage — reset */ }
    return [];
  };
  let cart = loadCart();
  const saveCart = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify(cart)); } catch (_) {} };

  /* inject cart button into nav + drawer/backdrop markup once */
  const navToggle = document.getElementById("nav-toggle");
  if (navToggle && !document.getElementById("cart-btn")) {
    const actions = document.createElement("div");
    actions.className = "nav-actions";
    actions.appendChild(document.createRange().createContextualFragment(`
      <button id="cart-btn" type="button" aria-label="Open cart">
        <svg viewBox="0 0 24 24"><title>Shopping bag</title>
          <path d="M6 8 h12 l-1.2 12.2 a1.6 1.6 0 0 1 -1.6 1.4 H8.8 a1.6 1.6 0 0 1 -1.6 -1.4 Z"/>
          <path d="M9 10 V6.5 a3 3 0 0 1 6 0 V10"/>
        </svg>
        <span id="cart-count" class="cart-count" hidden>0</span>
      </button>
    `));
    actions.appendChild(navToggle);
    nav.appendChild(actions);
  }

  if (!document.getElementById("cart-drawer")) {
    document.body.appendChild(document.createRange().createContextualFragment(`
      <div id="cart-backdrop"></div>
      <aside id="cart-drawer" aria-label="Your cart">
        <div class="cart-head">
          <h2><svg viewBox="0 0 24 24"><title>Your cart</title>
            <path d="M6 8 h12 l-1.2 12.2 a1.6 1.6 0 0 1 -1.6 1.4 H8.8 a1.6 1.6 0 0 1 -1.6 -1.4 Z"/>
            <path d="M9 10 V6.5 a3 3 0 0 1 6 0 V10"/></svg>
            YOUR STASH</h2>
          <button id="cart-close" type="button" aria-label="Close cart">×</button>
        </div>
        <div class="cart-body">
          <div class="cart-empty" hidden>
            <svg viewBox="0 0 64 64"><title>Empty cart</title>
              <circle cx="32" cy="32" r="26"/>
              <circle cx="32" cy="32" r="5"/>
              <path d="M32 27 V13 M32 51 v-14 M22 22 L14 14 M50 14 L42 22 M22 42 L14 50 M50 50 L42 42"/>
            </svg>
            <p>Lighter than balsa.</p>
            <small>Nothing in the stash yet — go poke some boards.</small>
          </div>
          <ul id="cart-items" style="list-style:none"></ul>
        </div>
        <div class="cart-foot">
          <div class="cart-total"><small>Total, before tax</small><span id="cart-total-amt">$0</span></div>
          <button id="checkout-btn" class="btn btn-primary" type="button">Start the order</button>
          <p class="cart-note">No payment here — we confirm every order over email, like it's 1998.</p>
        </div>
      </aside>
    `));
  }

  const drawer = document.getElementById("cart-drawer");
  const itemsUl = document.getElementById("cart-items");
  const emptyEl = drawer.querySelector(".cart-empty");
  const totalAmt = document.getElementById("cart-total-amt");
  const checkoutBtn = document.getElementById("checkout-btn");
  const badge = document.getElementById("cart-count");
  const cartBtn = document.getElementById("cart-btn");

  const itemCount = () => cart.reduce((n, i) => n + i.qty, 0);
  const cartTotal = () => cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const renderBadge = () => {
    const n = itemCount();
    badge.hidden = n === 0;
    badge.textContent = n;
  };

  const renderCart = () => {
    renderBadge();
    totalAmt.textContent = money(cartTotal());
    checkoutBtn.disabled = cart.length === 0;
    emptyEl.hidden = cart.length > 0;
    itemsUl.innerHTML = "";
    cart.forEach((item, i) => {
      const p = PRODUCTS[item.id];
      itemsUl.appendChild(document.createRange().createContextualFragment(`
        <li class="cart-item" data-key="${item.key}" style="--i:${i}">
          <span class="ci-thumb" data-tone="${item.id}"></span>
          <div class="ci-info">
            <strong>${p.name}</strong>
            <small>${item.sizeLabel} · ${money(item.price)} each</small>
            <div class="qty">
              <button type="button" data-step="-1" aria-label="One less">−</button>
              <output>${item.qty}</output>
              <button type="button" data-step="1" aria-label="One more">+</button>
            </div>
          </div>
          <div class="ci-right">
            <span class="ci-price">${money(item.price * item.qty)}</span>
            <button type="button" class="ci-remove" aria-label="Remove from cart">×</button>
          </div>
        </li>`));
    });
  };

  const openCart = () => {
    renderCart();
    document.body.classList.add("cart-open");
    drawer.querySelector("#cart-close").focus();
  };
  const closeCart = () => {
    document.body.classList.remove("cart-open");
    cartBtn.focus();
  };

  cartBtn.addEventListener("click", openCart);
  drawer.querySelector("#cart-close").addEventListener("click", closeCart);
  document.getElementById("cart-backdrop").addEventListener("click", closeCart);
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (document.body.classList.contains("cart-open")) closeCart();
    else document.body.classList.remove("nav-open");
  });

  itemsUl.addEventListener("click", (e) => {
    const li = e.target.closest(".cart-item");
    if (!li) return;
    const item = cart.find((i) => i.key === li.dataset.key);
    if (!item) return;
    if (e.target.closest("[data-step]")) {
      item.qty += parseInt(e.target.closest("[data-step]").dataset.step, 10);
      if (item.qty <= 0) {
        cart = cart.filter((i) => i !== item);
      }
      saveCart();
      renderCart();
    } else if (e.target.closest(".ci-remove")) {
      li.classList.add("out");
      setTimeout(() => {
        cart = cart.filter((i) => i !== item);
        saveCart();
        renderCart();
      }, reduceMotion ? 0 : 280);
    }
  });

  checkoutBtn.addEventListener("click", () => {
    if (!cart.length) return;
    const lines = [
      "Howdy — I'd like to order:",
      "",
      ...cart.map((i) => `• ${PRODUCTS[i.id].name} — ${i.sizeLabel} × ${i.qty} (${money(i.price * i.qty)})`),
      "",
      `Total: ${money(cartTotal())}`,
      "",
      "Name:",
      "Shipping address:",
    ];
    const url =
      `mailto:hello@mwtimberstudio.example` +
      `?subject=${encodeURIComponent(`Board order — ${itemCount()} item(s)`)}` +
      `&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = url;
  });

  /* ---------- fly-to-cart chip + add flow ---------- */
  const popBadge = () => {
    badge.classList.remove("pop");
    void badge.offsetWidth;
    badge.classList.add("pop");
  };

  const flyToCart = (fromEl) => {
    if (reduceMotion || !fromEl) return;
    const from = fromEl.getBoundingClientRect();
    const to = cartBtn.getBoundingClientRect();
    const x0 = from.left + from.width / 2;
    const y0 = from.top + from.height / 2;
    const dx = to.left + to.width / 2 - x0;
    const dy = to.top + to.height / 2 - y0;
    const chip = document.createElement("span");
    chip.className = "fly-chip";
    chip.style.left = `${x0}px`;
    chip.style.top = `${y0}px`;
    document.body.appendChild(chip);
    chip.animate(
      [
        { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
        { transform: `translate(calc(-50% + ${dx * 0.45}px), calc(-50% + ${dy * 0.55 - 110}px)) scale(0.85)`, opacity: 1, offset: 0.62 },
        { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0.25)`, opacity: 0.4 },
      ],
      { duration: 720, easing: "cubic-bezier(.3,.7,.3,1)" }
    ).onfinish = () => {
      chip.remove();
      popBadge();
      const r = cartBtn.getBoundingClientRect();
      sawdustBurst(r.left + r.width / 2, r.top + r.height / 2, 14);
    };
  };

  const addToCart = (id, sizeIdx, qty, fromEl) => {
    const p = PRODUCTS[id];
    if (!p) return;
    const size = p.sizes[sizeIdx] || p.sizes[0];
    const key = `${id}:${sizeIdx}`;
    const existing = cart.find((i) => i.key === key);
    if (existing) existing.qty += qty;
    else cart.push({ key, id, sizeIdx, sizeLabel: size.label, price: size.price, qty });
    saveCart();
    renderBadge();
    flyToCart(fromEl);
    toast(`<strong>${p.name}</strong>&nbsp;<small>(${size.label}) added to your stash</small>`);
  };

  /* quick-add buttons (index cards + product pages) */
  document.querySelectorAll("[data-add]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.dataset.add;
      const page = btn.closest("[data-product]");
      let sizeIdx = 0;
      let qty = 1;
      if (page) {
        const checked = page.querySelector('input[name="size"]:checked');
        if (checked) sizeIdx = parseInt(checked.value, 10);
        const out = page.querySelector(".buy-row .qty output");
        if (out) qty = Math.max(1, parseInt(out.textContent, 10) || 1);
      }
      addToCart(id, sizeIdx, qty, btn);
    });
  });

  /* product page: size pills re-price, qty stepper, engrave preview */
  const productRoot = document.querySelector("[data-product]");
  if (productRoot) {
    const priceEl = productRoot.querySelector(".price-now");
    productRoot.querySelectorAll('input[name="size"]').forEach((radio) => {
      radio.addEventListener("change", () => {
        if (!priceEl) return;
        const p = PRODUCTS[productRoot.dataset.product];
        const s = p.sizes[parseInt(radio.value, 10)];
        priceEl.textContent = money(s.price);
        priceEl.classList.remove("flip");
        void priceEl.offsetWidth;
        priceEl.classList.add("flip");
      });
    });
    productRoot.querySelectorAll(".buy-row [data-step]").forEach((b) => {
      b.addEventListener("click", () => {
        const out = productRoot.querySelector(".buy-row .qty output");
        let q = (parseInt(out.textContent, 10) || 1) + parseInt(b.dataset.step, 10);
        q = Math.min(Math.max(q, 1), 20);
        out.textContent = q;
      });
    });
    const engraveInput = document.getElementById("engrave-text");
    const mono = document.querySelector(".board-engraved .mono");
    if (engraveInput && mono) {
      engraveInput.addEventListener("input", () => {
        mono.textContent = (engraveInput.value || "M&W").toUpperCase().slice(0, 14);
        mono.classList.remove("bump");
        void mono.offsetWidth;
        mono.classList.add("bump");
      });
    }
  }

  renderBadge();
})();
