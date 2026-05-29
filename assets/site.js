const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelector("[data-nav-links]");
const siteHeader = document.querySelector("[data-site-header]");

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
    visible: true,
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
    const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 640 ? 1.25 : 1.75);
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
    if (document.hidden || !state.visible || width < 24 || height < 24) {
      state.lastTime = now;
      window.setTimeout(() => requestAnimationFrame(renderGame), 180);
      return;
    }
    const dt = Math.min(32, now - (state.lastTime || now)) / 1000;
    state.lastTime = now;

    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.globalAlpha = 0.55;
    ctx.strokeStyle = "rgba(15, 95, 168, 0.10)";
    for (let x = 20; x < width; x += 36) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 20; y < height; y += 36) {
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
    const trayW = Math.min(168, width * 0.36);
    const trayH = 28;
    const trayX = Math.max(16, Math.min(width - trayW - 16, state.trayX * width - trayW / 2));
    const trayY = height - 92;

    state.items.forEach((item) => {
      if (state.running) item.y += item.vy * dt;
      ctx.save();
      ctx.translate(item.x + item.w / 2, item.y + item.h / 2);
      ctx.rotate(item.tilt);
      ctx.fillStyle = item.good ? "rgba(255, 253, 242, 0.94)" : "rgba(255, 238, 238, 0.94)";
      ctx.strokeStyle = item.good ? "rgba(15, 95, 168, 0.18)" : "rgba(170, 38, 38, 0.24)";
      ctx.lineWidth = 1;
      drawRoundRect(-item.w / 2, -item.h / 2, item.w, item.h, 10);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = item.good ? "#0f5fa8" : "#9a2b2b";
      ctx.font = "800 13px Arial";
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
    ctx.shadowColor = "rgba(15, 95, 168, 0.24)";
    ctx.shadowBlur = 16;
    ctx.fillStyle = "#0f5fa8";
    drawRoundRect(trayX, trayY, trayW, trayH, 12);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#fff7d1";
    ctx.font = "900 13px Arial";
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
  if ("IntersectionObserver" in window) {
    const gameObserver = new IntersectionObserver((entries) => {
      state.visible = entries.some((entry) => entry.isIntersecting);
    }, { threshold: 0.05 });
    gameObserver.observe(gameShell);
  }
  resizeGame();
  requestAnimationFrame(renderGame);
}

const vendorSearch = document.querySelector("[data-vendor-search]");

if (vendorSearch) {
  const vendorCards = Array.from(document.querySelectorAll(".vendor-card"));
  const categoryLinks = Array.from(document.querySelectorAll("[data-filter]"));
  const categorySections = Array.from(document.querySelectorAll("[data-category-section]"));
  const countNode = document.querySelector("[data-vendor-count]");
  let activeFilter = "all";

  const updateVendorDirectory = () => {
    const query = vendorSearch.value.trim().toLowerCase();
    let visibleCount = 0;

    vendorCards.forEach((card) => {
      const matchesCategory = activeFilter === "all" || card.dataset.category === activeFilter;
      const matchesSearch = !query || (card.dataset.search || "").includes(query);
      const isVisible = matchesCategory && matchesSearch;
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

document.querySelectorAll("[data-blog-tools]").forEach((tools) => {
  const search = tools.querySelector("[data-blog-search]");
  const tabs = Array.from(tools.querySelectorAll("[data-blog-category]"));
  const grid = document.querySelector("[data-blog-grid]");
  const cards = grid ? Array.from(grid.querySelectorAll("[data-blog-card]")) : [];
  const empty = tools.querySelector("[data-blog-empty]");
  let activeCategory = "all";

  const updateBlogCards = () => {
    const query = (search?.value || "").trim().toLowerCase();
    let visible = 0;

    cards.forEach((card) => {
      const category = card.dataset.category || "";
      const text = card.dataset.search || "";
      const matchesCategory = activeCategory === "all" || category === activeCategory;
      const matchesQuery = !query || text.includes(query);
      const shouldShow = matchesCategory && matchesQuery;
      card.hidden = !shouldShow;
      if (shouldShow) visible += 1;
    });

    if (empty) empty.hidden = visible !== 0;
  };

  search?.addEventListener("input", updateBlogCards);
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activeCategory = tab.dataset.blogCategory || "all";
      tabs.forEach((item) => item.classList.toggle("is-active", item === tab));
      updateBlogCards();
    });
  });

  updateBlogCards();
});

const arcadeShell = document.querySelector(".arcade-shell");

if (arcadeShell) {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const shuffle = (items) => [...items].sort(() => Math.random() - 0.5);
  const getStorage = (key, fallback = "--") => {
    try {
      return localStorage.getItem(key) || fallback;
    } catch (error) {
      return fallback;
    }
  };
  const setStorage = (key, value) => {
    try {
      localStorage.setItem(key, String(value));
    } catch (error) {
      // Storage can be unavailable in private browsing; the game still works without it.
    }
  };

  $$(".arcade-tab", arcadeShell).forEach((tab) => {
    tab.addEventListener("click", () => {
      $$(".arcade-tab", arcadeShell).forEach((item) => item.setAttribute("aria-selected", String(item === tab)));
      $$(".game-panel", arcadeShell).forEach((panel) => panel.classList.toggle("active", panel.dataset.gamePanel === tab.dataset.gameTab));
    });
  });

  const prompts = [
    ["A real estate firm wants fractional ownership, investor onboarding, and ownership records.", "Tokenization Platforms"],
    ["A wallet needs users to buy crypto with cards and local bank methods.", "Fiat On & Off Ramps"],
    ["A fund needs qualified asset safekeeping, wallet policies, and treasury approvals.", "Custody Solutions"],
    ["A marketplace must screen sanctions, wallets, and suspicious transactions.", "Compliance Infrastructure"],
    ["A protocol needs contracts designed, tested, deployed, and maintained.", "Smart Contract Development"],
    ["A tokenized fund needs counsel for securities, fund structure, and cross-border rules.", "Legal & Regulatory"],
    ["A digital asset app needs identity checks, KYC, AML, and user verification.", "KYC / AML Providers"],
    ["A company wants analytics, automation, and intelligent tooling for Web3 operations.", "AI Infrastructure"],
    ["A platform needs stablecoin settlement, merchant payments, and treasury movement.", "Payments & Stablecoins"],
    ["An issuer needs audit support, penetration testing, and incident monitoring.", "Security & Audits"]
  ];
  const categories = ["Tokenization Platforms", "Fiat On & Off Ramps", "Custody Solutions", "Compliance Infrastructure", "Smart Contract Development", "Legal & Regulatory", "KYC / AML Providers", "AI Infrastructure", "Payments & Stablecoins", "Security & Audits"];
  const match = { score: 0, streak: 0, time: 45, round: 0, active: false, current: null, timer: null };
  const renderMatch = () => {
    $("[data-match-score]") && ($("[data-match-score]").textContent = match.score);
    $("[data-match-streak]") && ($("[data-match-streak]").textContent = match.streak);
    $("[data-match-time]") && ($("[data-match-time]").textContent = match.time);
    $("[data-match-round]") && ($("[data-match-round]").textContent = match.active ? `Round ${match.round}` : "Ready");
  };
  const nextMatch = () => {
    match.round += 1;
    match.current = prompts[Math.floor(Math.random() * prompts.length)];
    const options = shuffle([match.current[1], ...shuffle(categories.filter((category) => category !== match.current[1])).slice(0, 3)]);
    const scenario = $("[data-match-scenario]");
    const grid = $("[data-match-choices]");
    if (!scenario || !grid) return;
    scenario.textContent = match.current[0];
    grid.innerHTML = "";
    options.forEach((option) => {
      const button = document.createElement("button");
      button.className = "game-btn";
      button.type = "button";
      button.textContent = option;
      button.addEventListener("click", () => {
        if (!match.active) return;
        const correct = option === match.current[1];
        button.classList.add(correct ? "correct" : "wrong");
        if (correct) {
          match.streak += 1;
          match.score += 10 + Math.min(match.streak * 2, 20);
          match.time = Math.min(60, match.time + 2);
          $("[data-match-feedback]").textContent = `Correct. ${match.current[1]} is the best category.`;
        } else {
          match.streak = 0;
          match.time = Math.max(0, match.time - 4);
          $("[data-match-feedback]").textContent = `Close. This points to ${match.current[1]}.`;
        }
        renderMatch();
        window.setTimeout(() => match.active && nextMatch(), 420);
      });
      grid.appendChild(button);
    });
    renderMatch();
  };
  $("[data-match-start]")?.addEventListener("click", () => {
    clearInterval(match.timer);
    Object.assign(match, { score: 0, streak: 0, time: 45, round: 0, active: true });
    $("[data-match-start]").textContent = "Restart";
    $("[data-match-feedback]").textContent = "Pick quickly. Correct answers add points and time.";
    nextMatch();
    match.timer = window.setInterval(() => {
      match.time -= 1;
      renderMatch();
      if (match.time <= 0) {
        match.active = false;
        clearInterval(match.timer);
        $("[data-match-feedback]").textContent = `Sprint complete. Final score: ${match.score}.`;
        $("[data-match-start]").textContent = "Play Again";
        $("[data-match-choices]").innerHTML = "";
        renderMatch();
      }
    }, 1000);
  });
  renderMatch();

  const stackOrder = ["Legal & Regulatory", "Tokenization Platforms", "KYC / AML Providers", "Custody Solutions", "Payments & Stablecoins", "Compliance Infrastructure"];
  const stack = { step: 0, score: 0 };
  const renderStack = () => {
    $("[data-stack-built]").textContent = stack.step;
    $("[data-stack-step]").textContent = Math.min(stack.step + 1, stackOrder.length);
    $("[data-stack-score]").textContent = stack.score;
    const grid = $("[data-stack-choices]");
    if (!grid) return;
    grid.innerHTML = "";
    shuffle(stackOrder).forEach((label) => {
      const button = document.createElement("button");
      button.className = "game-btn";
      button.type = "button";
      button.textContent = label;
      button.disabled = stack.step >= stackOrder.length;
      button.addEventListener("click", () => {
        const correct = label === stackOrder[stack.step];
        button.classList.add(correct ? "correct" : "wrong");
        if (correct) {
          stack.step += 1;
          stack.score += 15;
          $("[data-stack-feedback]").textContent = stack.step === stackOrder.length ? "Stack complete. That is a launch-ready path." : `Good. Next add ${stackOrder[stack.step]}.`;
        } else {
          stack.score = Math.max(0, stack.score - 5);
          $("[data-stack-feedback]").textContent = `Not yet. The next layer should be ${stackOrder[stack.step]}.`;
        }
        window.setTimeout(renderStack, 360);
      });
      grid.appendChild(button);
    });
  };
  $("[data-stack-start]")?.addEventListener("click", () => {
    stack.step = 0;
    stack.score = 0;
    $("[data-stack-feedback]").textContent = "Start with structure, then onboarding, asset safety, money movement and reporting.";
    renderStack();
  });
  renderStack();

  const riskControls = ["Sanctions Screening", "Wallet Monitoring", "KYC Check", "Transfer Rules", "Audit Trail", "PEP Screening"];
  const riskNoise = ["Logo Refresh", "Discord Emoji", "Meme Contest", "Hero Gradient", "Sticker Pack", "Mascot Name"];
  const risk = { score: 0, round: 1, lives: 3 };
  const renderRisk = () => {
    $("[data-risk-score]").textContent = risk.score;
    $("[data-risk-round]").textContent = risk.round;
    $("[data-risk-lives]").textContent = risk.lives;
    const grid = $("[data-risk-choices]");
    if (!grid) return;
    grid.innerHTML = "";
    shuffle([...shuffle(riskControls).slice(0, 4), ...shuffle(riskNoise).slice(0, 2)]).forEach((label) => {
      const button = document.createElement("button");
      button.className = "game-btn";
      button.type = "button";
      button.textContent = label;
      button.addEventListener("click", () => {
        const correct = riskControls.includes(label);
        button.classList.add(correct ? "correct" : "wrong");
        button.disabled = true;
        if (correct) {
          risk.score += 10;
          $("[data-risk-feedback]").textContent = `Caught: ${label}.`;
        } else {
          risk.lives -= 1;
          $("[data-risk-feedback]").textContent = "Noise. Save attention for compliance controls.";
          if (risk.lives <= 0) {
            risk.score = 0;
            risk.lives = 3;
            risk.round = 1;
            $("[data-risk-feedback]").textContent = "Reset. Compliance teams need precision.";
          }
        }
        $("[data-risk-score]").textContent = risk.score;
        $("[data-risk-lives]").textContent = risk.lives;
      });
      grid.appendChild(button);
    });
  };
  $("[data-risk-next]")?.addEventListener("click", () => {
    risk.round += 1;
    renderRisk();
  });
  renderRisk();

  const memoryPairs = [["KYC", "Verify users"], ["Custody", "Safekeep assets"], ["Legal", "Structure offering"], ["Payments", "Move money"], ["Audits", "Secure code"], ["AI", "Automate analysis"]];
  let memory = { first: null, lock: false, pairs: 0, moves: 0 };
  const renderMemory = () => {
    memory = { first: null, lock: false, pairs: 0, moves: 0 };
    $("[data-memory-pairs]").textContent = "0";
    $("[data-memory-moves]").textContent = "0";
    $("[data-memory-best]").textContent = getStorage("fluidrwaMemoryBest");
    $("[data-memory-feedback]").textContent = "Flip two cards. Match each vendor category with its buyer need.";
    const grid = $("[data-memory-grid]");
    if (!grid) return;
    grid.innerHTML = "";
    shuffle(memoryPairs.flatMap(([label, need], index) => [{ text: label, pair: index }, { text: need, pair: index }])).forEach((card) => {
      const button = document.createElement("button");
      button.className = "memory-card";
      button.type = "button";
      button.textContent = "?";
      button.dataset.text = card.text;
      button.dataset.pair = String(card.pair);
      button.addEventListener("click", () => {
        if (memory.lock || button.classList.contains("matched") || button.classList.contains("revealed")) return;
        button.classList.add("revealed");
        button.textContent = button.dataset.text;
        if (!memory.first) {
          memory.first = button;
          return;
        }
        memory.moves += 1;
        $("[data-memory-moves]").textContent = memory.moves;
        const correct = memory.first.dataset.pair === button.dataset.pair;
        if (correct) {
          memory.first.classList.add("matched");
          button.classList.add("matched");
          memory.pairs += 1;
          $("[data-memory-pairs]").textContent = memory.pairs;
          $("[data-memory-feedback]").textContent = "Matched.";
          memory.first = null;
          if (memory.pairs === memoryPairs.length) {
            const best = getStorage("fluidrwaMemoryBest", "");
            if (!best || memory.moves < Number(best)) {
              setStorage("fluidrwaMemoryBest", memory.moves);
              $("[data-memory-best]").textContent = memory.moves;
            }
            $("[data-memory-feedback]").textContent = `Board complete in ${memory.moves} moves.`;
          }
        } else {
          memory.lock = true;
          $("[data-memory-feedback]").textContent = "Not a pair. Try the ecosystem logic.";
          window.setTimeout(() => {
            memory.first.classList.remove("revealed");
            button.classList.remove("revealed");
            memory.first.textContent = "?";
            button.textContent = "?";
            memory.first = null;
            memory.lock = false;
          }, 560);
        }
      });
      grid.appendChild(button);
    });
  };
  $("[data-memory-reset]")?.addEventListener("click", renderMemory);
  renderMemory();
}

document.querySelectorAll("[data-bc-search]").forEach((input) => {
  const section = input.closest(".bc-section");
  if (!section) return;
  const cards = Array.from(section.querySelectorAll(".bc-company-card"));
  const countNode = section.querySelector("[data-bc-count]");
  const updateDirectory = () => {
    const query = input.value.trim().toLowerCase();
    let count = 0;
    cards.forEach((card) => {
      const isVisible = !query || (card.dataset.search || "").includes(query);
      card.hidden = !isVisible;
      if (isVisible) count += 1;
    });
    if (countNode) countNode.textContent = count.toLocaleString();
  };
  input.addEventListener("input", updateDirectory);
  updateDirectory();
});

const sendAnalyticsEvent = (eventName, params = {}) => {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, {
    page_path: window.location.pathname + window.location.search,
    page_title: document.title,
    ...params
  });
};

document.addEventListener("click", (event) => {
  const link = event.target.closest?.("a[href]");
  if (!link) return;
  const href = link.getAttribute("href") || "";
  const text = (link.textContent || link.getAttribute("aria-label") || "").trim().slice(0, 120);
  const isExternal = /^https?:\/\//i.test(href) && !href.includes("fluidrwa.com");
  const isVendorLink = link.classList.contains("bc-company-link") || link.classList.contains("bc-provider-link");
  const isCta = link.classList.contains("btn") || link.classList.contains("nav-ecosystem-cta") || /submit-project|apply-as-vendor|contact/i.test(href);

  if (isVendorLink || isExternal) {
    sendAnalyticsEvent("vendor_outbound_click", {
      link_url: href,
      link_text: text,
      outbound: true
    });
    return;
  }

  if (isCta) {
    sendAnalyticsEvent("cta_click", {
      link_url: href,
      link_text: text
    });
    return;
  }

  sendAnalyticsEvent("internal_link_click", {
    link_url: href,
    link_text: text
  });
});

document.addEventListener("submit", (event) => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;
  sendAnalyticsEvent("form_submit_attempt", {
    form_id: form.id || "",
    form_name: form.getAttribute("name") || "",
    form_action: form.getAttribute("action") || ""
  });
});

document.addEventListener("click", (event) => {
  const button = event.target.closest?.("#zcWebOptin, [name='SIGNUP_SUBMIT_BUTTON']");
  if (!button) return;
  sendAnalyticsEvent("form_submit_attempt", {
    form_id: button.closest("form")?.id || "zoho-optin",
    form_name: "FluidRWA form",
    form_action: button.closest("form")?.getAttribute("action") || ""
  });
});
