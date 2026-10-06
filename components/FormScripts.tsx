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
    const shortlist = params.get("shortlist");
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
    const pendingEvents: Array<[string, Record<string, unknown>]> = [];
    const trackEvent = (name: string, details: Record<string, unknown>) => {
      if (params.get("source") === "qa-test") return;
      if (window.fluidRwaTrackEvent) window.fluidRwaTrackEvent(name, details);
      else pendingEvents.push([name, details]);
    };
    const flushEvents = () => {
      if (!window.fluidRwaTrackEvent) return;
      pendingEvents.splice(0).forEach(([name, details]) => window.fluidRwaTrackEvent?.(name, details));
    };
    window.addEventListener("fluidrwa:analytics-ready", flushEvents);
    cleanups.push(() => window.removeEventListener("fluidrwa:analytics-ready", flushEvents));

    forms.forEach((form) => {
      const formRenderedAt = Date.now();
      const status = form.querySelector<HTMLElement>("[data-form-status]");
      const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
      if (!status || !button) return;

      const getIsVendorForm = () =>
        pathname === "/apply-as-vendor" || form.dataset.formType === "vendor" || form.getAttribute("target") === "fluidVendorSubmit";
      const isVendorForm = getIsVendorForm();
      const isReviewApplication = form.dataset.reviewApplication === "true";
      let submitted = false;
      const analyticsDetails = () => ({
        form_type: getIsVendorForm() ? "vendor" : "project",
        form_variant: "full_page",
        interaction_source: sourceField?.value || "submit-requirement",
        request_source: sourceField?.value || "submit-requirement"
      });
      const formHeading = form.querySelector<HTMLHeadingElement>("h2");
      const descriptionField = form.querySelector<HTMLTextAreaElement>('textarea[name="CONTACT_CF1"]');
      const leadSource = form.querySelector<HTMLInputElement>('input[name="LEAD_SOURCE"]');
      const vendorField = form.querySelector<HTMLInputElement>('input[name="VENDOR_NAME"]');
      const categoryField = form.querySelector<HTMLInputElement>('input[name="VENDOR_CATEGORY"]');
      const sourceField = form.querySelector<HTMLInputElement>('input[name="REQUEST_SOURCE"]');
      const pageField = form.querySelector<HTMLInputElement>('input[name="PAGE_URL"]');
      const normalizeWebsite = (event: Event) => {
        const input = event.target;
        if (!(input instanceof HTMLInputElement) || input.type !== "url" || input.name !== "WEBSITE") return;
        const value = input.value.trim();
        if (/^(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+(?:[/:?#].*)?$/i.test(value) && !/^[a-z][a-z0-9+.-]*:\/\//i.test(value)) {
          input.value = `https://${value}`;
        }
      };
      form.addEventListener("change", normalizeWebsite);
      cleanups.push(() => form.removeEventListener("change", normalizeWebsite));
      if (vendorField && vendor) vendorField.value = vendor;
      if (categoryField && category) categoryField.value = category;
      const requirementCategory = form.querySelector<HTMLSelectElement>('[name="REQUIREMENT_CATEGORY"]');
      if (!isVendorForm && requirementCategory && category) {
        const mappings: Array<[RegExp, string]> = [
          [/smart.contract/i, "Smart contract development"],
          [/blockchain.develop/i, "Blockchain development"], [/custod|wallet/i, "Custody and wallets"],
          [/kyc|aml|compliance/i, "KYC, AML and compliance"], [/payment|stablecoin|ramp/i, "Payments and stablecoins"],
          [/security|audit/i, "Security and audits"], [/legal|regulatory/i, "Legal and regulatory"],
          [/\bai\b/i, "AI infrastructure or tools"], [/tokeniz/i, "Tokenization platform"]
        ];
        requirementCategory.value = mappings.find(([pattern]) => pattern.test(category))?.[1] || "Other / multiple categories";
      }
      if (sourceField) sourceField.value = form.dataset.reviewApplication === "true"
        ? "vendor-review-application"
        : isVendorForm ? (sourceField.value || "vendor-review") : sourceField.value === "contact-general" ? "contact-general" : source || sourceField.value || "submit-requirement";
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
      if (!isVendorForm && shortlist && descriptionField) {
        descriptionField.value = `Please help me compare this shortlist: ${shortlist}.`;
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
        if (getIsVendorForm()) return "vendor_application_submit";
        if (sourceValue === "contact-general") return "contact_form_submit";
        if (sourceValue.includes("vendor-contact") || vendor) return "vendor_intro_submit";
        return "project_form_submit";
      };

      const getAnalyticsStartEventName = () => {
        const sourceValue = sourceField?.value || "";
        if (getIsVendorForm()) return "vendor_application_start";
        if (sourceValue.includes("vendor-contact") || vendor) return "vendor_intro_start";
        return "project_form_start";
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
        trackEvent("form_submit_attempt", analyticsDetails());
        const { defaultButtonText, loadingText, successTitle, successCopy } = getFormMessages();
        button.disabled = true;
        button.textContent = "Submitting...";
        status.className = "form-status is-loading";
        status.textContent = loadingText;

        const formData = new FormData(form);
        formData.set("FORM_RENDERED_AT", String(formRenderedAt));
        formData.set("FORM_ELAPSED_MS", String(Date.now() - formRenderedAt));
        const companyName = formValue(formData, "COMPANYNAME");
        const selectedCategory = formValue(formData, "REQUIREMENT_CATEGORY");
        const contextualCategory = formValue(formData, "VENDOR_CATEGORY") || category || "";
        const payload = {
          vendorName: formValue(formData, "VENDOR_NAME") || vendor || (isVendorSubmission ? companyName : ""),
          vendorCategory: selectedCategory === "Other / multiple categories" && contextualCategory
            ? contextualCategory
            : selectedCategory || contextualCategory,
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
          const result = (await response.json()) as { ok?: boolean; message?: string; code?: string; mode?: string; requestId?: string | null };
          if (!response.ok || !result.ok) {
            trackEvent("form_submit_error", { ...analyticsDetails(), error_reason: result.code || `http_${response.status}` });
            throw new Error(result.message || "Your request could not be saved.");
          }
          submitted = result.mode !== "filtered";
          status.className = "form-status is-success";
          status.textContent = `Thank you. ${successTitle}.`;
          button.disabled = true;
          button.textContent = "Submitted";
          showConfirmation(successTitle, successCopy);
          // Filtered spam receives a neutral response but is not a conversion.
          if (result.mode === "filtered" || params.get("source") === "qa-test") return;
          trackEvent(getAnalyticsEventName(), {
            form_type: isVendorSubmission ? "vendor" : "project",
            form_variant: "full_page",
            request_source: payload.source,
            interaction_source: payload.source,
            vendor_name: payload.vendorName || undefined,
            vendor_category: payload.vendorCategory || undefined,
            country: payload.country || undefined,
            has_company: Boolean(payload.companyName),
            has_phone: Boolean(payload.phone),
            submission_id: result.requestId || undefined
          });
          window.fluidRwaReportLeadConversion?.();
        } catch (error) {
          if (error instanceof TypeError || error instanceof SyntaxError) trackEvent("form_submit_error", {
            form_type: isVendorSubmission ? "vendor" : "project",
            form_variant: "full_page",
            interaction_source: sourceValue,
            request_source: sourceValue,
            error_reason: error instanceof SyntaxError ? "invalid_response" : "network"
          });
          button.disabled = false;
          button.textContent = defaultButtonText;
          status.className = "form-status is-error";
          status.textContent = error instanceof Error ? error.message : "Your request could not be saved. Please try again.";
        }
      };

      let started = false;
      const handleStart = (event: Event) => {
        const target = event.target;
        if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement)
          || target.name === "WEBSITE_URL" || target.type === "hidden") return;
        if (started) return;
        started = true;
        trackEvent(getAnalyticsStartEventName(), analyticsDetails());
      };
      form.addEventListener("input", handleStart);
      form.addEventListener("change", handleStart);
      cleanups.push(() => {
        form.removeEventListener("input", handleStart);
        form.removeEventListener("change", handleStart);
      });
      const invalidFields = new Set<string>();
      const handleInvalid = (event: Event) => {
        const input = event.target;
        if (!(input instanceof HTMLInputElement || input instanceof HTMLSelectElement || input instanceof HTMLTextAreaElement)) return;
        const reason = input.validity.valueMissing ? "required" : input.validity.typeMismatch ? "format" : "invalid";
        const key = `${input.name}:${reason}`;
        if (invalidFields.has(key)) return;
        invalidFields.add(key);
        trackEvent("form_validation_error", { ...analyticsDetails(), field_name: input.name, error_reason: reason });
      };
      form.addEventListener("invalid", handleInvalid, true);
      cleanups.push(() => form.removeEventListener("invalid", handleInvalid, true));
      if (isReviewApplication) {
        const requiredInputs = Array.from(form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input[required], select[required], textarea[required]"));
        const completedCount = () => requiredInputs.filter((input) => input instanceof HTMLInputElement && input.type === "checkbox" ? input.checked : Boolean(input.value.trim())).length;
        const onExit = () => {
          if (started && !submitted) trackEvent("vendor_application_exit", { ...analyticsDetails(), completed_fields: completedCount(), total_fields: requiredInputs.length });
        };
        window.addEventListener("pagehide", onExit);
        cleanups.push(() => window.removeEventListener("pagehide", onExit));
        const firstField = requiredInputs[0];
        if (firstField) {
          const observer = new IntersectionObserver((entries) => {
            if (!entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.5)) return;
            trackEvent("vendor_application_view", analyticsDetails());
            observer.disconnect();
          }, { threshold: 0.5 });
          observer.observe(firstField);
          cleanups.push(() => observer.disconnect());
        }
      }
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
