#!/usr/bin/env node
/**
 * Ensure manifest files are available for SSR
 * Copies client manifest to server build so Remix can access it at runtime
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const clientManifest = path.join(root, 'build', 'client', 'manifest.json');
const serverManifestDir = path.join(root, 'build', 'server', '.vite');
const serverManifestFile = path.join(serverManifestDir, 'manifest.json');

try {
  // Ensure server .vite dir exists
  if (!fs.existsSync(serverManifestDir)) {
    fs.mkdirSync(serverManifestDir, { recursive: true });
  }

  // Copy client manifest to server
  if (fs.existsSync(clientManifest)) {
    fs.copyFileSync(clientManifest, serverManifestFile);
    console.log(`✓ Copied client manifest to server (${clientManifest} -> ${serverManifestFile})`);
  } else {
    console.warn(`⚠ Client manifest not found at ${clientManifest}`);
  }

  // Verify both exist
  const clientExists = fs.existsSync(clientManifest);
  const serverExists = fs.existsSync(serverManifestFile);
  if (clientExists && serverExists) {
    console.log('✓ Both client and server manifests are available.');
  }
} catch (err) {
  console.error('Error ensuring manifest:', err.message);
  process.exitCode = 1;
}
