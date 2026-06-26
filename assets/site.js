const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelector("[data-nav-links]");
const siteHeader = document.querySelector("[data-site-header]");

const leadConversionForms = document.querySelectorAll(".fluid-intake-form");

const hydrateIntakeContext = () => {
  const params = new URLSearchParams(window.location.search);
  const vendor = params.get("vendor");
  const category = params.get("category");
  const source = params.get("source");
  if (!vendor && !category) return;

  leadConversionForms.forEach((form) => {
    const heading = form.querySelector("h2");
    const textarea = form.querySelector('textarea[name="CONTACT_CF1"]');
    const leadSource = form.querySelector('input[name="LEAD_SOURCE"]');
    const vendorField = form.querySelector('input[name="VENDOR_NAME"]');
    const categoryField = form.querySelector('input[name="VENDOR_CATEGORY"]');
    const sourceField = form.querySelector('input[name="REQUEST_SOURCE"]');
    const pageField = form.querySelector('input[name="PAGE_URL"]');

    if (vendorField && vendor) vendorField.value = vendor;
    if (categoryField && category) categoryField.value = category;
    if (sourceField && source) sourceField.value = source;
    if (pageField) pageField.value = window.location.href;
    if (heading && vendor) heading.textContent = `Request an introduction to ${vendor}`;
    if (leadSource && source) leadSource.value = `FluidRWA ${source}`;
    if (textarea && !textarea.value.trim()) {
      const intro = vendor ? `I would like an introduction to ${vendor}.` : "I would like help finding a vendor.";
      const categoryLine = category ? ` Category: ${category}.` : "";
      textarea.value = `${intro}${categoryLine} Please route this through FluidRWA.`;
    }
  });
};

hydrateIntakeContext();

leadConversionForms.forEach((form) => {
  const frameName = form.getAttribute("target");
  const frame = frameName ? document.querySelector(`iframe[name="${frameName}"]`) : null;
  const status = form.querySelector("[data-form-status]");
  const button = form.querySelector('button[type="submit"]');
  const isVendorForm = frameName === "fluidVendorSubmit";
  const defaultButtonText = button?.textContent || "Submit";
  let submitted = false;
  let conversionReported = false;
  let submissionTimer;

  const formValue = (formData, name) => String(formData.get(name) || "").trim();

  form.addEventListener("submit", async (event) => {
    submitted = true;
    conversionReported = false;
    if (button) {
      button.disabled = true;
      button.textContent = "Submitting...";
    }
    if (status) {
      status.className = "form-status is-loading";
      status.textContent = isVendorForm
        ? "Submitting your vendor interest..."
        : "Submitting your requirements...";
    }

    if (!isVendorForm) {
      event.preventDefault();
      const params = new URLSearchParams(window.location.search);
      const formData = new FormData(form);
      const payload = {
        vendorName: formValue(formData, "VENDOR_NAME") || params.get("vendor") || "",
        vendorCategory: formValue(formData, "VENDOR_CATEGORY") || params.get("category") || "",
        source: formValue(formData, "REQUEST_SOURCE") || params.get("source") || "submit-requirement",
        pageUrl: window.location.href,
        leadSource: formValue(formData, "LEAD_SOURCE"),
        contactEmail: formValue(formData, "CONTACT_EMAIL"),
        firstName: formValue(formData, "FIRSTNAME"),
        lastName: formValue(formData, "LASTNAME"),
        title: formValue(formData, "TITLE"),
        companyName: formValue(formData, "COMPANYNAME"),
        phone: formValue(formData, "PHONE"),
        country: formValue(formData, "COUNTRY"),
        website: formValue(formData, "WEBSITE"),
        linkedin: formValue(formData, "LINKEDIN_HANDLE"),
        projectDescription: formValue(formData, "CONTACT_CF1"),
        rawPayload: Object.fromEntries(formData.entries()),
      };

      try {
        const response = await fetch("/api/vendor-intro-request", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const result = await response.json();
        if (!response.ok || !result.ok) throw new Error(result.message || "Your request could not be saved.");
        submitted = false;
        conversionReported = true;
        window.clearTimeout(submissionTimer);
        if (button) button.textContent = "Submitted";
        if (status) {
          status.className = "form-status is-success";
          status.textContent = "Thank you. Your project requirements have been received.";
        }
        window.fluidRwaReportLeadConversion?.();
      } catch (error) {
        submitted = false;
        window.clearTimeout(submissionTimer);
        if (button) {
          button.disabled = false;
          button.textContent = defaultButtonText;
        }
        if (status) {
          status.className = "form-status is-error";
          status.textContent = error instanceof Error ? error.message : "Your request could not be saved. Please try again.";
        }
      }
      return;
    }

    window.clearTimeout(submissionTimer);
    submissionTimer = window.setTimeout(() => {
      if (!submitted || conversionReported) return;
      if (button) {
        button.disabled = false;
        button.textContent = defaultButtonText;
      }
      if (status) {
        status.className = "form-status is-error";
        status.textContent = "The submission is taking longer than expected. Please check your connection and try again.";
      }
    }, 12000);
  });

  frame?.addEventListener("load", () => {
    if (!submitted || conversionReported) return;
    conversionReported = true;
    window.clearTimeout(submissionTimer);
    if (button) button.textContent = "Submitted";
    if (status) {
      status.className = "form-status is-success";
      status.textContent = isVendorForm
        ? "Thank you. Your vendor interest has been received."
        : "Thank you. Your project requirements have been received.";
    }
    window.fluidRwaReportLeadConversion?.();
  });
});

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const updateHeader = () => {
  if (!siteHeader) return;
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const node = entry.target;
    const target = Number(node.dataset.count);
    if (!Number.isFinite(target)) return;
    const duration = 1100;
    const started = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - started) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = Math.round(target * eased).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    observer.unobserve(node);
  });
}, { threshold: 0.35 });

document.querySelectorAll("[data-count]").forEach((node) => counterObserver.observe(node));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("is-visible");
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach((node) => revealObserver.observe(node));


document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks) {
      navLinks.classList.remove("is-open");
      navToggle?.setAttribute("aria-expanded", "false");
    }
  });
});

const gameShell = document.querySelector("[data-vendor-game]");

if (gameShell) {
  const canvas = gameShell.querySelector("[data-game-canvas]");
  const startButton = gameShell.querySelector("[data-game-start]");
  const scoreNode = gameShell.querySelector("[data-game-score]");
  const streakNode = gameShell.querySelector("[data-game-streak]");
  const bestNode = gameShell.querySelector("[data-game-best]");
  const ctx = canvas.getContext("2d");
  const goodLabels = ["Tokenization", "KYC", "Custody", "Legal", "Payments", "AI", "Audits", "Identity"];
  const badLabels = ["Hype", "Spam", "Noise", "Shill"];
  const getBestScore = () => {
    try {
      return Number(localStorage.getItem("fluidrwaGameBest") || 0);
    } catch (error) {
      return 0;
    }
  };

  const saveBestScore = (value) => {
    try {
      localStorage.setItem("fluidrwaGameBest", String(value));
    } catch (error) {
      // Best score persistence is nice to have; the game should still run without storage.
    }
  };

  const state = {
    running: false,
    score: 0,
    streak: 0,
    best: getBestScore(),
    trayX: 0.5,
    targetX: 0.5,
    items: [],
    lastSpawn: 0,
    lastTime: 0,
    speed: 96,
  };

  bestNode.textContent = state.best.toLocaleString();

  const resizeGame = () => {
    const rect = gameShell.getBoundingClientRect();
    const compact = window.matchMedia("(max-width: 620px)").matches;
    const dpr = compact ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.max(320, Math.floor(rect.width * dpr));
    canvas.height = Math.max(260, Math.floor(rect.height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const drawRoundRect = (x, y, w, h, r) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  };

  const spawnItem = (width) => {
    const isGood = Math.random() > 0.22;
    const labels = isGood ? goodLabels : badLabels;
    const label = labels[Math.floor(Math.random() * labels.length)];
    state.items.push({
      x: 24 + Math.random() * Math.max(60, width - 118),
      y: -42,
      w: Math.max(76, Math.min(116, label.length * 8 + 34)),
      h: 34,
      vy: state.speed + Math.random() * 48 + Math.min(state.score * 0.7, 120),
      label,
      good: isGood,
      tilt: (Math.random() - 0.5) * 0.08,
    });
  };

  const setScore = (delta, good) => {
    if (good) {
      state.score += delta;
      state.streak += 1;
    } else {
      state.score = Math.max(0, state.score - 20);
      state.streak = 0;
    }
    if (state.score > state.best) {
      state.best = state.score;
      saveBestScore(state.best);
    }
    scoreNode.textContent = state.score.toLocaleString();
    streakNode.textContent = state.streak.toLocaleString();
    bestNode.textContent = state.best.toLocaleString();
  };

  const renderGame = (now) => {
    const rect = gameShell.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const dt = Math.min(32, now - (state.lastTime || now)) / 1000;
    state.lastTime = now;

    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.globalAlpha = 0.68;
    ctx.strokeStyle = "rgba(15, 95, 168, 0.08)";
    for (let x = 20; x < width; x += 34) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    ctx.strokeStyle = "rgba(15, 95, 168, 0.07)";
    for (let y = 20; y < height; y += 34) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    ctx.restore();

    if (state.running && now - state.lastSpawn > Math.max(430, 1050 - state.score * 2.1)) {
      spawnItem(width);
      state.lastSpawn = now;
    }

    state.trayX += (state.targetX - state.trayX) * Math.min(1, dt * 8);
    const compact = width < 480;
    const trayW = Math.min(compact ? 142 : 168, width * 0.42);
    const trayH = 28;
    const trayX = Math.max(16, Math.min(width - trayW - 16, state.trayX * width - trayW / 2));
    const trayY = height - (compact ? 64 : 92);

    state.items.forEach((item) => {
      if (state.running) item.y += item.vy * dt;
      ctx.save();
      ctx.translate(item.x + item.w / 2, item.y + item.h / 2);
      ctx.rotate(item.tilt);
      ctx.fillStyle = item.good ? "rgba(255, 255, 255, 0.94)" : "rgba(255, 238, 238, 0.96)";
      ctx.strokeStyle = item.good ? "rgba(15, 95, 168, 0.26)" : "rgba(255, 120, 120, 0.38)";
      ctx.lineWidth = 1;
      drawRoundRect(-item.w / 2, -item.h / 2, item.w, item.h, 10);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = item.good ? "#0f5fa8" : "#9a2b2b";
      ctx.font = `${compact ? "800 12px" : "800 13px"} Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(item.label, 0, 1);
      ctx.restore();
    });

    for (let i = state.items.length - 1; i >= 0; i -= 1) {
      const item = state.items[i];
      const caught = item.y + item.h > trayY && item.y < trayY + trayH && item.x + item.w > trayX && item.x < trayX + trayW;
      if (caught) {
        setScore(item.good ? 10 + Math.min(state.streak, 10) : 0, item.good);
        state.items.splice(i, 1);
      } else if (item.y > height + 60) {
        if (item.good) state.streak = 0;
        streakNode.textContent = state.streak.toLocaleString();
        state.items.splice(i, 1);
      }
    }

    ctx.save();
    ctx.shadowColor = "rgba(15, 95, 168, 0.28)";
    ctx.shadowBlur = 16;
    ctx.fillStyle = "#0f5fa8";
    drawRoundRect(trayX, trayY, trayW, trayH, 12);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#ffffff";
    ctx.font = `900 ${compact ? 11 : 13}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("FluidRWA Directory", trayX + trayW / 2, trayY + trayH / 2 + 1);
    ctx.restore();

    requestAnimationFrame(renderGame);
  };

  const updateTarget = (clientX) => {
    const rect = gameShell.getBoundingClientRect();
    state.targetX = (clientX - rect.left) / rect.width;
  };

  gameShell.addEventListener("pointermove", (event) => updateTarget(event.clientX));
  gameShell.addEventListener("pointerdown", (event) => {
    updateTarget(event.clientX);
    if (!state.running) startButton.click();
  });
  window.addEventListener("keydown", (event) => {
    if (!gameShell.matches(":hover") && document.activeElement !== startButton) return;
    if (event.key === "ArrowLeft") state.targetX = Math.max(0.08, state.targetX - 0.08);
    if (event.key === "ArrowRight") state.targetX = Math.min(0.92, state.targetX + 0.08);
  });
  startButton.addEventListener("click", () => {
    state.running = true;
    state.score = 0;
    state.streak = 0;
    state.items = [];
    state.lastSpawn = 0;
    state.speed = 96;
    scoreNode.textContent = "0";
    streakNode.textContent = "0";
    gameShell.classList.add("is-playing");
  });
  window.addEventListener("resize", resizeGame);
  resizeGame();
  requestAnimationFrame(renderGame);
}

const normalizeVendorText = (value) =>
  (value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9+]+/g, " ")
    .trim();

const vendorSearchStopWords = new Set([
  "a",
  "about",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "best",
  "can",
  "company",
  "companies",
  "do",
  "does",
  "find",
  "for",
  "from",
  "get",
  "help",
  "helps",
  "i",
  "in",
  "is",
  "it",
  "me",
  "need",
  "of",
  "on",
  "or",
  "our",
  "provider",
  "providers",
  "service",
  "services",
  "solution",
  "solutions",
  "that",
  "the",
  "to",
  "vendor",
  "vendors",
  "we",
  "what",
  "which",
  "who",
  "with"
]);

const vendorSearchAliases = new Map([
  ["auditor", "audit"],
  ["auditors", "audit"],
  ["auditing", "audit"],
  ["audits", "audit"],
  ["breach", "security"],
  ["breaches", "security"],
  ["bug", "security"],
  ["bugs", "security"],
  ["hack", "security"],
  ["hacked", "security"],
  ["hacks", "security"],
  ["protection", "security"],
  ["protect", "security"],
  ["protected", "security"],
  ["risk", "security"],
  ["risks", "security"],
  ["dora", "compliance"],
  ["mica", "compliance"],
  ["regulation", "compliance"],
  ["regulatory", "compliance"],
  ["aml", "compliance"],
  ["kyc", "identity"],
  ["screening", "identity"],
  ["verification", "identity"],
  ["wallet", "custody"],
  ["wallets", "custody"],
  ["custodian", "custody"],
  ["custodians", "custody"],
  ["stablecoin", "payments"],
  ["stablecoins", "payments"],
  ["onramp", "payments"],
  ["onramps", "payments"],
  ["offramp", "payments"],
  ["offramps", "payments"],
  ["fiat", "payments"],
  ["tokenise", "tokenization"],
  ["tokenised", "tokenization"],
  ["tokenize", "tokenization"],
  ["tokenized", "tokenization"],
  ["tokenizing", "tokenization"],
  ["rwa", "tokenization"],
  ["real", "tokenization"],
  ["estate", "tokenization"],
  ["contract", "smart"],
  ["contracts", "smart"],
  ["developer", "development"],
  ["developers", "development"],
  ["engineering", "development"],
  ["law", "legal"],
  ["lawyer", "legal"],
  ["lawyers", "legal"],
  ["marketing", "growth"],
  ["pr", "growth"],
  ["fundraising", "capital"],
  ["investor", "capital"],
  ["investors", "capital"]
]);

const tokenizeVendorSearch = (value) => {
  const normalized = normalizeVendorText(value);
  if (!normalized) return [];
  return normalized
    .split(/\s+/)
    .map((token) => vendorSearchAliases.get(token) || token)
    .filter((token) => token.length > 1 && !vendorSearchStopWords.has(token));
};

const matchesVendorSearch = (profile, query) => {
  const normalizedQuery = normalizeVendorText(query);
  if (!normalizedQuery) return true;
  if (profile.text.includes(normalizedQuery)) return true;

  const queryTokens = [...new Set(tokenizeVendorSearch(normalizedQuery))];
  if (!queryTokens.length) return true;

  const matched = queryTokens.filter((token) => profile.tokens.has(token) || profile.text.includes(token));
  if (matched.length === queryTokens.length) return true;
  if (queryTokens.length <= 3) return matched.length >= 1;
  return matched.length >= Math.min(3, queryTokens.length) || matched.length / queryTokens.length >= 0.45;
};

const inferVendorProfile = (card) => {
  const text = normalizeVendorText(`${card.dataset.search || ""} ${card.textContent || ""}`);
  const tokens = new Set(tokenizeVendorSearch(text));
  const location =
    card.querySelector('[itemprop="addressCountry"]')?.textContent?.trim() ||
    Array.from(card.querySelectorAll("dt"))
      .find((term) => normalizeVendorText(term.textContent) === "hq")
      ?.parentElement?.querySelector("dd")?.textContent?.trim() ||
    "Global";
  const regulatory = /(licensed|regulated|qualified|sec |finra|fca|mica|mas |bank grade|trust company|custodian)/.test(text)
    ? "licensed"
    : /(compliance|kyc|aml|sanctions|policy|audit|legal|regulatory)/.test(text)
      ? "compliance"
      : "not-stated";
  const budget = /(enterprise|institutional|bank|government|global|qualified|regulated|fortune|big four)/.test(text)
    ? "enterprise"
    : /(developer|startup|self serve|open source|community|boutique|smb|small business)/.test(text)
      ? "starter"
      : "growth";
  return { text, tokens, location, regulatory, budget };
};

const buildFilterSelect = (label, name, options) => {
  const wrapper = document.createElement("label");
  wrapper.className = "vendor-filter-field";
  wrapper.innerHTML = `<span>${label}</span><select data-vendor-${name}>${options
    .map(([value, text]) => `<option value="${value}">${text}</option>`)
    .join("")}</select>`;
  return wrapper;
};

const vendorSearch = document.querySelector("[data-vendor-search]");

if (vendorSearch) {
  const vendorCards = Array.from(document.querySelectorAll(".vendor-card"));
  const categoryLinks = Array.from(document.querySelectorAll("[data-filter]"));
  const categorySections = Array.from(document.querySelectorAll("[data-category-section]"));
  const countNode = document.querySelector("[data-vendor-count]");
  const profiles = new Map(vendorCards.map((card) => [card, inferVendorProfile(card)]));
  const controls = vendorSearch.closest(".vendor-controls");
  const filterBar = document.createElement("div");
  filterBar.className = "vendor-procurement-filters vendor-procurement-filters--ecosystem";
  const locations = [...new Set([...profiles.values()].map((profile) => profile.location).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b));
  const locationSelect = buildFilterSelect("Headquarters", "location", [["all", "All locations"], ...locations.map((location) => [normalizeVendorText(location), location])]);
  const regulatorySelect = buildFilterSelect("License / regulatory status", "regulatory", [["all", "All regulatory profiles"], ["licensed", "Licensed / regulated"], ["compliance", "Compliance-enabled"], ["not-stated", "Not stated"]]);
  const budgetSelect = buildFilterSelect("Typical engagement", "budget", [["all", "All budget ranges"], ["starter", "Starter / pilot"], ["growth", "Growth stage"], ["enterprise", "Enterprise"]]);
  const resetButton = document.createElement("button");
  resetButton.type = "button";
  resetButton.className = "vendor-filter-reset";
  resetButton.textContent = "Reset filters";
  filterBar.append(locationSelect, regulatorySelect, budgetSelect, resetButton);
  controls?.after(filterBar);
  const locationControl = locationSelect.querySelector("select");
  const regulatoryControl = regulatorySelect.querySelector("select");
  const budgetControl = budgetSelect.querySelector("select");
  let activeFilter = "all";

  const updateVendorDirectory = () => {
    const query = vendorSearch.value.trim().toLowerCase();
    let visibleCount = 0;

    vendorCards.forEach((card) => {
      const profile = profiles.get(card);
      const matchesCategory = activeFilter === "all" || card.dataset.category === activeFilter;
      const matchesSearch = matchesVendorSearch(profile, query);
      const matchesLocation = locationControl.value === "all" || normalizeVendorText(profile.location) === locationControl.value;
      const matchesRegulatory = regulatoryControl.value === "all" || profile.regulatory === regulatoryControl.value;
      const matchesBudget = budgetControl.value === "all" || profile.budget === budgetControl.value;
      const isVisible = matchesCategory && matchesSearch && matchesLocation && matchesRegulatory && matchesBudget;
      card.classList.toggle("is-hidden", !isVisible);
      if (isVisible) visibleCount += 1;
    });

    categorySections.forEach((section) => {
      const hasVisibleCards = Boolean(section.querySelector(".vendor-card:not(.is-hidden)"));
      const matchesActiveCategory = activeFilter === "all" || section.dataset.categorySection === activeFilter;
      section.classList.toggle("is-hidden", !hasVisibleCards || !matchesActiveCategory);
    });

    if (countNode) countNode.textContent = visibleCount.toLocaleString();
  };

  vendorSearch.addEventListener("input", updateVendorDirectory);
  [locationControl, regulatoryControl, budgetControl].forEach((control) => control.addEventListener("change", updateVendorDirectory));
  resetButton.addEventListener("click", () => {
    vendorSearch.value = "";
    locationControl.value = "all";
    regulatoryControl.value = "all";
    budgetControl.value = "all";
    activeFilter = "all";
    categoryLinks.forEach((item) => item.classList.toggle("is-active", item.dataset.filter === "all"));
    updateVendorDirectory();
  });

  categoryLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      activeFilter = link.dataset.filter || "all";
      categoryLinks.forEach((item) => item.classList.toggle("is-active", item === link));
      updateVendorDirectory();
      document.querySelector("#vendor-directory")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  document.querySelectorAll('a[href="#vendor-search"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const controls = vendorSearch.closest(".vendor-controls") || vendorSearch;
      const top = controls.getBoundingClientRect().top + window.scrollY - 120;
      window.history.pushState(null, "", "#vendor-search");
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      window.setTimeout(() => vendorSearch.focus({ preventScroll: true }), 500);
    });
  });

  updateVendorDirectory();
}

const providerDirectory = document.querySelector(".bc-provider-grid, .bc-company-grid");

if (providerDirectory) {
  const providerCards = Array.from(providerDirectory.querySelectorAll(".bc-provider-card, .bc-company-card"));
  const directorySection = providerDirectory.closest("#vendor-directory") || providerDirectory.closest(".bc-section");
  const directoryHead = directorySection?.querySelector(".bc-directory-head");
  const profiles = new Map(providerCards.map((card) => [card, inferVendorProfile(card)]));
  const locations = [...new Set([...profiles.values()].map((profile) => profile.location).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b));
  const panel = document.createElement("section");
  panel.className = "vendor-procurement-panel";
  panel.setAttribute("aria-label", "Vendor search and filters");
  panel.innerHTML = `
    <div class="vendor-procurement-intro">
      <p class="eyebrow light-eyebrow">Build your shortlist</p>
      <h3>Find providers that fit your project</h3>
      <p>Search the directory, narrow the shortlist, then share your requirements for a focused vendor path.</p>
    </div>
    <div class="vendor-procurement-search">
      <label class="vendor-filter-field vendor-filter-field--search"><span>Search providers</span><input type="search" data-provider-query placeholder="Company, service, use case or keyword"></label>
    </div>
    <div class="vendor-procurement-actions">
      <a href="/submit-requirement">Submit your requirements</a>
      <small>Budget and regulatory filters are discovery signals inferred from directory information. Verify directly with providers.</small>
    </div>`;
  const filters = document.createElement("div");
  filters.className = "vendor-procurement-filters";
  const locationSelect = buildFilterSelect("Headquarters", "location", [["all", "All locations"], ...locations.map((location) => [normalizeVendorText(location), location])]);
  const regulatorySelect = buildFilterSelect("License / regulatory status", "regulatory", [["all", "All regulatory profiles"], ["licensed", "Licensed / regulated"], ["compliance", "Compliance-enabled"], ["not-stated", "Not stated"]]);
  const budgetSelect = buildFilterSelect("Typical engagement", "budget", [["all", "All budget ranges"], ["starter", "Starter / pilot"], ["growth", "Growth stage"], ["enterprise", "Enterprise"]]);
  const resetButton = document.createElement("button");
  resetButton.type = "button";
  resetButton.className = "vendor-filter-reset";
  resetButton.textContent = "Reset filters";
  filters.append(locationSelect, regulatorySelect, budgetSelect, resetButton);
  panel.querySelector(".vendor-procurement-search").after(filters);
  directoryHead?.after(panel);

  const queryControl = panel.querySelector("[data-provider-query]");
  const locationControl = locationSelect.querySelector("select");
  const regulatoryControl = regulatorySelect.querySelector("select");
  const budgetControl = budgetSelect.querySelector("select");
  const status = document.createElement("p");
  status.className = "vendor-filter-status";
  status.setAttribute("aria-live", "polite");
  panel.after(status);

  const applyProviderFilters = () => {
    const query = normalizeVendorText(queryControl.value);
    let visibleCount = 0;
    providerCards.forEach((card) => {
      const profile = profiles.get(card);
      const matchesProcurement =
        (!query || profile.text.includes(query)) &&
        (locationControl.value === "all" || normalizeVendorText(profile.location) === locationControl.value) &&
        (regulatoryControl.value === "all" || profile.regulatory === regulatoryControl.value) &&
        (budgetControl.value === "all" || profile.budget === budgetControl.value);
      card.dataset.procurementHidden = String(!matchesProcurement);
      const visible = matchesProcurement && card.dataset.serviceHidden !== "true";
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    status.textContent = `${visibleCount.toLocaleString()} of ${providerCards.length.toLocaleString()} providers match your criteria`;
  };

  queryControl.addEventListener("input", applyProviderFilters);
  [locationControl, regulatoryControl, budgetControl].forEach((control) => control.addEventListener("change", applyProviderFilters));
  resetButton.addEventListener("click", () => {
    queryControl.value = "";
    locationControl.value = "all";
    regulatoryControl.value = "all";
    budgetControl.value = "all";
    applyProviderFilters();
  });
  applyProviderFilters();
}

const serviceAreaGrid = document.querySelector(".bc-area-grid");

if (serviceAreaGrid) {
  const serviceAreaCards = Array.from(serviceAreaGrid.querySelectorAll(".bc-area-card"));
  const providerCards = Array.from(document.querySelectorAll(".bc-provider-card, .bc-company-card"));
  const directorySection = document.querySelector("#vendor-directory");
  const directoryHead = directorySection?.querySelector(".bc-directory-head") || directorySection;

  const normalizeText = (value) =>
    (value || "")
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();

  const getCardServiceData = (card) => {
    const serviceLabels = Array.from(card.querySelectorAll("dt")).filter((term) =>
      normalizeText(term.textContent).includes("services")
    );
    const services = serviceLabels
      .map((term) => term.parentElement?.querySelector("dd")?.textContent || "")
      .join(" ");
    const serviceText = normalizeText(services);
    return {
      serviceText,
      fullText: normalizeText(`${card.dataset.search || ""} ${card.textContent || ""}`),
      hasServices: Boolean(serviceText),
    };
  };

  const getAreaMatch = (area) => {
    const title = area.querySelector("h3")?.textContent || area.id || "";
    const key = normalizeText(title);
    const tokens = key.split(" ").filter((token) => token.length > 3 && !["and", "with", "providers"].includes(token));
    const expectedCount = Number((area.querySelector("strong")?.textContent || "").match(/\d+/)?.[0] || 0);
    return { key, tokens, expectedCount };
  };

  const matchesArea = (cardData, areaMatch) => {
    if (!areaMatch.key) return true;
    const textToMatch = cardData.hasServices ? cardData.serviceText : cardData.fullText;
    if (textToMatch.includes(areaMatch.key)) return true;
    if (cardData.hasServices) return false;
    const hits = areaMatch.tokens.filter((token) => textToMatch.includes(token)).length;
    return hits >= Math.min(2, areaMatch.tokens.length || 1);
  };

  if (serviceAreaCards.length && providerCards.length) {
    const allButton = document.createElement("button");
    allButton.type = "button";
    allButton.className = "bc-area-filter-reset is-active";
    allButton.textContent = "Show all providers";
    allButton.setAttribute("aria-pressed", "true");
    serviceAreaGrid.before(allButton);

    const status = document.createElement("p");
    status.className = "bc-count";
    status.setAttribute("aria-live", "polite");
    status.hidden = true;
    directoryHead?.after(status);

    const applyServiceFilter = (activeArea) => {
      const areaMatch = activeArea ? getAreaMatch(activeArea) : null;
      let visibleCount = 0;
      let matchedCount = 0;

      providerCards.forEach((card) => {
        const isMatch = !areaMatch || matchesArea(getCardServiceData(card), areaMatch);
        matchedCount += isMatch && areaMatch ? 1 : 0;
        const matchesService = !areaMatch || (isMatch && (!areaMatch.expectedCount || matchedCount <= areaMatch.expectedCount));
        card.dataset.serviceHidden = String(!matchesService);
        const isVisible = matchesService && card.dataset.procurementHidden !== "true";
        card.hidden = !isVisible;
        if (isVisible) visibleCount += 1;
      });

      serviceAreaCards.forEach((area) => {
        const isActive = area === activeArea;
        area.classList.toggle("is-active", isActive);
        area.setAttribute("aria-pressed", String(isActive));
      });

      allButton.classList.toggle("is-active", !activeArea);
      allButton.setAttribute("aria-pressed", String(!activeArea));

      if (status) {
        status.hidden = !activeArea;
        status.textContent = activeArea
          ? `${visibleCount.toLocaleString()} providers shown for ${activeArea.querySelector("h3")?.textContent || "this service area"}`
          : "";
      }
    };

    allButton.addEventListener("click", () => {
      applyServiceFilter(null);
      directorySection?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    serviceAreaCards.forEach((area) => {
      area.tabIndex = 0;
      area.setAttribute("role", "button");
      area.setAttribute("aria-pressed", "false");
      area.addEventListener("click", () => {
        applyServiceFilter(area);
        directorySection?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      area.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        area.click();
      });
    });
  }
}
