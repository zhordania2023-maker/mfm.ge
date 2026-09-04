"use client";

import { useState } from "react";
import type { ClinicalCase } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { Icon } from "@/components/ui/Icon";
import { cn, formatDate } from "@/lib/utils";

export function CaseQuiz({ locale, item }: { locale: Locale; item: ClinicalCase }) {
  const dict = t(locale);
  const [picked, setPicked] = useState<number | null>(null);
  const revealed = picked !== null;
  const correctIndex = item.options.findIndex((o) => o.correct);

  return (
    <article id={item.slug} className="card overflow-hidden scroll-mt-28">
      <div className="border-b border-line bg-cream-100 px-6 py-5 sm:px-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="badge bg-brand-700 text-white">#{item.number}</span>
          <span className="badge bg-cream-300 text-ink-600">{item.topic}</span>
          <span className="ml-auto text-xs text-ink-500">{formatDate(item.date, locale)}</span>
        </div>
        <h2 className="mt-3 text-xl leading-snug">{item.title}</h2>
      </div>

      <div className="space-y-6 px-6 py-7 sm:px-8">
        <section>
          <p className="text-xs font-bold uppercase tracking-wide text-ink-400">
            {dict.cases.presentation}
          </p>
          <p className="mt-2.5 leading-relaxed text-ink-700">{item.presentation}</p>
        </section>

        <section>
          <p className="font-semibold text-ink-900">{item.question}</p>
          <ul className="mt-4 space-y-2.5">
            {item.options.map((o, i) => {
              const isCorrect = i === correctIndex;
              const isPicked = i === picked;
              return (
                <li key={o.label}>
                  <button
                    onClick={() => !revealed && setPicked(i)}
                    disabled={revealed}
                    className={cn(
                      "flex w-full items-start gap-3.5 rounded-2xl border p-4 text-left text-[0.9375rem] leading-relaxed transition",
                      !revealed && "border-line-strong hover:border-brand-400 hover:bg-cream-100",
                      revealed && isCorrect && "border-brand-600 bg-brand-50 text-ink-900",
                      revealed && isPicked && !isCorrect && "border-clay-300 bg-clay-100",
                      revealed && !isCorrect && !isPicked && "border-line opacity-55",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                        revealed && isCorrect
                          ? "bg-brand-600 text-white"
                          : revealed && isPicked
                            ? "bg-clay-300 text-ink-900"
                            : "bg-cream-300 text-ink-600",
                      )}
                    >
                      {revealed && isCorrect ? (
                        <Icon name="check" size={12} strokeWidth={3} />
                      ) : revealed && isPicked ? (
                        <Icon name="close" size={12} strokeWidth={3} />
                      ) : (
                        String.fromCharCode(65 + i)
                      )}
                    </span>
                    <span>{o.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        {revealed && (
          <div className="animate-fade-in space-y-5 border-t border-line pt-6">
            <section>
              <p className="text-xs font-bold uppercase tracking-wide text-brand-600">{dict.cases.discussion}</p>
              <p className="mt-2.5 leading-relaxed text-ink-700">{item.discussion}</p>
            </section>

            <div className="rounded-2xl bg-brand-50 p-5">
              <p className="flex items-center gap-2 text-sm font-bold text-brand-800">
                <Icon name="sparkle" size={15} />
                {dict.cases.takeaway}
              </p>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-700">{item.takeaway}</p>
            </div>

            <button onClick={() => setPicked(null)} className="btn btn-outline btn-sm">
              {dict.common.tryAgain}
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
