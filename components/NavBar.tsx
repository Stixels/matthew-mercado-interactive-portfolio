"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, FileText, Menu, Moon, Sun, X } from "lucide-react";
import { RESUME_URL } from "@/lib/site";

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
  // The menu belongs to the page it was opened on, so navigating closes it.
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const menuOpen = menuPath === pathname;
  const setMenuOpen = (open: boolean) => setMenuPath(open ? pathname : null);
  const homePrefix = pathname === "/" ? "" : "/";
  const links = [
    { label: "Work", href: `${homePrefix}#work` },
    { label: "About", href: `${homePrefix}#about` },
    { label: "Experience", href: `${homePrefix}#experience` },
    { label: "Contact", href: `${homePrefix}#contact` },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Escape and growing past the mobile layout also close it.
  useEffect(() => {
    if (!menuOpen) return;
    const desktop = window.matchMedia("(min-width: 901px)");
    const close = () => setMenuPath(null);
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKey);
    desktop.addEventListener("change", close);
    return () => {
      window.removeEventListener("keydown", handleKey);
      desktop.removeEventListener("change", close);
    };
  }, [menuOpen]);

  return (
    <header
      className={`signal-nav ${scrolled ? "is-scrolled" : ""} ${
        pathname === "/" ? "is-home" : "is-subpage"
      } ${menuOpen ? "is-open" : ""}`}
    >
      <div className="signal-nav-inner">
        <Link href="/" className="signal-nav-mark">
          <span>MM</span>
          <strong>Matthew Mercado</strong>
        </Link>
        <nav className="signal-nav-links" aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="signal-nav-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Switch between light and dark mode"
          >
            <Sun className="theme-icon-light" aria-hidden="true" />
            <Moon className="theme-icon-dark" aria-hidden="true" />
          </button>
          <a
            className="signal-nav-resume"
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
          >
            Resume <FileText aria-hidden="true" />
          </a>
          <button
            type="button"
            className="signal-nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        className="signal-nav-menu"
        aria-label="Mobile navigation"
        hidden={!menuOpen}
      >
        {links.map((link, index) => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => setMenuOpen(false)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {link.label}
            <ArrowUpRight aria-hidden="true" />
          </a>
        ))}
        <a
          className="signal-nav-menu-resume"
          href={RESUME_URL}
          target="_blank"
          rel="noreferrer"
          onClick={() => setMenuOpen(false)}
        >
          <FileText aria-hidden="true" /> View my resume
        </a>
      </nav>
    </header>
  );
}
