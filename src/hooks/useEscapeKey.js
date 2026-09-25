import { useEffect } from "react";

export function useEscapeKey(handler, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const onKey = (e) => {
      if (e.key === "Escape") handler(e);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handler, enabled]);
}