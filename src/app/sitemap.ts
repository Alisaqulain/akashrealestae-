import type { MetadataRoute } from "next";

const paths = [
  "/",
  "/listings",
  "/about",
  "/services",
  "/faq",
  "/guides",
  "/contact",
  "/privacy",
  "/terms",
  "/rera",
  "/login",
  "/signup",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://akasak.vercel.app";

  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
