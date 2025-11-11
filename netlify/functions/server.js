import { createRequestHandler } from "@netlify/remix-adapter";
import * as build from "../../build/server/index.js";

const handler = createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
});

export default handler;

// Handle all page/route requests
// Static assets from build/client are served automatically by Netlify
// This function only receives requests that don't match static files
export const config = {
  path: "/*",
};


