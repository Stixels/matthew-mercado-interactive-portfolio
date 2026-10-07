"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Moon, Sun } from "lucide-react";

function toggleTheme() {
  const root = document.documentElement;
  const current =
    root.dataset.theme ??
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  const next = current === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    // Storage can be unavailable (private mode); the choice lasts this visit.
  }
}

export default function NavBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const homePrefix = pathname === "/" ? "" : "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <header
      className={`signal-nav ${scrolled ? "is-scrolled" : ""} ${
        pathname === "/" ? "is-home" : "is-subpage"
      }`}
    >
      <div className="signal-nav-inner">
        <Link href="/" className="signal-nav-mark">
          <span>MM</span>
          <strong>Matthew Mercado</strong>
        </Link>
        <nav aria-label="Primary navigation">
          <a href={`${homePrefix}#work`}>Work</a>
          <a href={`${homePrefix}#about`}>About</a>
          <a href={`${homePrefix}#experience`}>Experience</a>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Switch between light and dark mode"
          >
            <Sun className="theme-icon-light" aria-hidden="true" />
            <Moon className="theme-icon-dark" aria-hidden="true" />
          </button>
          <a className="signal-nav-contact" href={`${homePrefix}#contact`}>
            Contact <ArrowUpRight aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  );
}
