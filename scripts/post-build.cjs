#!/usr/bin/env node
/**
 * Post-build script: Copy server assets to client for Netlify deployment.
 * Ensures CSS and other assets from build/server/assets are available as static files.
 * Also ensures _headers file is copied from public/ to build/client/
 */
const fs = require('fs');
const path = require('path');

const serverAssetsDir = path.join(__dirname, '..', 'build', 'server', 'assets');
const clientAssetsDir = path.join(__dirname, '..', 'build', 'client', 'assets');
const publicHeadersPath = path.join(__dirname, '..', 'public', '_headers');
const clientHeadersPath = path.join(__dirname, '..', 'build', 'client', '_headers');

// Ensure client assets directory exists
if (!fs.existsSync(clientAssetsDir)) {
  fs.mkdirSync(clientAssetsDir, { recursive: true });
}

// Copy all files from server assets to client assets
if (fs.existsSync(serverAssetsDir)) {
  const files = fs.readdirSync(serverAssetsDir);
  files.forEach((file) => {
    const src = path.join(serverAssetsDir, file);
    const dest = path.join(clientAssetsDir, file);
    const stat = fs.statSync(src);
    
    if (stat.isFile()) {
      fs.copyFileSync(src, dest);
      console.log(`✓ Copied ${file}`);
    }
  });
  console.log(`✓ Post-build: Copied server assets to client (${files.length} files)`);
} else {
  console.warn(`⚠ Server assets directory not found: ${serverAssetsDir}`);
}

// Ensure _headers file is copied from public/ to build/client/
// Vite should copy this automatically, but we ensure it's up to date
if (fs.existsSync(publicHeadersPath)) {
  fs.copyFileSync(publicHeadersPath, clientHeadersPath);
  console.log(`✓ Ensured _headers file is up to date in build/client/`);
} else {
  console.warn(`⚠ _headers file not found in public/: ${publicHeadersPath}`);
}

// Ensure _redirects file is copied from public/ to build/client/
// Vite should copy this automatically, but we ensure it's up to date
const publicRedirectsPath = path.join(__dirname, '..', 'public', '_redirects');
const clientRedirectsPath = path.join(__dirname, '..', 'build', 'client', '_redirects');
if (fs.existsSync(publicRedirectsPath)) {
  fs.copyFileSync(publicRedirectsPath, clientRedirectsPath);
  console.log(`✓ Ensured _redirects file is up to date in build/client/`);
} else {
  console.warn(`⚠ _redirects file not found in public/: ${publicRedirectsPath}`);
}
