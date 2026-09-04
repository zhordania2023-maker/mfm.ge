import Image from "next/image";
import Link from "@/components/ui/LocaleLink";
import { siteFor } from "@/content/site-lite";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

/**
 * ლოგოს ნიშანი.
 *
 * თუ `src` გადმოეცემა (public/img/logo.* ნაპოვნია — იხ. lib/logo.ts),
 * იხატება ორიგინალი ფაილი. წინააღმდეგ შემთხვევაში — ჩაშენებული
 * ვექტორული ნიშანი: ნახევარმთვარისებრი რგოლი და ორსული ქალის სილუეტი.
 */
export function LogoMark({
  className,
  src,
  detail = "var(--color-cream-100)",
}: {
  className?: string;
  src?: string | null;
  detail?: string;
}) {
  if (src) {
    return (
      <span className={cn("relative block", className)}>
        <Image src={src} alt="" fill sizes="64px" className="object-contain" priority />
      </span>
    );
  }

  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
      {/* ნახევარმთვარისებრი რგოლი — მარჯვნივ ღიაა */}
      <path
        d="M179.6 91.6A80 80 0 1 0 179.6 108.4L175.6 107.5A72 72 0 1 1 175.6 92.5Z"
        fill="currentColor"
      />

      {/* ფიგურის სილუეტი — პროფილი მარჯვნივ, დიდი მუცელი, თმა ზურგზე */}
      <path
        d="M110 41C117 39 123 41 124 47C125 51 120 53 117 57C115 62 114 66 115 70C118 73 121 76 119 79C118 81 115 81 113 82C114 85 116 87 114 90C112 93 108 94 107 97C106 102 110 105 116 109C128 116 139 124 143 135C147 145 141 154 131 157C122 159 112 159 103 159C93 159 84 158 78 155C75 153 73 149 73 145C70 132 67 118 67 104C67 88 70 68 80 55C88 45 98 41 110 41Z"
        fill="currentColor"
      />

      <g
        stroke={detail}
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M97 48C107 53 112 60 111 67C110 76 104 81 102 86C100 91 99 95 99 98" />
        <path d="M95 57C86 71 81 89 80 107C79 120 80 133 82 142" />
        <path d="M102 95C110 100 115 108 116 117" />
        <path d="M94 151C105 158 118 158 128 151" />
        <path d="M106 120C106 113 112 109 119 110C126 112 130 118 128 124C126 130 120 133 114 131C109 129 106 125 106 120Z" />
        <path d="M118 143C124 143 129 147 129 152C129 157 124 160 119 159C114 158 111 154 112 149C112 146 115 143 118 143Z" />
      </g>
    </svg>
  );
}

export function Logo({
  locale,
  className,
  compact = false,
  src,
}: {
  locale: Locale;
  className?: string;
  compact?: boolean;
  src?: string | null;
}) {
  const site = siteFor(locale);

  return (
    <Link
      href="/"
      className={cn("group flex shrink-0 items-center gap-2.5 sm:gap-3", className)}
      aria-label={`${site.logo.line1} ${site.logo.line2}`}
    >
      <LogoMark
        src={src}
        className={cn(
          "shrink-0 text-brand-700 transition-transform duration-300 group-hover:scale-105",
          compact ? "h-9 w-9" : "h-[38px] w-[38px] sm:h-[42px] sm:w-[42px]",
        )}
      />
      <span
        className={cn(
          "whitespace-nowrap font-bold leading-[1.2] tracking-tight text-ink-900",
          compact ? "text-[0.875rem]" : "text-[0.8125rem] sm:text-[0.9375rem] 2xl:text-[1.0625rem]",
        )}
      >
        <span className="block whitespace-nowrap">{site.logo.line1}</span>
        <span className="block whitespace-nowrap">{site.logo.line2}</span>
      </span>
    </Link>
  );
}
