import { createRequestHandler } from "@netlify/remix-adapter";
import * as build from "../../build/server/index.js";

const handler = createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
});

export default handler;

// Exclude static files from being handled by this function
// Only route actual app paths to Remix
export const config = {
  path: [
    "/*",
    "!/assets/*",
    "!/draco/*",
    "!/static/*",
    "!/favicon.*",
    "!/manifest.json",
    "!/robots.txt",
    "!/sitemap.xml",
    "!/humans.txt",
  ],
};



