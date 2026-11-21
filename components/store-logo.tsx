import { getStoreLogo } from "@/lib/store-logos";

type StoreLogoProps = {
  slug: string;
  name: string;
  large?: boolean;
  className?: string;
};

export default function StoreLogo({
  slug,
  name,
  large = false,
  className = "",
}: StoreLogoProps) {
  const src = getStoreLogo(slug);
  return (
    <span
      className={`store-avatar${src ? " store-avatar-logo" : ""}${
        large ? " large" : ""
      }${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    >
      {src ? <img src={src} alt="" loading="lazy" /> : name.slice(0, 1)}
    </span>
  );
}
