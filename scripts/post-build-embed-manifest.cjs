#!/usr/bin/env node
/**
 * Embed Vite SSR manifest into server bundle.
 * Writes the SSR manifest as a JS module so Netlify function always has it,
 * regardless of file packaging order or cache behavior.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
// Vite generates ssr-manifest.json in .vite/ for SSR usage
const clientSsrManifestPath = path.join(root, 'build', 'client', '.vite', 'ssr-manifest.json');
const serverManifestModulePath = path.join(root, 'build', 'server', 'manifest.server.js');

try {
  // Read the client SSR manifest
  if (!fs.existsSync(clientSsrManifestPath)) {
    console.warn(`⚠ Client SSR manifest not found at ${clientSsrManifestPath}`);
    process.exitCode = 0;
    process.exit(0);
  }

  const manifest = JSON.parse(fs.readFileSync(clientSsrManifestPath, 'utf-8'));

  // Validate it's the Vite SSR manifest (contains /assets/ entries)
  const isValidManifest = Object.values(manifest).some(value => {
    return Array.isArray(value) && value.some(item => typeof item === 'string' && item.includes('/assets/'));
  });

  if (!isValidManifest) {
    console.error('✗ Error: .vite/ssr-manifest.json does not appear to be a valid Vite SSR manifest.');
    console.error('  Check that build/client/.vite/ssr-manifest.json contains asset mappings.');
    process.exitCode = 1;
    process.exit(1);
  }

  // Write as ES module (so it can be imported by Remix server)
  const moduleContent = `export default ${JSON.stringify(manifest, null, 2)};`;
  fs.writeFileSync(serverManifestModulePath, moduleContent, 'utf-8');

  console.log(`✓ Embedded Vite SSR manifest to ${serverManifestModulePath}`);
  console.log(`✓ Server will use this manifest for SSR link injection.`);
} catch (err) {
  console.error('✗ Error embedding manifest:', err.message);
  process.exitCode = 1;
}
