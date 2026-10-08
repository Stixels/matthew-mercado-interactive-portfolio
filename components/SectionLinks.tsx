"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Section links scroll the page without leaving a #hash in the address bar,
// so refreshing reloads where the visitor is instead of jumping back to the
// last section they picked. Arriving from another page with a hash still
// lands on that section, and the hash is cleared once it has.
export default function SectionLinks() {
  const pathname = usePathname();

  useEffect(() => {
    const clearHash = () => {
      if (!window.location.hash) return;
      const { pathname, search } = window.location;
      window.history.replaceState(window.history.state, "", pathname + search);
    };

    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement) || link.target) return;
      const url = new URL(link.href);
      if (
        !url.hash ||
        url.origin !== window.location.origin ||
        url.pathname !== window.location.pathname
      ) {
        return;
      }
      const section = document.getElementById(
        decodeURIComponent(url.hash.slice(1)),
      );
      if (!section) return;
      event.preventDefault();
      section.scrollIntoView({ block: "start" });
      clearHash();
    };

    // Let the browser finish jumping to an incoming hash before clearing it.
    const frame = requestAnimationFrame(clearHash);
    document.addEventListener("click", handleClick);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", handleClick);
    };
  }, [pathname]);

  return null;
}
