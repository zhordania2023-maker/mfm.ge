"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { Locale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { cn } from "@/lib/utils";

export function BackToTop({ locale }: { locale: Locale }) {
  const [show, setShow] = useState(false);
  const dict = t(locale);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={dict.common.backToTop}
      className={cn(
        "fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-brand-700 text-white shadow-lg transition-all duration-300 hover:bg-brand-800",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <Icon name="arrow-up" size={18} />
    </button>
  );
}
