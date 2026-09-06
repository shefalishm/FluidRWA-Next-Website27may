"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    fluidRwaReportLeadConversion?: () => void;
    fluidRwaTrackEvent?: (eventName: string, params?: Record<string, unknown>) => void;
  }
}

export function FormScripts() {
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const vendor = params.get("vendor");
    const category = params.get("category");
    const source = params.get("source");
    const forms = Array.from(document.querySelectorAll<HTMLFormElement>(".fluid-intake-form"));
    if (forms.length === 0) return;

    const removeConfirmation = () => {
      document.querySelector("[data-fluid-confirmation]")?.remove();
      document.body.classList.remove("has-form-confirmation");
    };

    const showConfirmation = (
      successTitle: string,
      successCopy: string
    ) => {
      removeConfirmation();
      const primaryAction = `<button type="button" class="btn btn-primary light-primary" data-confirmation-close>Done</button>`;
      const secondaryAction = `<a class="btn btn-secondary light-secondary" href="/web3vendorecosystem">Explore Vendors</a>`;
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
            ${primaryAction}
            ${secondaryAction}
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
    const cleanups: Array<() => void> = [];

    forms.forEach((form) => {
      const formRenderedAt = Date.now();
      const status = form.querySelector<HTMLElement>("[data-form-status]");
      const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
      if (!status || !button) return;

      const getIsVendorForm = () =>
        pathname === "/apply-as-vendor" || form.dataset.formType === "vendor" || form.getAttribute("target") === "fluidVendorSubmit";
      const isVendorForm = getIsVendorForm();
      const formHeading = form.querySelector<HTMLHeadingElement>("h2");
      const descriptionField = form.querySelector<HTMLTextAreaElement>('textarea[name="CONTACT_CF1"]');
      const leadSource = form.querySelector<HTMLInputElement>('input[name="LEAD_SOURCE"]');
      const vendorField = form.querySelector<HTMLInputElement>('input[name="VENDOR_NAME"]');
      const categoryField = form.querySelector<HTMLInputElement>('input[name="VENDOR_CATEGORY"]');
      const sourceField = form.querySelector<HTMLInputElement>('input[name="REQUEST_SOURCE"]');
      const pageField = form.querySelector<HTMLInputElement>('input[name="PAGE_URL"]');
      if (vendorField && vendor) vendorField.value = vendor;
      if (categoryField && category) categoryField.value = category;
      if (sourceField) sourceField.value = source || (isVendorForm ? "vendor-waitlist" : sourceField.value || "submit-requirement");
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

      const getFormMessages = () => {
        const vendorForm = getIsVendorForm();
        const sourceValue = sourceField?.value || "";
        const generalInquiry = sourceValue === "contact-general";
        const vendorListingSubmission = vendorForm || sourceValue === "submit-project-listing";
        return {
          defaultButtonText: button.textContent || (vendorListingSubmission ? "List Your Company on FluidRWA" : generalInquiry ? "Send Inquiry" : "Submit Requirement"),
          loadingText: vendorListingSubmission ? "Saving your listing details..." : generalInquiry ? "Sending your inquiry..." : "Submitting your requirements...",
          successTitle: vendorListingSubmission
            ? "Your listing details have been saved"
            : generalInquiry
              ? "Your inquiry has been received"
              : "Your project requirements have been received",
          successCopy: vendorListingSubmission
            ? "Your application has been received for review. If approved, FluidRWA will contact you with appropriate visibility options and a private commercial proposal."
            : generalInquiry
              ? "Thank you for contacting FluidRWA. Our team will review your note and follow up if there is a fit."
              : "Thank you for sharing your requirements. Our team will review your project and contact you with the most relevant next steps."
        };
      };

      const getAnalyticsEventName = () => {
        const sourceValue = sourceField?.value || "";
        if (getIsVendorForm()) return "vendor_application_submitted";
        if (sourceValue === "contact-general") return "contact_form_submitted";
        if (sourceValue.includes("vendor-contact") || vendor || category) return "vendor_intro_requested";
        return "project_requirement_submitted";
      };

      const handleSubmit = async (event: SubmitEvent) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }
        if (button.disabled) return;
        const isVendorSubmission = getIsVendorForm();
        const sourceValue = sourceField?.value || "";
        const { defaultButtonText, loadingText, successTitle, successCopy } = getFormMessages();
        button.disabled = true;
        button.textContent = "Submitting...";
        status.className = "form-status is-loading";
        status.textContent = loadingText;

        const formData = new FormData(form);
        formData.set("FORM_RENDERED_AT", String(formRenderedAt));
        formData.set("FORM_ELAPSED_MS", String(Date.now() - formRenderedAt));
        const companyName = formValue(formData, "COMPANYNAME");
        const payload = {
          vendorName: formValue(formData, "VENDOR_NAME") || vendor || (isVendorSubmission ? companyName : ""),
          vendorCategory: formValue(formData, "VENDOR_CATEGORY") || category || "",
          source: formValue(formData, "REQUEST_SOURCE") || source || (isVendorSubmission ? "vendor-waitlist" : "submit-requirement"),
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
          const result = (await response.json()) as { ok?: boolean; message?: string; mode?: string };
          if (!response.ok || !result.ok) throw new Error(result.message || "Your request could not be saved.");
          status.className = "form-status is-success";
          status.textContent = `Thank you. ${successTitle}.`;
          button.disabled = true;
          button.textContent = "Submitted";
          showConfirmation(successTitle, successCopy);
          // Filtered spam receives a neutral response but is not a conversion.
          if (result.mode === "filtered") return;
          window.fluidRwaTrackEvent?.(getAnalyticsEventName(), {
            form_type: isVendorSubmission ? "vendor" : "project",
            request_source: payload.source,
            vendor_name: payload.vendorName || undefined,
            vendor_category: payload.vendorCategory || undefined,
            country: payload.country || undefined,
            has_company: Boolean(payload.companyName),
            has_phone: Boolean(payload.phone)
          });
          window.fluidRwaReportLeadConversion?.();
        } catch (error) {
          window.fluidRwaTrackEvent?.("intake_error", {
            form_type: isVendorSubmission ? "vendor" : "project",
            request_source: sourceValue
          });
          button.disabled = false;
          button.textContent = defaultButtonText;
          status.className = "form-status is-error";
          status.textContent = error instanceof Error ? error.message : "Your request could not be saved. Please try again.";
        }
      };

      let started = false;
      const handleStart = () => {
        if (started) return;
        started = true;
        window.fluidRwaTrackEvent?.("intake_start", {
          form_type: isVendorForm ? "vendor" : "project",
          request_source: sourceField?.value || "submit-requirement"
        });
      };
      form.addEventListener("focusin", handleStart);
      cleanups.push(() => form.removeEventListener("focusin", handleStart));
      form.addEventListener("submit", handleSubmit, { capture: true });
      cleanups.push(() => form.removeEventListener("submit", handleSubmit, { capture: true }));
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") removeConfirmation();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      document.removeEventListener("keydown", handleKeyDown);
      removeConfirmation();
    };
  }, [pathname]);

  return null;
}
