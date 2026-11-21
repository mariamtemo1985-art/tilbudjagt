import type { ReactNode } from "react";

type SiteNavProps = {
  children: ReactNode;
  ariaLabel?: string;
};

export default function SiteNav({
  children,
  ariaLabel = "Hovedmenu",
}: SiteNavProps) {
  return (
    <nav className="nav" aria-label={ariaLabel}>
      {children}
    </nav>
  );
}
