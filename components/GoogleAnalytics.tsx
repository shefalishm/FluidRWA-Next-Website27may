"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

const measurementId = "G-Q5L2HZK162";
const googleAdsId = "AW-299215586";
const leadConversionId = "AW-299215586/l1HRCPy9nLcbEOLV1o4B";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    gtag_report_conversion?: (url?: string) => false;
    fluidRwaReportLeadConversion?: () => void;
  }
}

export function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.gtag) return;
    const query = window.location.search.replace(/^\?/, "");
    window.gtag("config", measurementId, {
      page_path: query ? `${pathname}?${query}` : pathname
    });
  }, [pathname]);

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="fluidrwa-google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', { page_path: window.location.pathname + window.location.search });
          gtag('config', '${googleAdsId}');

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
    </>
  );
}
