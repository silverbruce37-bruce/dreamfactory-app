"use client";

import { useEffect } from "react";

export function CreateHashRedirect() {
  useEffect(() => {
    function go() {
      const hash = window.location.hash;
      if (hash === "#features" || hash === "#models") {
        window.location.replace(`/${hash}`);
      }
    }
    go();
    window.addEventListener("hashchange", go);
    window.addEventListener("popstate", go);
    return () => {
      window.removeEventListener("hashchange", go);
      window.removeEventListener("popstate", go);
    };
  }, []);

  return null;
}
