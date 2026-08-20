"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    paypal?: {
      Buttons: (options: Record<string, any>) => {
        render: (target: string | HTMLElement) => Promise<void> | void;
      };
    };
  }
}

const containerId = "paypal-button-container-P-4SV19732BX232642SNJS5KDA";
const planId = "P-4SV19732BX232642SNJS5KDA";
const clientId = "AeW5lheoWs1gtjC00QbAcBDHn7k9gJdebFCtbXVYSuZZYJlsFS5yFIVVlbUS8jwGH8AgIzjK2WQzHS0J";

export function PayPalSubscriptionButton() {
  const [sdkReady, setSdkReady] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!sdkReady || !window.paypal) return;

    const container = document.getElementById(containerId);
    if (!container || container.dataset.paypalRendered === "true") return;

    container.innerHTML = "";
    container.dataset.paypalRendered = "true";

    try {
      window.paypal
        .Buttons({
          style: { shape: "rect", color: "blue", layout: "vertical", label: "subscribe" },
          createSubscription(
            _data: unknown,
            actions: { subscription: { create: (options: { plan_id: string }) => Promise<string> } }
          ) {
            return actions.subscription.create({ plan_id: planId });
          },
          onApprove(data: { subscriptionID?: string }) {
            const subscription = encodeURIComponent(data.subscriptionID || "");
            window.location.href = `/apply-as-vendor.html?payment=paypal&membership=paid-vetted-vendor&plan=vetted-vendor-monthly&subscription=${subscription}`;
          },
          onError(error: unknown) {
            console.error("PayPal subscription error", error);
            setStatus("PayPal could not load the subscription checkout. Please refresh or apply for review first.");
            delete container.dataset.paypalRendered;
          }
        })
        .render(`#${containerId}`);
    } catch (error) {
      console.error("PayPal button render error", error);
      setStatus("PayPal could not load the subscription checkout. Please refresh or apply for review first.");
      delete container.dataset.paypalRendered;
    }
  }, [sdkReady]);

  return (
    <>
      <Script
        id="paypal-subscription-sdk"
        src={`https://www.paypal.com/sdk/js?client-id=${clientId}&vault=true&intent=subscription`}
        strategy="afterInteractive"
        onReady={() => setSdkReady(true)}
        onLoad={() => setSdkReady(true)}
        onError={() => setStatus("PayPal could not load right now. Please apply for review and we will send the payment link.")}
      />
      {status ? <p className="paypal-membership-status">{status}</p> : null}
    </>
  );
}
