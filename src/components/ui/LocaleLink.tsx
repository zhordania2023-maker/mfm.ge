"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { localeFromPathname, localizeHref } from "@/i18n/config";

type Props = Omit<ComponentProps<typeof NextLink>, "href"> & { href: string };

/**
 * next/link-ის შემცვლელი, რომელიც შიდა ბმულს ავტომატურად ამატებს
 * მიმდინარე ენის პრეფიქსს (/ka/... ან /en/...).
 */
export default function Link({ href, ...rest }: Props) {
  const locale = localeFromPathname(usePathname());
  return <NextLink href={localizeHref(href, locale)} {...rest} />;
}
