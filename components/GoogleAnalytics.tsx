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
    setEnabled(["www.fluidrwa.com", "fluidrwa.com"].includes(window.location.hostname)
      && params.get("source") !== "qa-test" && params.get("analytics") !== "off");
  }, []);

  if (!enabled) return null;

  return (
    <>
      <Script src="/assets/measurement.js?v=1" strategy="afterInteractive" onReady={() => setMeasurementReady(true)} />
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
          gtag('config', '${measurementId}', { page_path: window.location.pathname, page_location: analyticsLocation() });
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
        `}
      </Script>
      </>}
    </>
  );
}
