import type { MetadataRoute } from "next";
import { ka } from "@/content/ka";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/ka/login", "/en/login", "/ka/search", "/en/search"],
      },
    ],
    sitemap: `${ka.site.url}/sitemap.xml`,
  };
}
