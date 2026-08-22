const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelector("[data-nav-links]");
const siteHeader = document.querySelector("[data-site-header]");

const leadConversionForms = document.querySelectorAll(".fluid-intake-form");

const trackFluidRwaEvent = (eventName, params = {}) => {
  if (typeof window.fluidRwaTrackEvent === "function") {
    window.fluidRwaTrackEvent(eventName, params);
    return;
  }
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, {
      page_path: window.location.pathname,
      page_location: window.location.href,
      engagement_source: "fluidrwa_static",
      ...params,
    });
  }
};

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

const hydratePaidVendorContext = () => {
  if (!window.location.pathname.includes("apply-as-vendor")) return;

  const params = new URLSearchParams(window.location.search);
  const subscription = params.get("subscription") || "";
  const payment = params.get("payment") || "";
  const plan = params.get("plan") || "";
  const membership = params.get("membership") || "";
  const txnid = params.get("txnid") || "";
  const payuId = params.get("payu_id") || "";
  const amount = params.get("amount") || "";
  const currency = params.get("currency") || "";
  const status = params.get("status") || "";
  if (!subscription && !payment && !plan && !membership && !txnid && !payuId) return;

  const setValue = (name, value) => {
    const field = document.querySelector(`[name="${name}"]`);
    if (field) field.value = value;
  };

  setValue("PAYPAL_SUBSCRIPTION_ID", subscription);
  setValue("PAYMENT_PROVIDER", payment || "paypal");
  setValue("PAYMENT_STATUS", status || (subscription ? "subscription-approved-before-form" : txnid || payuId ? "payment-returned-before-form" : "payment-started"));
  setValue("MEMBERSHIP_PLAN", plan || membership || "vetted-vendor-monthly");
  setValue("PAYU_TRANSACTION_ID", txnid);
  setValue("PAYU_PAYMENT_ID", payuId);
  setValue("PAYU_AMOUNT", amount);
  setValue("PAYU_CURRENCY", currency || (amount ? "INR" : ""));
  setValue("REQUEST_SOURCE", "paid-vendor-membership");

  const context = document.querySelector("[data-paid-vendor-context]");
  if (context) {
    if (payment === "payu" && (txnid || payuId)) {
      const amountText = amount ? ` for ${currency || "INR"} ${amount}` : "";
      context.textContent = `Payment returned from PayU${amountText}${txnid ? `, transaction ${txnid}` : payuId ? `, payment ID ${payuId}` : ""}. Complete this profile so FluidRWA can save your listing details and activate the review.`;
    } else if (subscription) {
      context.textContent = `Payment received via PayPal subscription ${subscription}. Complete this profile so FluidRWA can activate the review.`;
    } else {
      context.textContent = "After payment, complete this profile so FluidRWA can match your paid membership request with your vendor details.";
    }
  }
};

hydratePaidVendorContext();

const vendorContactState = {
  vendorName: "",
  vendorCategory: "",
  source: "vendor-contact-modal",
  pageUrl: window.location.href,
};

const contactCopy = {
  project: {
    eyebrow: "Project intake",
    title: "Tell FluidRWA what you are building",
    body: "Share your project, stage, geography and vendor need. FluidRWA will review it and route the next step.",
    source: "contact-project",
    button: "Submit Project",
    description: "Project type, stage, vendor categories, region, timeline and any important requirements.",
  },
  vendor: {
    eyebrow: "Vendor listing",
    title: "Become a Vetted Listing",
    body: "Share your company category, proof points, buyer fit and regions served. Vendor and project listings require a paid membership before review is activated.",
    source: "contact-vendor",
    button: "Become a Vetted Listing",
    description: "Company category, services, ideal customers, regions served and why your company should be listed.",
  },
  general: {
    eyebrow: "General inquiry",
    title: "Send a note to FluidRWA",
    body: "Use this for partnerships, corrections, media, ecosystem updates or anything that does not fit project/vendor intake.",
    source: "contact-general",
    button: "Send Inquiry",
    description: "How can FluidRWA help?",
  },
};

const setContactFormPath = (mode) => {
  const config = contactCopy[mode] || contactCopy.project;
  const shell = document.querySelector("[data-contact-router]");
  const form = document.querySelector("[data-contact-form]");
  if (!shell || !form) return;

  shell.dataset.activePath = mode;
  form.dataset.formType = mode === "vendor" ? "vendor" : "project";
  form.querySelector("[data-contact-eyebrow]").textContent = config.eyebrow;
  form.querySelector("[data-contact-title]").textContent = config.title;
  form.querySelector("[data-contact-body]").textContent = config.body;
  form.querySelector('input[name="REQUEST_SOURCE"]').value = config.source;
  form.querySelector('textarea[name="CONTACT_CF1"]').placeholder = config.description;
  form.querySelector('button[type="submit"]').textContent = config.button;
  form.querySelectorAll("[data-contact-path]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.contactPath === mode);
    button.setAttribute("aria-pressed", String(button.dataset.contactPath === mode));
  });
};

document.querySelectorAll("[data-contact-path]").forEach((button) => {
  button.addEventListener("click", () => setContactFormPath(button.dataset.contactPath || "project"));
});

if (document.querySelector("[data-contact-router]")) {
  const params = new URLSearchParams(window.location.search);
  setContactFormPath(params.get("path") || "project");
}

leadConversionForms.forEach((form) => {
  const formRenderedAt = Date.now();
  const frameName = form.getAttribute("target");
  const status = form.querySelector("[data-form-status]");
  const button = form.querySelector('button[type="submit"]');
  const defaultButtonText = button?.textContent || "Submit";
  const getIsVendorForm = () =>
    frameName === "fluidVendorSubmit" || form.dataset.formType === "vendor" || window.location.pathname.includes("apply-as-vendor");

  const formValue = (formData, name) => String(formData.get(name) || "").trim();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const isVendorForm = getIsVendorForm();
    const isReviewApplication = form.dataset.reviewApplication === "true";
    const requestSource = form.querySelector('input[name="REQUEST_SOURCE"]')?.value || "";
    const isGeneralInquiry = requestSource === "contact-general";
    const isListingSubmission = isVendorForm || requestSource === "submit-project-listing";
    if (button) {
      button.disabled = true;
      button.textContent = "Submitting...";
    }
    if (status) {
      status.className = "form-status is-loading";
      status.textContent = isListingSubmission ? "Saving your listing details..." : isGeneralInquiry ? "Sending your inquiry..." : "Submitting your requirements...";
    }

    const params = new URLSearchParams(window.location.search);
    const formData = new FormData(form);
    formData.set("FORM_RENDERED_AT", String(formRenderedAt));
    formData.set("FORM_ELAPSED_MS", String(Date.now() - formRenderedAt));
    formData.set("WEBSITE_URL", "");
    const companyName = formValue(formData, "COMPANYNAME");
    const payload = {
      vendorName: formValue(formData, "VENDOR_NAME") || params.get("vendor") || (isVendorForm ? companyName : ""),
      vendorCategory: formValue(formData, "VENDOR_CATEGORY") || params.get("category") || "",
      source: formValue(formData, "REQUEST_SOURCE") || params.get("source") || (isVendorForm ? "vendor-waitlist" : "submit-requirement"),
      pageUrl: window.location.href,
      leadSource: formValue(formData, "LEAD_SOURCE"),
      contactEmail: formValue(formData, "CONTACT_EMAIL"),
      firstName: formValue(formData, "FIRSTNAME"),
      lastName: formValue(formData, "LASTNAME"),
      title: formValue(formData, "TITLE"),
      companyName,
      phone: formValue(formData, "PHONE"),
      country: formValue(formData, "COUNTRY"),
      website: formValue(formData, "WEBSITE"),
      linkedin: formValue(formData, "LINKEDIN_HANDLE"),
      projectDescription: formValue(formData, "CONTACT_CF1"),
      paypalSubscriptionId: formValue(formData, "PAYPAL_SUBSCRIPTION_ID"),
      payuTransactionId: formValue(formData, "PAYU_TRANSACTION_ID"),
      payuPaymentId: formValue(formData, "PAYU_PAYMENT_ID"),
      membershipPlan: formValue(formData, "MEMBERSHIP_PLAN"),
      paymentProvider: formValue(formData, "PAYMENT_PROVIDER"),
      paymentStatus: formValue(formData, "PAYMENT_STATUS") || (isReviewApplication ? "review-pending" : isListingSubmission ? "unpaid" : ""),
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
      if (button) button.textContent = "Submitted";
      if (status) {
        status.className = "form-status is-success";
        status.textContent = isReviewApplication
          ? "Thank you. Your application has been received for review. If approved, FluidRWA will contact you with the appropriate visibility options."
          : isListingSubmission
          ? "Thank you. Your listing details have been saved. Choose a paid membership plan to activate review."
          : isGeneralInquiry
            ? "Thank you. Your inquiry has been received."
            : "Thank you. Your project requirements have been received.";
      }
      const hasPaymentReference = Boolean(
        payload.paypalSubscriptionId ||
          payload.payuTransactionId ||
          payload.payuPaymentId ||
          payload.paymentProvider ||
          payload.paymentStatus === "paid" ||
          payload.paymentStatus === "payment-returned-before-form" ||
          payload.paymentStatus === "subscription-approved-before-form"
      );
      if (isListingSubmission && !isReviewApplication && !hasPaymentReference) {
        const membershipUrl = `/vendor-membership?source=${encodeURIComponent(payload.source || "vendor-submission")}&status=unpaid#pricing`;
        window.setTimeout(() => {
          window.location.href = membershipUrl;
        }, 1200);
      }
      const eventName = isVendorForm
        ? "vendor_application_submitted"
        : isGeneralInquiry
          ? "contact_form_submitted"
          : payload.vendorName || payload.vendorCategory
            ? "vendor_intro_requested"
            : "project_requirement_submitted";
      trackFluidRwaEvent(eventName, {
        form_type: isVendorForm ? "vendor" : "project",
        request_source: payload.source,
        vendor_name: payload.vendorName || undefined,
        vendor_category: payload.vendorCategory || undefined,
        country: payload.country || undefined,
        has_company: Boolean(payload.companyName),
        has_phone: Boolean(payload.phone),
      });
      window.fluidRwaReportLeadConversion?.();
    } catch (error) {
      if (button) {
        button.disabled = false;
        button.textContent = defaultButtonText;
      }
      if (status) {
        status.className = "form-status is-error";
        status.textContent = error instanceof Error ? error.message : "Your request could not be saved. Please try again.";
      }
    }
  });
});

const getVendorCategoryLabel = (card) => {
  const explicit = card.dataset.vendorCategory || card.dataset.category;
  if (explicit) return explicit.replace(/[-_]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
  const section = card.closest("section");
  return (
    section?.querySelector(".bc-directory-head h2, .solutions-section-head h2, .vendor-category-head h2")?.textContent?.trim() ||
    document.querySelector("h1")?.textContent?.trim() ||
    "Vendor Directory"
  );
};

const getVendorName = (card) =>
  card.querySelector('[itemprop="name"], h3, h2')?.textContent?.trim().replace(/\s+/g, " ") || "this company";

const escapeHtml = (value) =>
  String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const openVendorContactModal = ({ vendorName, vendorCategory, source }) => {
  vendorContactState.vendorName = vendorName || "";
  vendorContactState.vendorCategory = vendorCategory || "";
  vendorContactState.source = source || "vendor-contact-modal";
  vendorContactState.pageUrl = window.location.href;
  const safeVendorName = escapeHtml(vendorContactState.vendorName);
  const safeVendorCategory = escapeHtml(vendorContactState.vendorCategory);

  document.querySelector("[data-vendor-contact-modal]")?.remove();
  const overlay = document.createElement("div");
  overlay.className = "vendor-contact-overlay";
  overlay.dataset.vendorContactModal = "true";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-labelledby", "vendor-contact-title");
  overlay.innerHTML = `
    <div class="vendor-contact-dialog">
      <button type="button" class="vendor-contact-close" data-vendor-contact-close aria-label="Close contact form">×</button>
      <div class="vendor-contact-copy">
        <p class="eyebrow light-eyebrow">Contact request</p>
        <h2 id="vendor-contact-title">Contact ${safeVendorName}</h2>
        <p>Share your project context.</p>
        <div class="vendor-contact-target">
          <span>Selected company</span>
          <strong>${safeVendorName}</strong>
          <small>${safeVendorCategory}</small>
        </div>
      </div>
      <form class="contact-form vendor-contact-form" data-vendor-contact-form>
        <label>Work Email<input name="CONTACT_EMAIL" type="email" autocomplete="email" required></label>
        <div class="form-two-col">
          <label>First Name<input name="FIRSTNAME" autocomplete="given-name" required></label>
          <label>Last Name<input name="LASTNAME" autocomplete="family-name" required></label>
        </div>
        <div class="form-two-col">
          <label>Title<input name="TITLE" autocomplete="organization-title"></label>
          <label>Company Name<input name="COMPANYNAME" autocomplete="organization" required></label>
        </div>
        <div class="form-two-col">
          <label>Phone<input name="PHONE" autocomplete="tel"></label>
          <label>Country<input name="COUNTRY" autocomplete="country-name"></label>
        </div>
        <label>Website<input name="WEBSITE" type="url" autocomplete="url" placeholder="https://"></label>
        <label>LinkedIn<input name="LINKEDIN_HANDLE" autocomplete="url" placeholder="https://www.linkedin.com/in/..."></label>
        <label>What do you need from ${safeVendorName}?<textarea name="CONTACT_CF1" required placeholder="Project type, expected timeline, geography, budget stage and what you want to discuss."></textarea></label>
        <button class="btn btn-primary light-primary" type="submit">Send Contact Request</button>
        <div class="form-status" role="status" aria-live="polite" data-form-status></div>
      </form>
    </div>`;
  document.body.appendChild(overlay);
  document.body.classList.add("has-vendor-contact-modal");
  overlay.querySelector("input")?.focus();

  const closeModal = () => {
    overlay.remove();
    document.body.classList.remove("has-vendor-contact-modal");
  };

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay || event.target.closest("[data-vendor-contact-close]")) closeModal();
  });

  overlay.querySelector("[data-vendor-contact-form]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const status = form.querySelector("[data-form-status]");
    const button = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    const formValue = (name) => String(formData.get(name) || "").trim();
    button.disabled = true;
    button.textContent = "Sending request...";
    status.className = "form-status is-loading";
    status.textContent = "Saving your request to FluidRWA...";

    const payload = {
      vendorName: vendorContactState.vendorName,
      vendorCategory: vendorContactState.vendorCategory,
      source: vendorContactState.source,
      pageUrl: vendorContactState.pageUrl,
      leadSource: "Vendor contact modal",
      contactEmail: formValue("CONTACT_EMAIL"),
      firstName: formValue("FIRSTNAME"),
      lastName: formValue("LASTNAME"),
      title: formValue("TITLE"),
      companyName: formValue("COMPANYNAME"),
      phone: formValue("PHONE"),
      country: formValue("COUNTRY"),
      website: formValue("WEBSITE"),
      linkedin: formValue("LINKEDIN_HANDLE"),
      projectDescription: formValue("CONTACT_CF1"),
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
      status.className = "form-status is-success";
      status.textContent = `Saved. FluidRWA received your request for ${vendorContactState.vendorName}.`;
      button.textContent = "Request Sent";
      window.fluidRwaReportLeadConversion?.();
    } catch (error) {
      button.disabled = false;
      button.textContent = "Send Contact Request";
      status.className = "form-status is-error";
      status.textContent = error instanceof Error ? error.message : "Your request could not be saved. Please try again.";
    }
  });
};

const enhanceVendorContactButtons = () => {
  const cards = Array.from(document.querySelectorAll(".vendor-card, .bc-company-card, .bc-provider-card"));
  cards.forEach((card) => {
    card.querySelectorAll("[data-vendor-share-trigger]").forEach((button) => button.remove());
    if (card.querySelector("[data-vendor-contact-trigger]")) return;
    const vendorName = getVendorName(card);
    const category = getVendorCategoryLabel(card);
    const actionWrap = document.createElement("div");
    actionWrap.className = "vendor-card-actions";

    if (!card.querySelector("[data-vendor-contact-trigger]")) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "vendor-contact-trigger";
      button.dataset.vendorContactTrigger = "true";
      button.dataset.vendorName = vendorName;
      button.dataset.vendorCategory = category;
      button.textContent = `Contact ${vendorName}`;
      button.addEventListener("click", () => {
        trackFluidRwaEvent("vendor_contact_clicked", {
          vendor_name: vendorName,
          vendor_category: category,
          source: "vendor-card-contact",
        });
        openVendorContactModal({ vendorName, vendorCategory: category, source: "vendor-card-contact" });
      });
      actionWrap.appendChild(button);
    }

    const profileLink = card.querySelector(".bc-profile-link, .bc-provider-link, .bc-visit, .vendor-card-top a");
    if (profileLink?.parentElement === card) {
      profileLink.insertAdjacentElement("afterend", actionWrap);
    } else {
      const cardTags = card.querySelector(".bc-company-tags, .bc-tags, .vendor-tags");
      if (cardTags) {
        cardTags.insertAdjacentElement("afterend", actionWrap);
      } else {
        card.appendChild(actionWrap);
      }
    }
  });

  document.querySelectorAll('a[href*="/submit-requirement?vendor="]').forEach((link) => {
    if (link.dataset.vendorContactLink === "true") return;
    link.dataset.vendorContactLink = "true";
    const url = new URL(link.getAttribute("href"), window.location.origin);
    const vendorName = url.searchParams.get("vendor") || link.textContent?.replace(/^Contact|^Request Intro/i, "").trim() || "this company";
    const category = url.searchParams.get("category") || document.querySelector("h1")?.textContent?.trim() || "Vendor Directory";
    link.textContent = `Contact ${vendorName}`;
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openVendorContactModal({ vendorName, vendorCategory: category, source: url.searchParams.get("source") || "vendor-contact-link" });
    });
  });
};

enhanceVendorContactButtons();

const initVendorMembershipPage = () => {
  const page = document.querySelector(".membership-page");
  if (!page) return;

  const membershipApplicationUrl =
    "https://docs.google.com/forms/d/1O8nPN7C7j01Ymy-_INxQS980xy0qWjFdMZ7iKJrxIRE/edit?usp=forms_home&ouid=110542813037386386969&ths=true&pli=1";
  const cta = page.querySelector("#premCta");
  const scar = page.querySelector("#scarTag");
  const pricing = page.querySelector("#pricing");

  page.querySelectorAll("a[href*='docs.google.com/forms']").forEach((link) => {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });

  page.querySelectorAll(".cat.open").forEach((cat) => {
    if (cat.dataset.membershipReady === "true") return;
    cat.dataset.membershipReady = "true";
    cat.addEventListener("click", () => {
      const alreadySelected = cat.classList.contains("selected");
      page.querySelectorAll(".cat.selected").forEach((selected) => selected.classList.remove("selected"));
      if (alreadySelected) {
        if (cta) {
          cta.textContent = "Request category access";
          cta.href = membershipApplicationUrl;
          cta.target = "_blank";
          cta.rel = "noopener noreferrer";
        }
        if (scar) scar.textContent = "First cohort now being reviewed";
        return;
      }

      cat.classList.add("selected");
      const name = cat.querySelector(".cname")?.textContent?.trim() || "Selected category";
      if (cta) {
        cta.textContent = `Request ${name} access`;
        cta.href = membershipApplicationUrl;
        cta.target = "_blank";
        cta.rel = "noopener noreferrer";
      }
      if (scar) scar.textContent = `${name} review selected`;
      pricing?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const categorySearch = page.querySelector("#membership-category-search");
  if (categorySearch && categorySearch.dataset.membershipSearchReady !== "true") {
    categorySearch.dataset.membershipSearchReady = "true";
    categorySearch.addEventListener("input", () => {
      const query = categorySearch.value.trim().toLowerCase();
      page.querySelectorAll(".cat").forEach((cat) => {
        const name = cat.querySelector(".cname")?.textContent?.toLowerCase() || "";
        cat.hidden = Boolean(query && !name.includes(query));
      });
    });
  }
};

initVendorMembershipPage();

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
    .replace(/([a-z])([A-Z])/g, "$1 $2")
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
  ["investors", "capital"],
  ["agent", "ai"],
  ["agents", "ai"],
  ["artificial", "ai"],
  ["intelligence", "ai"],
  ["document", "docs"],
  ["documents", "docs"],
  ["parser", "docs"],
  ["parsing", "docs"],
  ["retrieval", "docs"],
  ["gpu", "compute"],
  ["gpus", "compute"],
  ["model", "ai"],
  ["models", "ai"],
  ["inference", "ai"],
  ["oracle", "data"],
  ["oracles", "data"],
  ["reserve", "data"]
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

const matchesNormalizedVendorSearch = (searchText, query) => {
  const normalizedQuery = normalizeVendorText(query);
  if (!normalizedQuery) return true;
  if (searchText.includes(normalizedQuery)) return true;

  const queryTokens = [...new Set(tokenizeVendorSearch(normalizedQuery))];
  if (!queryTokens.length) return true;

  const textTokens = new Set(tokenizeVendorSearch(searchText));
  const matched = queryTokens.filter((token) => textTokens.has(token) || searchText.includes(token));
  if (matched.length === queryTokens.length) return true;
  if (queryTokens.length <= 3) return matched.length >= 1;
  return matched.length >= Math.min(3, queryTokens.length) || matched.length / queryTokens.length >= 0.45;
};

const inferVendorProfile = (card) => {
  const text = normalizeVendorText(`${card.dataset.search || ""} ${card.textContent || ""}`);
  const tokens = new Set(tokenizeVendorSearch(text));
  const compactMetaLocation = Array.from(card.querySelectorAll(".vendor-meta span, .bc-company-meta span, .bc-provider-meta span"))
    .map((item) => {
      const label = normalizeVendorText(item.querySelector("b, dt, strong")?.textContent || "");
      const value = item.querySelector("em, dd")?.textContent?.trim() || "";
      return /^(hq|headquarters|location|country)$/.test(label) ? value : "";
    })
    .find(Boolean);
  const location =
    card.querySelector('[itemprop="addressCountry"]')?.textContent?.trim() ||
    Array.from(card.querySelectorAll("dt"))
      .find((term) => normalizeVendorText(term.textContent) === "hq")
      ?.parentElement?.querySelector("dd")?.textContent?.trim() ||
    compactMetaLocation ||
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
  const initialQuery = new URLSearchParams(window.location.search).get("q") || "";
  const vendorCards = Array.from(document.querySelectorAll(".vendor-card"));
  const profileIndexSection = document.querySelector(".vendor-profile-index");
  const profileIndexCards = Array.from(document.querySelectorAll(".vendor-profile-index-card"));
  const profileIndexLinks = Array.from(document.querySelectorAll(".vendor-profile-index-card a")).map((link) => {
    const card = link.closest(".vendor-profile-index-card");
    const category = card?.querySelector("h3")?.textContent?.trim() || "Company profile";
    const name = link.textContent?.trim() || "";
    const expandedName = name.replace(/([a-z])([A-Z])/g, "$1 $2");
    return {
      link,
      card,
      category,
      name,
      href: link.getAttribute("href") || "",
      text: normalizeVendorText(`${name} ${expandedName} ${link.getAttribute("href") || ""} ${category}`)
    };
  });
  const categorySearchIndex = (() => {
    const script = document.querySelector("#vendor-search-index-data");
    if (!script?.textContent) return [];
    try {
      const parsed = JSON.parse(script.textContent);
      return Array.isArray(parsed)
        ? parsed.map((item) => ({
            name: item.name || "",
            href: item.href || "",
            category: item.category || "Category listing",
            description: item.description || "",
            text: normalizeVendorText(`${item.name || ""} ${item.category || ""} ${item.description || ""} ${item.keywords || ""} ${item.href || ""}`)
          }))
        : [];
    } catch {
      return [];
    }
  })();
  const categoryLinks = Array.from(document.querySelectorAll("[data-filter]"));
  const categorySections = Array.from(document.querySelectorAll("[data-category-section]"));
  const areaGrid = document.querySelector(".bc-area-grid");
  const categoryNav = document.querySelector(".vendor-category-nav");
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
  const statusNode = document.createElement("p");
  statusNode.className = "vendor-search-status";
  statusNode.setAttribute("aria-live", "polite");
  filterBar.after(statusNode);
  const profileResults = document.createElement("section");
  profileResults.className = "vendor-profile-search-results";
  profileResults.setAttribute("aria-label", "Matching FluidRWA vendor profile pages");
  profileResults.hidden = true;
  profileResults.innerHTML = `
    <div>
      <p class="eyebrow light-eyebrow">Matching vendors</p>
      <h3>Direct matches</h3>
    </div>
    <div class="vendor-profile-search-list"></div>`;
  filterBar.after(profileResults);
  profileResults.after(statusNode);
  const profileResultsList = profileResults.querySelector(".vendor-profile-search-list");
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

    const normalizedQuery = normalizeVendorText(query);
    const hasSearchQuery = Boolean(normalizedQuery);
    if (areaGrid) areaGrid.hidden = hasSearchQuery;
    if (categoryNav) categoryNav.hidden = hasSearchQuery;
    const matchingProfileLinks = normalizedQuery
      ? profileIndexLinks.filter((item) => matchesNormalizedVendorSearch(item.text, normalizedQuery))
      : [];
    const categoryMatches = normalizedQuery
      ? categorySearchIndex.filter((item) => matchesNormalizedVendorSearch(item.text, normalizedQuery))
      : [];
    const seenResultHrefs = new Set();
    const combinedMatches = [...matchingProfileLinks, ...categoryMatches].filter((item) => {
      const key = `${item.href}:${item.name}`;
      if (seenResultHrefs.has(key)) return false;
      seenResultHrefs.add(key);
      return true;
    });
    const matchingProfileCards = new Set(matchingProfileLinks.map((item) => item.card).filter(Boolean));

    profileIndexCards.forEach((card) => {
      card.hidden = Boolean(normalizedQuery) && !matchingProfileCards.has(card);
    });

    if (profileIndexSection) {
      profileIndexSection.hidden = Boolean(normalizedQuery) && !matchingProfileCards.size;
    }

    if (profileResultsList) {
      profileResultsList.innerHTML = combinedMatches
        .slice(0, 24)
        .map((item) => `<a href="${item.href}"><strong>${item.name}</strong><span>${item.category}</span>${item.description ? `<small>${item.description}</small>` : ""}</a>`)
        .join("");
      profileResults.hidden = !combinedMatches.length;
    }

    categorySections.forEach((section) => {
      const hasVisibleCards = Boolean(section.querySelector(".vendor-card:not(.is-hidden)"));
      const matchesActiveCategory = activeFilter === "all" || section.dataset.categorySection === activeFilter;
      section.classList.toggle("is-hidden", !hasVisibleCards || !matchesActiveCategory);
    });

    if (countNode) countNode.textContent = visibleCount.toLocaleString();
    if (statusNode) {
      const profileMatchCount = matchingProfileLinks.length;
      const categoryMatchCount = categoryMatches.length;
      const totalMatches = visibleCount + combinedMatches.length;
      statusNode.textContent = normalizedQuery
        ? `${totalMatches.toLocaleString()} matches found: ${visibleCount.toLocaleString()} on-page vendors, ${profileMatchCount.toLocaleString()} FluidRWA profile links and ${categoryMatchCount.toLocaleString()} category-page vendor links.`
        : `${visibleCount.toLocaleString()} on-page vendors searchable, plus ${categorySearchIndex.length.toLocaleString()} vendor links indexed across category pages.`;
    }
  };

  if (initialQuery) {
    vendorSearch.value = initialQuery;
  }

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

  if (initialQuery) {
    const controls = vendorSearch.closest(".vendor-controls") || vendorSearch;
    const top = controls.getBoundingClientRect().top + window.scrollY - 120;
    window.setTimeout(() => window.scrollTo({ top: Math.max(0, top), behavior: "smooth" }), 120);
  }
}

const providerDirectory = document.querySelector(".bc-provider-grid, .bc-company-grid");

const initLegacyVendorDirectoryWidgets = () => {
  enhanceVendorContactButtons();

  const providerDirectory = document.querySelector(".bc-provider-grid, .bc-company-grid");

  if (providerDirectory && providerDirectory.dataset.fluidrwaProcurementReady !== "true") {
    providerDirectory.dataset.fluidrwaProcurementReady = "true";
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
      <a href="/tokenization-readiness-assessment-tool?source=vendor-directory">Run readiness assessment</a>
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

  if (serviceAreaGrid && serviceAreaGrid.dataset.fluidrwaServiceReady !== "true") {
  serviceAreaGrid.dataset.fluidrwaServiceReady = "true";
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
};

initLegacyVendorDirectoryWidgets();

const initFluidRwaClickAttribution = () => {
  if (document.documentElement.dataset.fluidrwaClickAttribution === "true") return;
  document.documentElement.dataset.fluidrwaClickAttribution = "true";

  document.addEventListener("click", (event) => {
    const link = event.target.closest?.("a[href]");
    if (!link) return;

    const href = link.getAttribute("href") || "";
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

    const url = new URL(href, window.location.origin);
    const text = (link.textContent || "").replace(/\s+/g, " ").trim().slice(0, 90);
    const isExternal = url.origin !== window.location.origin;
    let clickType = "internal_link";

    if (url.pathname.includes("tokenization-readiness-assessment-tool")) clickType = "assessment_cta";
    else if (url.pathname.includes("submit-requirement")) clickType = "submit_requirement_cta";
    else if (url.pathname.includes("vendor-membership") || url.pathname.includes("apply-as-vendor")) clickType = "vendor_signup_cta";
    else if (url.pathname.includes("/vendors/")) clickType = "vendor_category_click";
    else if (url.pathname.includes("/blog/")) clickType = "blog_internal_click";
    else if (isExternal && /linkedin|x\.com|instagram|youtube/i.test(url.hostname)) clickType = "social_profile_click";
    else if (isExternal) clickType = "outbound_click";

    trackFluidRwaEvent("site_link_clicked", {
      click_type: clickType,
      link_text: text || undefined,
      link_url: url.href,
      outbound: isExternal,
    });

    const conversionEvents = {
      assessment_cta: "assessment_start_clicked",
      submit_requirement_cta: "project_brief_clicked",
      vendor_signup_cta: "vendor_signup_clicked",
      outbound_click: "outbound_vendor_website_clicked",
      vendor_category_click: "vendor_category_clicked",
      blog_internal_click: "content_internal_click",
    };

    if (conversionEvents[clickType]) {
      trackFluidRwaEvent(conversionEvents[clickType], {
        link_text: text || undefined,
        link_url: url.href,
        outbound: isExternal,
      });
    }
  });

  document.addEventListener("submit", (event) => {
    const form = event.target;
    if (!form || typeof form.matches !== "function") return;

    const action = form.getAttribute("action") || window.location.pathname;
    const source =
      form.querySelector?.('[name="REQUEST_SOURCE"]')?.value ||
      form.querySelector?.('[name="LEAD_SOURCE"]')?.value ||
      form.dataset?.source ||
      "";

    let formType = "site_form_submit";
    if (form.matches(".fluid-intake-form") || action.includes("vendor-intro-request")) formType = "project_or_vendor_intake_submit";
    else if (action.includes("tokenization-assessment") || window.location.pathname.includes("tokenization-readiness-assessment-tool")) formType = "assessment_form_submit";
    else if (/newsletter|launch|email/i.test(source) || form.querySelector?.('input[type="email"]')) formType = "email_capture_submit";

    trackFluidRwaEvent(formType, {
      form_action: action,
      form_source: source || undefined,
    });
  });
};

initFluidRwaClickAttribution();

window.addEventListener("fluidrwa:route-ready", () => {
  window.setTimeout(initLegacyVendorDirectoryWidgets, 0);
  window.setTimeout(initLegacyVendorDirectoryWidgets, 120);
  window.setTimeout(initFluidRwaClickAttribution, 0);
});
