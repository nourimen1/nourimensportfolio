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

// Wrap handler to skip static file requests
// This prevents Remix from trying to handle static assets that should be served directly
// If a static file request reaches here, it means Netlify didn't find it, so we return 404
export default async (event, context) => {
  // Extract path from event - Netlify functions can have different event structures
  let path = '';
  if (event.path) {
    path = event.path;
  } else if (event.rawPath) {
    path = event.rawPath;
  } else if (event.url) {
    try {
      const url = new URL(event.url);
      path = url.pathname;
    } catch (e) {
      // If URL parsing fails, try to extract from request
      path = event.request?.url ? new URL(event.request.url).pathname : '';
    }
  }
  
  // Skip processing for static asset requests
  // These patterns match common static file extensions and asset paths
  const isStaticFile = 
    path.startsWith('/assets/') ||
    path.startsWith('/draco/') ||
    path.startsWith('/static/') ||
    path.match(/\.(css|js|woff2?|eot|ttf|otf|png|jpg|jpeg|gif|svg|ico|webp|glb|hdr|wasm|mp4|webm|json|xml|txt|pdf|webmanifest)$/i) ||
    path === '/favicon.ico' ||
    path === '/favicon.svg' ||
    path === '/robots.txt' ||
    path === '/sitemap.xml' ||
    path === '/site.webmanifest' ||
    path === '/humans.txt';
  
  if (isStaticFile) {
    // Return 404 - this prevents Remix from trying to handle the request
    // Netlify should have served the file if it exists, so if we reach here, it doesn't exist
    return {
      statusCode: 404,
      headers: {
        'Content-Type': 'text/plain',
      },
      body: 'Not Found',
    };
  }
  
  return handler(event, context);
};

// Netlify will serve static files from publish folder before routing to function
// This function handles all remaining routes (app paths) via redirects in netlify.toml
// We don't use path config here to avoid catching static file requests
export const config = {
  // Include the Vite manifest in the function bundle so Remix can access it at runtime
  assets: ["../../build/server/.vite/manifest.json"],
};



