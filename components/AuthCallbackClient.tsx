"use client";

import Link from "next/link";
import { useEffect } from "react";

type AuthCallbackClientProps = {
  nextPath: string;
  error?: string;
};

const popupStorageKey = "fluidrwa.accountSignup.dismissed";
const signedUpStorageKey = "fluidrwa.accountSignup.completed";
const directoryAccessStorageKey = "fluidrwa.freelancer.directoryAccess";

export function AuthCallbackClient({ nextPath, error }: AuthCallbackClientProps) {
  useEffect(() => {
    if (error) return;

    window.localStorage.setItem(popupStorageKey, "true");
    window.localStorage.setItem(signedUpStorageKey, "true");

    if (nextPath.includes("/specialist-directory/directory") || nextPath.includes("/freelancers-preview/directory")) {
      window.localStorage.setItem(
        directoryAccessStorageKey,
        JSON.stringify({
          name: "",
          email: "",
          company: "",
          authMethod: "google"
        })
      );
    }

    const timer = window.setTimeout(() => {
      window.location.href = nextPath;
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [error, nextPath]);

  return (
    <main className="freelancer-preview-page">
      <section className="light-container freelancer-hero-grid freelancer-auth-callback">
        <div>
          <p className="eyebrow light-eyebrow">{error ? "Sign in needs setup" : "FluidRWA account"}</p>
          <h1>{error ? "We could not complete sign in yet" : "You are signed in"}</h1>
          <p>
            {error
              ? "The site route is ready, but the OAuth provider still needs to be enabled in Supabase before this can complete."
              : "Taking you back to FluidRWA now."}
          </p>
          <Link className="btn btn-primary" href={nextPath}>
            Continue
          </Link>
        </div>
      </section>
    </main>
  );
}
