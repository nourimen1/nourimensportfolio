import { createRequestHandler } from "@netlify/remix-adapter";
import * as build from "../../build/server/index.js";

const handler = createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
});

export default handler;

// Netlify will serve static files from publish folder before routing to function
// This function handles all remaining routes (app paths)
export const config = {
  path: "/*",
  // Include the Vite manifest in the function bundle so Remix can access it at runtime
  assets: ["../../build/server/.vite/manifest.json"],
};



