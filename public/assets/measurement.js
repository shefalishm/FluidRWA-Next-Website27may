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
  var allowed = new Set(['form_type', 'form_variant', 'request_source', 'interaction_source', 'vendor_name', 'vendor_category', 'country', 'has_company', 'has_phone', 'submission_id', 'outbound', 'origin_path', 'click_type', 'link_text', 'form_source', 'search_results_count', 'project_stage', 'project_timeline', 'readiness_score', 'recommended_category']);
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
  document.addEventListener('formdata', function (event) {
    Object.keys(campaign).forEach(function (name) {
      event.formData.set('ATTRIBUTION_' + name.toUpperCase(), campaign[name]);
    });
  });
  var started = new WeakSet();
  document.addEventListener('focusin', function (event) {
    var form = event.target.closest && event.target.closest('form');
    if (!form || started.has(form)) return;
    started.add(form);
    window.fluidRwaTrackEvent && window.fluidRwaTrackEvent('form_start', {form_type: form.dataset.formType || 'site', origin_path: window.location.pathname});
  });
})();
