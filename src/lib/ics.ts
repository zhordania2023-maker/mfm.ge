import type { MfmEvent } from "@/content/types";

function stamp(iso: string) {
  return iso.replace(/-/g, "");
}

function esc(text: string) {
  return text.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
}

/** მარტივი VCALENDAR სრული დღის ღონისძიებისთვის */
export function buildIcs(event: MfmEvent, origin = "https://mfm.ge") {
  const start = stamp(event.start);
  const endDate = new Date((event.end ?? event.start) + "T00:00:00");
  endDate.setDate(endDate.getDate() + 1); // DTEND არის ექსკლუზიური
  const end = stamp(endDate.toISOString().slice(0, 10));

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//MFM Georgia//mfm.ge//KA",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.slug}@mfm.ge`,
    `DTSTART;VALUE=DATE:${start}`,
    `DTEND;VALUE=DATE:${end}`,
    `SUMMARY:${esc(event.title)}`,
    `DESCRIPTION:${esc(event.excerpt)}`,
    `LOCATION:${esc(event.location)}`,
    `URL:${origin}/events/${event.slug}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.join("\r\n");
}

export function icsDataUrl(event: MfmEvent, origin?: string) {
  const body = buildIcs(event, origin);
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(body)}`;
}
