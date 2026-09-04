import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next-ის დეველოპერული ინდიკატორი (შავი წრე კუთხეში) — გამორთული
  devIndicators: false,
  // პროექტი OneDrive-ის საქაღალდეშია; ფესვს ცალსახად ვუთითებთ, რომ
  // Turbopack-მა ზემოთ მდებარე package-lock.json არ აიღოს.
  turbopack: {
    root: path.resolve(process.cwd()),
  },
  images: {
    // ფოტოები Unsplash-ის CDN-იდან (უფასო ლიცენზია)
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    // სარეზერვო ლოკალური SVG ილუსტრაციები
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
