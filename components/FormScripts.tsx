"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    setupSF?: (...args: unknown[]) => void;
    fluidRwaReportLeadConversion?: () => void;
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
    if (!form || !status || !button) return;

    const isVendorForm = pathname === "/apply-as-vendor";
    if (isVendorForm && !frame) return;
    const params = new URLSearchParams(window.location.search);
    const vendor = params.get("vendor");
    const category = params.get("category");
    const source = params.get("source");
    const formHeading = form.querySelector<HTMLHeadingElement>("h2");
    const descriptionField = form.querySelector<HTMLTextAreaElement>('textarea[name="CONTACT_CF1"]');
    const leadSource = form.querySelector<HTMLInputElement>('input[name="LEAD_SOURCE"]');
    const vendorField = form.querySelector<HTMLInputElement>('input[name="VENDOR_NAME"]');
    const categoryField = form.querySelector<HTMLInputElement>('input[name="VENDOR_CATEGORY"]');
    const sourceField = form.querySelector<HTMLInputElement>('input[name="REQUEST_SOURCE"]');
    const pageField = form.querySelector<HTMLInputElement>('input[name="PAGE_URL"]');
    if (vendorField && vendor) vendorField.value = vendor;
    if (categoryField && category) categoryField.value = category;
    if (sourceField && source) sourceField.value = source;
    if (pageField) pageField.value = window.location.href;
    if (!isVendorForm && (vendor || category)) {
      if (formHeading && vendor) formHeading.textContent = `Request an introduction to ${vendor}`;
      if (leadSource && source) leadSource.value = `FluidRWA ${source}`;
      if (descriptionField && !descriptionField.value.trim()) {
        const intro = vendor ? `I would like an introduction to ${vendor}.` : "I would like help finding a vendor.";
        const categoryLine = category ? ` Category: ${category}.` : "";
        descriptionField.value = `${intro}${categoryLine} Please route this through FluidRWA.`;
      }
    }

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

    const formValue = (formData: FormData, name: string) => String(formData.get(name) || "").trim();

    const handleSubmit = async (event: SubmitEvent) => {
      submitted = true;
      button.disabled = true;
      button.textContent = "Submitting...";
      status.className = "form-status is-loading";
      status.textContent = loadingText;

      if (!isVendorForm) {
        event.preventDefault();
        event.stopImmediatePropagation();
        const formData = new FormData(form);
        const payload = {
          vendorName: formValue(formData, "VENDOR_NAME") || vendor || "",
          vendorCategory: formValue(formData, "VENDOR_CATEGORY") || category || "",
          source: formValue(formData, "REQUEST_SOURCE") || source || "submit-requirement",
          pageUrl: window.location.href,
          leadSource: formValue(formData, "LEAD_SOURCE"),
          contactEmail: formValue(formData, "CONTACT_EMAIL"),
          firstName: formValue(formData, "FIRSTNAME"),
          lastName: formValue(formData, "LASTNAME"),
          title: formValue(formData, "TITLE"),
          companyName: formValue(formData, "COMPANYNAME"),
          phone: formValue(formData, "PHONE"),
          country: formValue(formData, "COUNTRY"),
          website: formValue(formData, "WEBSITE"),
          linkedin: formValue(formData, "LINKEDIN_HANDLE"),
          projectDescription: formValue(formData, "CONTACT_CF1"),
          rawPayload: Object.fromEntries(formData.entries())
        };

        try {
          const response = await fetch("/api/vendor-intro-request", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          });
          const result = (await response.json()) as { ok?: boolean; message?: string };
          if (!response.ok || !result.ok) throw new Error(result.message || "Your request could not be saved.");
          submitted = false;
          window.clearTimeout(timeoutId);
          status.className = "form-status is-success";
          status.textContent = "Thank you. Your project requirements have been received.";
          button.disabled = true;
          button.textContent = "Submitted";
          showConfirmation();
          window.fluidRwaReportLeadConversion?.();
        } catch (error) {
          submitted = false;
          window.clearTimeout(timeoutId);
          button.disabled = false;
          button.textContent = defaultButtonText;
          status.className = "form-status is-error";
          status.textContent = error instanceof Error ? error.message : "Your request could not be saved. Please try again.";
        }
        return;
      }

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

    form.addEventListener("submit", handleSubmit, { capture: true });
    frame?.addEventListener("load", handleFrameLoad);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(timeoutId);
      form.removeEventListener("submit", handleSubmit, { capture: true });
      frame?.removeEventListener("load", handleFrameLoad);
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
