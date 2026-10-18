"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const measurementId = "G-Q5L2HZK162";
const googleAdsId = "AW-299215586";
const leadConversionId = "AW-299215586/l1HRCPy9nLcbEOLV1o4B";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    gtag_report_conversion?: (url?: string) => false;
    fluidRwaReportLeadConversion?: () => void;
    fluidRwaTrackEvent?: (eventName: string, params?: Record<string, unknown>) => void;
    fluidRwaSanitizeAnalytics?: (params: Record<string, unknown>) => Record<string, unknown>;
  }
}

export function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);
  const [measurementReady, setMeasurementReady] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const botPattern = /bot|crawler|spider|headless|lighthouse|pagespeed|pingdom|uptime|monitoring|preview/i;
    if (params.get("internal") === "1") window.localStorage.setItem("fluidrwa:analytics-internal", "1");
    const internalVisit = params.get("internal") === "1" || window.localStorage.getItem("fluidrwa:analytics-internal") === "1";
    const analyticsDisabled = params.get("analytics") === "off" || window.localStorage.getItem("fluidrwa:analytics-disabled") === "1";
    if (params.get("analytics") === "off") window.localStorage.setItem("fluidrwa:analytics-disabled", "1");
    setEnabled(["www.fluidrwa.com", "fluidrwa.com"].includes(window.location.hostname)
      && params.get("source") !== "qa-test"
      && !internalVisit
      && !analyticsDisabled
      && !navigator.webdriver
      && !botPattern.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const trackIntent = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a[href]");
      if (!link || !window.fluidRwaTrackEvent) return;
      const href = link.getAttribute("href") || "";
      if (/^mailto:contact@fluidrwa\.com(?:\?|$)/i.test(href)) {
        window.fluidRwaTrackEvent("contact_email_click", { origin_path: window.location.pathname, click_type: "email" });
        return;
      }
      try {
        const destination = new URL(href, window.location.href);
        if (destination.origin !== window.location.origin) return;
        if (!["/vendor-membership", "/submit-requirement"].includes(destination.pathname)) return;
        window.fluidRwaTrackEvent("enquiry_cta_click", {
          origin_path: window.location.pathname,
          form_type: destination.pathname === "/vendor-membership" ? "vendor" : "project",
          link_url: destination.href
        });
      } catch {
        // Ignore links that are not navigable URLs.
      }
    };
    document.addEventListener("click", trackIntent);
    return () => document.removeEventListener("click", trackIntent);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <Script src="/assets/measurement.js?v=2" strategy="afterInteractive" onReady={() => setMeasurementReady(true)} />
      {measurementReady && <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="fluidrwa-google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          function analyticsLocation() {
            var url = new URL(window.location.href);
            var safe = new URLSearchParams();
            ['utm_source','utm_medium','utm_campaign','utm_id','utm_content','utm_term','utm_source_platform','gclid','gbraid','wbraid'].forEach(function(key) {
              if (url.searchParams.has(key)) safe.set(key, url.searchParams.get(key));
            });
            return url.origin + url.pathname + (safe.size ? '?' + safe.toString() : '');
          }
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
            page_location: analyticsLocation(),
            site_host: window.location.hostname,
            deployment_platform: 'cloudflare'
          });
          gtag('config', '${googleAdsId}');

          window.fluidRwaTrackEvent = function(eventName, params) {
            var safeParams = window.fluidRwaSanitizeAnalytics ? window.fluidRwaSanitizeAnalytics(params || {}) : {};
            gtag('event', eventName, Object.assign({
              page_path: window.location.pathname,
              page_location: analyticsLocation(),
              engagement_source: 'fluidrwa_site'
            }, safeParams));
            if (['project_form_submit', 'vendor_application_submit', 'vendor_intro_submit', 'contact_form_submit'].includes(eventName)) {
              gtag('event', 'generate_lead', Object.assign({page_path: window.location.pathname}, safeParams));
            }
          };

          window.fluidRwaReportLeadConversion = function() {
            gtag('event', 'conversion', {
              'send_to': '${leadConversionId}',
              'value': 1.0,
              'currency': 'INR'
            });
          };

          window.gtag_report_conversion = function(url) {
            var callback = function() {
              if (typeof url !== 'undefined') {
                window.location = url;
              }
            };
            gtag('event', 'conversion', {
              'send_to': '${leadConversionId}',
              'value': 1.0,
              'currency': 'INR',
              'event_callback': callback
            });
            return false;
          };
          window.dispatchEvent(new Event('fluidrwa:analytics-ready'));
        `}
      </Script>
      </>}
    </>
  );
}
