import { createRequestHandler } from "@netlify/remix-adapter";
import * as build from "../../build/server/index.js";
// Import the embedded Vite asset manifest so SSR can inject correct link tags
import manifestFromServer from "../../build/server/manifest.server.js";

const handler = createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
  // Provide the manifest to Remix so it generates correct <link> tags for CSS
  manifest: manifestFromServer || undefined,
});

export default handler;

// Netlify will serve static files from publish folder before routing to function
// This function handles all remaining routes (app paths)
// Static files are served automatically before this function is invoked
export const config = {
  path: "/*",
  // Include the Vite manifest in the function bundle so Remix can access it at runtime
  assets: ["../../build/server/.vite/manifest.json"],
};



