import { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blog";

const BASE_URL = "https://www.rajaniket.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllSlugs();

  const blogEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogEntries,
  ];
}
