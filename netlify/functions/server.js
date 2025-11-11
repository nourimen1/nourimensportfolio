import { createRequestHandler } from "@netlify/remix-adapter";
import * as build from "../../build/server/index.js";

const handler = createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
});

export default handler;

// Configure function to only handle routes, not static files
// Netlify automatically serves files from build/client directory
// This config ensures only actual routes get processed by Remix
export const config = {
  // Only handle actual routes - not static files
  // Netlify will serve everything else from the build/client directory
  path: "/*",
};


