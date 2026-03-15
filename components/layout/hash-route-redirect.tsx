"use client";

import { useEffect } from "react";

export function HashRouteRedirect() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const hash = window.location.hash;
    if (!hash.startsWith("#/")) {
      return;
    }

    const target = hash.slice(1);
    if (target && target !== window.location.pathname) {
      window.history.replaceState({}, "", target);
    }
  }, []);

  return null;
}
