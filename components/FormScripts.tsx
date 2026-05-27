"use client";

import Script from "next/script";

declare global {
  interface Window {
    setupSF?: (...args: unknown[]) => void;
    runOnFormSubmit_sf3z47ea85b6426f2e102b489a30720e5c270941585e6c69fe550c6cb6cde7c6adea?: (form: unknown) => void;
    runOnFormSubmit_sf3z2687c7153c3320cb3f6d27efe7df1c9284f6d703ed96cc26094444c4a121bf9d?: (form: unknown) => void;
  }
}

export function FormScripts() {
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
