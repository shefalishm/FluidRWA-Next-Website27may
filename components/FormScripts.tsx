"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    setupSF?: (...args: unknown[]) => void;
    runOnFormSubmit_sf3z47ea85b6426f2e102b489a30720e5c270941585e6c69fe550c6cb6cde7c6adea?: (form: unknown) => void;
    runOnFormSubmit_sf3z2687c7153c3320cb3f6d27efe7df1c9284f6d703ed96cc26094444c4a121bf9d?: (form: unknown) => void;
  }
}

export function FormScripts() {
  const pathname = usePathname();

  useEffect(() => {
    const form = document.querySelector<HTMLFormElement>(".fluid-intake-form");
    const frame = document.querySelector<HTMLIFrameElement>(".hidden-response-frame");
    const status = document.querySelector<HTMLElement>("[data-form-status]");
    const button = form?.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (!form || !frame || !status || !button) return;

    const isVendorForm = pathname === "/apply-as-vendor";
    const defaultButtonText = isVendorForm ? "Submit Vendor Interest" : "Submit Requirement";
    const loadingText = isVendorForm ? "Submitting your vendor interest..." : "Submitting your requirements...";
    const successTitle = isVendorForm ? "Your vendor interest has been received" : "Your project requirements have been received";
    const successCopy = isVendorForm
      ? "Thank you for applying to the FluidRWA vendor ecosystem. Our team will review your company details and contact you if there is a fit."
      : "Thank you for sharing your requirements. Our team will review your project and contact you with the most relevant next steps.";

    let submitted = false;
    let timeoutId: number | undefined;

    const removeConfirmation = () => {
      document.querySelector("[data-fluid-confirmation]")?.remove();
      document.body.classList.remove("has-form-confirmation");
    };

    const showConfirmation = () => {
      removeConfirmation();
      const overlay = document.createElement("div");
      overlay.className = "form-confirmation-overlay";
      overlay.dataset.fluidConfirmation = "true";
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-modal", "true");
      overlay.setAttribute("aria-labelledby", "form-confirmation-title");
      overlay.innerHTML = `
        <div class="form-confirmation-card">
          <div class="form-confirmation-check" aria-hidden="true">✓</div>
          <p class="form-confirmation-eyebrow">Submission confirmed</p>
          <h2 id="form-confirmation-title">${successTitle}</h2>
          <p>${successCopy}</p>
          <div class="form-confirmation-actions">
            <button type="button" class="btn btn-primary light-primary" data-confirmation-close>Done</button>
            <a class="btn btn-secondary light-secondary" href="/web3vendorecosystem">Explore Vendors</a>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
      document.body.classList.add("has-form-confirmation");
      overlay.querySelector<HTMLButtonElement>("[data-confirmation-close]")?.focus();
      overlay.addEventListener("click", (event) => {
        if (event.target === overlay || (event.target as HTMLElement).closest("[data-confirmation-close]")) {
          removeConfirmation();
        }
      });
    };

    const handleSubmit = () => {
      submitted = true;
      button.disabled = true;
      button.textContent = "Submitting...";
      status.className = "form-status is-loading";
      status.textContent = loadingText;
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        if (!submitted) return;
        submitted = false;
        button.disabled = false;
        button.textContent = defaultButtonText;
        status.className = "form-status is-error";
        status.textContent = "The submission is taking longer than expected. Please check your connection and try again.";
      }, 15000);
    };

    const handleFrameLoad = () => {
      if (!submitted) return;
      submitted = false;
      window.clearTimeout(timeoutId);
      status.className = "form-status is-success";
      status.textContent = `Thank you. ${successTitle}.`;
      button.disabled = true;
      button.textContent = "Submitted";
      showConfirmation();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") removeConfirmation();
    };

    form.addEventListener("submit", handleSubmit);
    frame.addEventListener("load", handleFrameLoad);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(timeoutId);
      form.removeEventListener("submit", handleSubmit);
      frame.removeEventListener("load", handleFrameLoad);
      document.removeEventListener("keydown", handleKeyDown);
      removeConfirmation();
    };
  }, [pathname]);

  return (
    <Script
      src="https://zgp4-zgp4.maillist-manage.in/js/optin.min.js"
      strategy="afterInteractive"
      onLoad={() => {
        window.runOnFormSubmit_sf3z47ea85b6426f2e102b489a30720e5c270941585e6c69fe550c6cb6cde7c6adea = () => undefined;
        window.runOnFormSubmit_sf3z2687c7153c3320cb3f6d27efe7df1c9284f6d703ed96cc26094444c4a121bf9d = () => undefined;
        if (document.getElementById("sf3z47ea85b6426f2e102b489a30720e5c270941585e6c69fe550c6cb6cde7c6adea")) {
          window.setupSF?.("sf3z47ea85b6426f2e102b489a30720e5c270941585e6c69fe550c6cb6cde7c6adea", "ZCFORMVIEW", false);
        }
        if (document.getElementById("sf3z2687c7153c3320cb3f6d27efe7df1c9284f6d703ed96cc26094444c4a121bf9d")) {
          window.setupSF?.("sf3z2687c7153c3320cb3f6d27efe7df1c9284f6d703ed96cc26094444c4a121bf9d", "ZCFORMVIEW", false, "acc", false, "2");
        }
      }}
    />
  );
}
