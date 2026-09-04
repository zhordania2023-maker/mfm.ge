"use client";

import type { MfmEvent } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { buildIcs } from "@/lib/ics";
import { Icon } from "@/components/ui/Icon";

export function AddToCalendar({ locale, event }: { locale: Locale; event: MfmEvent }) {
  const dict = t(locale);
  function download() {
    const blob = new Blob([buildIcs(event, window.location.origin)], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event.slug}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <button onClick={download} className="btn btn-outline w-full">
      <Icon name="calendar" size={16} />
      {dict.cases.addToCalendar}
    </button>
  );
}
