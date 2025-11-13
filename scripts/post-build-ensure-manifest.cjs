#!/usr/bin/env node
/**
 * Ensure manifest files are available for SSR
 * Copies client SSR manifest to server build so Remix can access it at runtime
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
// Vite generates ssr-manifest.json in .vite/ (for SSR usage)
const clientSsrManifest = path.join(root, 'build', 'client', '.vite', 'ssr-manifest.json');
const serverManifestDir = path.join(root, 'build', 'server', '.vite');
const serverManifestFile = path.join(serverManifestDir, 'manifest.json');

try {
  // Ensure server .vite dir exists
  if (!fs.existsSync(serverManifestDir)) {
    fs.mkdirSync(serverManifestDir, { recursive: true });
  }

  // Copy client SSR manifest to server
  if (fs.existsSync(clientSsrManifest)) {
    fs.copyFileSync(clientSsrManifest, serverManifestFile);
    console.log(`✓ Copied client SSR manifest to server (${clientSsrManifest} -> ${serverManifestFile})`);
  } else {
    console.warn(`⚠ Client SSR manifest not found at ${clientSsrManifest}`);
  }

  // Verify exists
  const serverExists = fs.existsSync(serverManifestFile);
  if (serverExists) {
    console.log('✓ Server manifest is available.');
  }
} catch (err) {
  console.error('Error ensuring manifest:', err.message);
  process.exitCode = 1;
}

