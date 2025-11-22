import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";

const ROUTES = [
  { pathname: "/", changeFrequency: "weekly" as const, priority: 1 },
  { pathname: "/app", changeFrequency: "weekly" as const, priority: 0.9 },
];

const pageFiles = ["page.tsx", "page.ts", "page.jsx", "page.js"];

function hasRoute(pathname: string) {
  const baseAppDir = fs.existsSync(path.join(process.cwd(), "src", "app"))
    ? path.join(process.cwd(), "src", "app")
    : path.join(process.cwd(), "app");

  if (!fs.existsSync(baseAppDir)) return false;

  const segments = pathname === "/" ? [] : pathname.replace(/^\/|\/$/g, "").split("/");
  const routeDir = path.join(baseAppDir, ...segments);

  if (pathname === "/") {
    return pageFiles.some((file) => fs.existsSync(path.join(baseAppDir, file)));
  }

  if (!fs.existsSync(routeDir)) return false;

  return pageFiles.some((file) => fs.existsSync(path.join(routeDir, file)));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://syntablo.hirodevs.com").replace(/\/$/, "");
  const now = new Date();

  return ROUTES.filter(({ pathname }) => hasRoute(pathname)).map(({ pathname, changeFrequency, priority }) => ({
    url: `${base}${pathname}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
