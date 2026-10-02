import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      width="1em"
      height="1em"
      {...props}
    >
      {children}
    </svg>
  );
}

export const SearchIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </Base>
);

export const SlidersIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />
  </Base>
);

export const MapPinIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </Base>
);

export const BedIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M2 9v10M2 14h20v5M22 14v5M22 14V9a3 3 0 0 0-3-3H6a4 4 0 0 0-4 4M6 11h4" />
    <path d="M18 11h0" />
  </Base>
);

export const BathIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 12V6a2 2 0 0 1 2-2 2 2 0 0 1 2 2M3 12h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3ZM6 19l-1 2M18 19l1 2" />
    <path d="M8 12V9" />
  </Base>
);

export const RulerIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 8.5 8.5 3l12 12L15.5 20l-12-12Z" />
    <path d="m7 9 1.5 1.5M10 6l1.5 1.5M13 12l1.5 1.5M16 9l1.5 1.5" />
  </Base>
);

export const HeartIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21s-7.5-4.7-10-9.2C.4 8.5 2 5 5.5 5 7.7 5 9 6.3 12 9c3-2.7 4.3-4 6.5-4C22 5 23.6 8.5 22 11.8 19.5 16.3 12 21 12 21Z" />
  </Base>
);

export const HeartFilledIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" {...p}>
    <path d="M12 21s-7.5-4.7-10-9.2C.4 8.5 2 5 5.5 5 7.7 5 9 6.3 12 9c3-2.7 4.3-4 6.5-4C22 5 23.6 8.5 22 11.8 19.5 16.3 12 21 12 21Z" />
  </svg>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Base>
);

export const ArrowLeftIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </Base>
);

export const ChevronDownIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m6 9 6 6 6-6" />
  </Base>
);

export const ChevronRightIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m9 6 6 6-6 6" />
  </Base>
);

export const CloseIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Base>
);

export const MenuIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </Base>
);

export const KeyIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="8" cy="8" r="5" />
    <path d="m11 11 8 8M16 16l2-2M19 19l2-2" />
  </Base>
);

export const CheckIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m20 6-11 11-5-5" />
  </Base>
);

export const PhoneIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
  </Base>
);

export const MailIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 6 10-6" />
  </Base>
);

export const GlobeIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
  </Base>
);

export const MapIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m9 4-6 2v14l6-2 6 2 6-2V4l-6 2-6-2ZM9 4v14M15 6v14" />
  </Base>
);

export const GridIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="3" width="8" height="8" rx="1" />
    <rect x="13" y="3" width="8" height="8" rx="1" />
    <rect x="3" y="13" width="8" height="8" rx="1" />
    <rect x="13" y="13" width="8" height="8" rx="1" />
  </Base>
);

export const StarIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" {...p}>
    <path d="m12 2 2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.8 5.9 20.4l1.5-6.8L2.2 9l6.9-.7L12 2Z" />
  </svg>
);

export const ShieldIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </Base>
);

export const UsersIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3 20a6 6 0 0 1 12 0M16 5.2a3.2 3.2 0 0 1 0 6.1M21 20a5.5 5.5 0 0 0-4-5.3" />
  </Base>
);
