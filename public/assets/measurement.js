(function () {
  if (window.fluidRwaMeasurementReady) return;
  window.fluidRwaMeasurementReady = true;
  var key = 'fluidrwa:campaign:v1';
  var names = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_id', 'utm_content', 'utm_term', 'utm_source_platform'];
  var campaign = {};
  var params = new URLSearchParams(window.location.search);
  try { campaign = JSON.parse(sessionStorage.getItem(key) || '{}'); } catch (_) {}
  if (names.some(function (name) { return params.has(name); })) {
    campaign = {};
    names.forEach(function (name) {
      var value = params.get(name);
      if (value) campaign[name] = value.slice(0, 100);
    });
    campaign.landing_path = window.location.pathname;
    try { sessionStorage.setItem(key, JSON.stringify(campaign)); } catch (_) {}
  }
  // Never send form contents, contact details or arbitrary query strings to GA.
  var allowed = new Set(['form_type', 'form_variant', 'request_source', 'interaction_source', 'vendor_name', 'vendor_category', 'country', 'has_company', 'has_phone', 'submission_id', 'outbound', 'origin_path', 'click_type', 'link_text', 'form_source', 'form_action', 'intake_type', 'search_results_count', 'directory_path', 'shortlist_count', 'project_stage', 'project_timeline', 'readiness_score', 'recommended_category', 'assessment_type', 'asset_type', 'investor_type', 'cross_border', 'secondary_trading', 'readiness_classification', 'complexity_rating', 'budget_range', 'mode', 'cta', 'field_name', 'error_reason', 'completed_fields', 'total_fields', 'percent_scrolled', 'article_slug']);
  window.fluidRwaSanitizeAnalytics = function (input) {
    var output = {};
    Object.keys(input).forEach(function (name) {
      var value = input[name];
      if (allowed.has(name) && ['string', 'number', 'boolean'].includes(typeof value)) {
        if (typeof value !== 'string' || !/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i.test(value)) output[name] = typeof value === 'string' ? value.slice(0, 100) : value;
      }
    });
    if (typeof input.link_url === 'string') {
      try { var url = new URL(input.link_url, window.location.origin); output.link_url = url.origin + url.pathname; } catch (_) {}
    }
    return output;
  };
  var leadIds = new Set();
  window.fluidRwaClaimLeadEvent = function (id) {
    if (!id) return true;
    if (leadIds.has(id)) return false;
    leadIds.add(id);
    return true;
  };
  var pendingIntents = [];
  function intent(name, details) {
    if (window.fluidRwaTrackEvent) window.fluidRwaTrackEvent(name, details);
    else if (pendingIntents.length < 20) pendingIntents.push([name, details]);
  }
  window.addEventListener('fluidrwa:analytics-ready', function () {
    pendingIntents.splice(0).forEach(function (item) { window.fluidRwaTrackEvent(item[0], item[1]); });
  });
  var articlePath = window.location.pathname;
  var reached = new Set();
  window.addEventListener('fluidrwa:page-view', function () {
    articlePath = window.location.pathname;
    reached.clear();
  });
  // Depth means a visitor reached this part of the article, not that they read it.
  document.addEventListener('scroll', function () {
    if (document.visibilityState === 'hidden' || !window.fluidRwaTrackEvent) return;
    if (articlePath !== window.location.pathname) {
      articlePath = window.location.pathname;
      reached.clear();
    }
    if (!/^\/(?:es\/)?blog\/[^/]+\/?$/.test(articlePath)) return;
    var article = document.querySelector('article.post-main');
    if (!article) return;
    var bounds = article.getBoundingClientRect();
    if (bounds.height <= window.innerHeight) return;
    var depth = Math.min(100, Math.max(0, (window.innerHeight - bounds.top) / bounds.height * 100));
    [25, 50, 75, 90].forEach(function (percent) {
      if (depth < percent || reached.has(percent)) return;
      reached.add(percent);
      intent('article_scroll', { origin_path: articlePath, article_slug: articlePath.split('/').filter(Boolean).pop(), percent_scrolled: percent });
    });
  }, { passive: true });
  // One capture listener survives client navigation and runs before navigation handlers.
  document.addEventListener('click', function (event) {
    var link = event.target && event.target.closest ? event.target.closest('a[href]') : null;
    if (!link) return;
    var href = link.getAttribute('href') || '';
    if (/^mailto:contact@fluidrwa\.com(?:\?|$)/i.test(href)) {
      intent('contact_email_click', { origin_path: window.location.pathname, click_type: 'email' });
      return;
    }
    try {
      var url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;
      var targetPath = url.pathname.replace(/\/$/, '') || '/';
      if (targetPath.startsWith('/vendors/') || targetPath === '/web3vendorecosystem') {
        intent('directory_click', { origin_path: window.location.pathname, directory_path: targetPath, link_url: url.origin + url.pathname });
        return;
      }
      if (!['/vendor-membership', '/apply-as-vendor', '/submit-requirement', '/submit-project'].includes(targetPath)) return;
      intent('enquiry_cta_click', {
        origin_path: window.location.pathname,
        form_type: /vendor/.test(targetPath) ? 'vendor' : 'project',
        interaction_source: url.searchParams.get('source') || 'site-link',
        link_url: url.origin + url.pathname
      });
    } catch (_) {}
  }, true);
  document.addEventListener('formdata', function (event) {
    Object.keys(campaign).forEach(function (name) {
      event.formData.set('ATTRIBUTION_' + name.toUpperCase(), campaign[name]);
    });
  });
})();
