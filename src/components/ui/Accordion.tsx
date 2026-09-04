"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export function Accordion({
  items,
  idPrefix = "q",
}: {
  items: { q: string; a: string }[];
  idPrefix?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={item.q} id={`${idPrefix}-${i}`} className="card overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="flex w-full items-start gap-4 px-6 py-5 text-left transition hover:bg-cream-100"
          >
            <span className="flex-1 text-[1.0625rem] font-semibold leading-snug text-ink-900">
              {item.q}
            </span>
            <span
              className={cn(
                "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition",
                open === i ? "bg-brand-700 text-white" : "bg-cream-200 text-ink-600",
              )}
            >
              <Icon
                name="chevron-down"
                size={15}
                className={cn("transition-transform", open === i && "rotate-180")}
              />
            </span>
          </button>
          {open === i && (
            <div className="animate-fade-in border-t border-line px-6 py-5">
              <p className="leading-relaxed text-ink-600">{item.a}</p>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
