"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import type { ReactNode } from "react";

export function MotionShell({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.18, ease: "easeOut" }}>
        {children}
      </m.div>
    </LazyMotion>
  );
}
