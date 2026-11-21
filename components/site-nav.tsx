"use client";

import { Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";

type SiteNavProps = {
  children: ReactNode;
  ariaLabel?: string;
};

export default function SiteNav({
  children,
  ariaLabel = "Hovedmenu",
}: SiteNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        id="site-menu"
        className={open ? "nav nav-open" : "nav"}
        aria-label={ariaLabel}
        onClick={() => setOpen(false)}
      >
        {children}
      </nav>
      <button
        className="menu-btn"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Luk menu" : "Åbn menu"}
        aria-expanded={open}
        aria-controls="site-menu"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
    </>
  );
}
