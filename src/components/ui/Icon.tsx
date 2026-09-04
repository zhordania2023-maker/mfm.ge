import type { SVGProps } from "react";

export type IconName =
  | "arrow-right"
  | "arrow-left"
  | "arrow-up"
  | "check"
  | "check-circle"
  | "chevron-down"
  | "close"
  | "search"
  | "menu"
  | "user"
  | "users"
  | "heart"
  | "calendar"
  | "clock"
  | "pin"
  | "mail"
  | "phone"
  | "globe"
  | "share"
  | "book"
  | "download"
  | "graduation"
  | "flask"
  | "megaphone"
  | "badge"
  | "shield"
  | "stethoscope"
  | "baby"
  | "sparkle"
  | "filter"
  | "external"
  | "play"
  | "video"
  | "facebook"
  | "linkedin"
  | "youtube"
  | "x";

const paths: Record<IconName, React.ReactNode> = {
  "arrow-right": <path d="M4 12h15m0 0-6-6m6 6-6 6" />,
  "arrow-left": <path d="M20 12H5m0 0 6-6m-6 6 6 6" />,
  "arrow-up": <path d="M12 20V5m0 0-6 6m6-6 6 6" />,
  check: <path d="m4.5 12.5 5 5 10-11" />,
  "check-circle": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
    </>
  ),
  users: (
    <>
      <circle cx="9.5" cy="8.5" r="3" />
      <path d="M3.5 19.5c.7-3 2.9-4.6 6-4.6s5.3 1.6 6 4.6" />
      <path d="M16 6.2a3 3 0 0 1 0 5.6M17.6 15.2c2.1.5 3.4 1.9 3.9 4.3" />
    </>
  ),
  heart: (
    <path d="M12 20s-7-4.4-7-9.4A4 4 0 0 1 12 8a4 4 0 0 1 7 2.6c0 5-7 9.4-7 9.4Z" />
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6.5-6 6.5-10.5A6.5 6.5 0 0 0 5.5 10.5C5.5 15 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2.4" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m4 8 8 5.5L20 8" />
    </>
  ),
  phone: (
    <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2C11.3 19.2 4.8 12.7 4.5 5.7a2 2 0 0 1 2-2.2Z" />
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.2 2.4 3.4 5.4 3.4 8.5S14.2 18.1 12 20.5c-2.2-2.4-3.4-5.4-3.4-8.5S9.8 5.9 12 3.5Z" />
    </>
  ),
  share: (
    <>
      <circle cx="17.5" cy="6" r="2.5" />
      <circle cx="6.5" cy="12" r="2.5" />
      <circle cx="17.5" cy="18" r="2.5" />
      <path d="m8.8 10.8 6.4-3.4M8.8 13.2l6.4 3.4" />
    </>
  ),
  book: (
    <>
      <path d="M5 4.5h9a3 3 0 0 1 3 3V20a2.5 2.5 0 0 0-2.5-2.5H5Z" />
      <path d="M5 4.5v13" />
      <path d="M17 7.5h2v12.2a2.5 2.5 0 0 0-2.5-2.2" />
    </>
  ),
  download: <path d="M12 4v11m0 0 4-4m-4 4-4-4M5 19.5h14" />,
  graduation: (
    <>
      <path d="M12 4 2.5 9 12 14l9.5-5L12 4Z" />
      <path d="M6.5 11.2V16c0 1.6 2.5 3 5.5 3s5.5-1.4 5.5-3v-4.8" />
    </>
  ),
  flask: (
    <>
      <path d="M9.5 3.5v6L4.8 17a2.5 2.5 0 0 0 2.1 3.8h10.2a2.5 2.5 0 0 0 2.1-3.8L14.5 9.5v-6" />
      <path d="M8.5 3.5h7M7.6 14.5h8.8" />
    </>
  ),
  megaphone: (
    <>
      <path d="M4 10.5v3a2 2 0 0 0 2 2h2l8 4V4.5l-8 4H6a2 2 0 0 0-2 2Z" />
      <path d="M8 15.5V21M19 9.5a3.5 3.5 0 0 1 0 5" />
    </>
  ),
  badge: (
    <>
      <circle cx="12" cy="9.5" r="5.5" />
      <path d="m8.5 14.5-1 6 4.5-2.5 4.5 2.5-1-6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 5 6v6c0 4.2 2.9 7.4 7 8.5 4.1-1.1 7-4.3 7-8.5V6l-7-2.5Z" />
      <path d="m9.3 11.8 1.9 1.9 3.6-3.9" />
    </>
  ),
  stethoscope: (
    <>
      <path d="M6 3.5v5a4 4 0 0 0 8 0v-5" />
      <path d="M4.5 3.5h3M12.5 3.5h3" />
      <path d="M10 16.5v.5a4 4 0 0 0 8 0v-2" />
      <circle cx="18" cy="13" r="2" />
    </>
  ),
  baby: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9 10.5h.01M15 10.5h.01M9.5 15c.7.8 1.6 1.2 2.5 1.2s1.8-.4 2.5-1.2" />
    </>
  ),
  sparkle: (
    <path d="M12 3.5 13.9 9l5.6 2-5.6 2-1.9 5.5L10.1 13l-5.6-2 5.6-2L12 3.5Z" />
  ),
  filter: <path d="M4 6h16M7 12h10M10 18h4" />,
  external: <path d="M14 4.5h5.5V10M19 5l-8 8M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" />,
  play: <path d="M8 5.5v13l11-6.5-11-6.5Z" />,
  video: (
    <>
      <rect x="3" y="6" width="12.5" height="12" rx="2.5" />
      <path d="m15.5 10.5 5-3v9l-5-3Z" />
    </>
  ),
  facebook: (
    <path
      d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.9.3-1.5 1.6-1.5H16.5V4.4c-.3 0-1.3-.1-2.5-.1-2.4 0-4.1 1.5-4.1 4.2v2H7.4v3h2.5V21Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  linkedin: (
    <path
      d="M6.9 8.6H4V20h2.9V8.6ZM5.4 4a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM20 13.4c0-3-1.6-4.9-4.1-4.9-1.4 0-2.4.7-2.8 1.4h-.1V8.6H10.2V20h2.9v-5.7c0-1.5.3-2.9 2.1-2.9s1.9 1.6 1.9 3V20H20v-6.6Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10.5 9.5 5 2.5-5 2.5Z" fill="currentColor" stroke="none" />
    </>
  ),
  x: (
    <path
      d="M17.2 3.5h3l-6.6 7.5 7.7 9.5h-6l-4.3-5.4-4.9 5.4H3l7-8-7.4-9h6.2l3.9 4.9 4.5-4.9Zm-1.1 15.2h1.7L7.9 5.2H6.1l10 13.5Z"
      fill="currentColor"
      stroke="none"
    />
  ),
};

type Props = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

export function Icon({ name, size = 20, ...rest }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
