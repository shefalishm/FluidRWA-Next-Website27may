"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function RouteReady() {
  const pathname = usePathname();

  useEffect(() => {
    const emitRouteReady = () => {
      window.dispatchEvent(new Event("fluidrwa:route-ready"));
    };

    emitRouteReady();
    const firstFrame = window.setTimeout(emitRouteReady, 0);
    const hydratedFrame = window.setTimeout(emitRouteReady, 150);

    return () => {
      window.clearTimeout(firstFrame);
      window.clearTimeout(hydratedFrame);
    };
  }, [pathname]);

  return null;
}
