"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    paypal?: {
      Buttons: (options: Record<string, any>) => {
        render: (target: string | HTMLElement) => Promise<void> | void;
      };
    };
  }
}

const PAYPAL_CLIENT_ID = "AeW5lheoWs1gtjC00QbAcBDHn7k9gJdebFCtbXVYSuZZYJlsFS5yFIVVlbUS8jwGH8AgIzjK2WQzHS0J";

function loadPayPalSdk() {
  if (window.paypal?.Buttons) return Promise.resolve();

  const existing = document.querySelector<HTMLScriptElement>('script[data-fluidrwa-paypal="true"]');
  if (existing) {
    return new Promise<void>((resolve, reject) => {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("PayPal SDK failed to load")), { once: true });
    });
  }

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&vault=true&intent=subscription`;
    script.async = true;
    script.dataset.fluidrwaPaypal = "true";
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", () => reject(new Error("PayPal SDK failed to load")), { once: true });
    document.head.appendChild(script);
  });
}

export function PayPalMembershipCheckout() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/vendor-membership") return;

    const dialog = document.getElementById("paypalMembershipDialog") as HTMLDialogElement | null;
    const container = document.getElementById("paypalMembershipButtons");
    const copy = document.getElementById("paypalMembershipCopy");
    const status = document.getElementById("paypalMembershipStatus");
    const close = dialog?.querySelector<HTMLButtonElement>(".paypal-dialog-close");
    const triggers = Array.from(document.querySelectorAll<HTMLButtonElement>(".paypal-plan-trigger"));
    if (!dialog || !container || !copy || !status || triggers.length === 0) return;

    const closeDialog = () => {
      dialog.close();
      container.replaceChildren();
      status.textContent = "";
    };

    const renderCheckout = async (trigger: HTMLButtonElement) => {
      const paypalPlan = trigger.dataset.paypalPlan || "";
      const sitePlan = trigger.dataset.plan || "";
      const planName = trigger.dataset.planName || "FluidRWA";
      const price = trigger.dataset.price || "the selected price";

      copy.textContent = `${planName} membership at ${price}. PayPal manages the recurring subscription and future renewals can be cancelled from the subscriber's PayPal account.`;
      status.textContent = "Loading secure PayPal checkout...";
      container.replaceChildren();
      dialog.showModal();

      try {
        await loadPayPalSdk();
        if (!window.paypal?.Buttons) throw new Error("PayPal SDK is unavailable");
        status.textContent = "";

        await window.paypal.Buttons({
          style: { shape: "rect", color: "gold", layout: "vertical", label: "subscribe" },
          createSubscription: (_data: unknown, actions: { subscription: { create: (input: { plan_id: string }) => Promise<string> } }) =>
            actions.subscription.create({ plan_id: paypalPlan }),
          onApprove: (data: { subscriptionID?: string }) => {
            const params = new URLSearchParams({
              payment: "paypal",
              membership: "paid-vetted-vendor",
              plan: sitePlan,
              subscription: data.subscriptionID || ""
            });
            window.location.assign(`/apply-as-vendor.html?${params.toString()}`);
          },
          onCancel: () => {
            status.textContent = "The subscription was not completed. You can retry whenever you are ready.";
          },
          onError: () => {
            status.textContent = "PayPal could not start the subscription. Please retry or contact contact@fluidrwa.com.";
          }
        }).render(container);
      } catch {
        status.textContent = "PayPal could not load. Please retry or contact contact@fluidrwa.com.";
      }
    };

    const triggerHandlers = triggers.map((trigger) => {
      const handler = () => void renderCheckout(trigger);
      trigger.addEventListener("click", handler);
      return { trigger, handler };
    });
    const closeHandler = () => closeDialog();
    const backdropHandler = (event: MouseEvent) => {
      if (event.target === dialog) closeDialog();
    };
    const cancelHandler = (event: Event) => {
      event.preventDefault();
      closeDialog();
    };

    close?.addEventListener("click", closeHandler);
    dialog.addEventListener("click", backdropHandler);
    dialog.addEventListener("cancel", cancelHandler);

    return () => {
      triggerHandlers.forEach(({ trigger, handler }) => trigger.removeEventListener("click", handler));
      close?.removeEventListener("click", closeHandler);
      dialog.removeEventListener("click", backdropHandler);
      dialog.removeEventListener("cancel", cancelHandler);
    };
  }, [pathname]);

  return null;
}
