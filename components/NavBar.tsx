"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

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
        <Link href="/" className="signal-nav-mark" aria-label="Matthew Mercado home">
          <span>MM</span>
          <strong>Matthew Mercado</strong>
        </Link>
        <nav aria-label="Primary navigation">
          <a href={`${homePrefix}#work`}>Work</a>
          <a href={`${homePrefix}#about`}>About</a>
          <a href={`${homePrefix}#experience`}>Experience</a>
          <a className="signal-nav-contact" href={`${homePrefix}#contact`}>
            Contact <ArrowUpRight aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  );
}
