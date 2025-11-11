import { createRequestHandler } from "@netlify/remix-adapter";
import * as build from "../../build/server/index.js";

const handler = createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
});

export default handler;

// Configure function to only handle non-static routes
// Static assets (CSS, JS, images, fonts) should be served directly by Netlify
export const config = {
  path: [
    "/*",
  ],
  // Exclude static asset paths
  excludedPath: [
    "/assets/*",
    "/draco/*",
    "/static/*",
    "/favicon.ico",
    "/favicon.svg",
    "/manifest.json",
    "/robots.txt",
    "/sitemap.xml",
    "/humans.txt",
  ],
};


