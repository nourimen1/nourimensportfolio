#!/usr/bin/env node
/**
 * Ensure Vite manifest is available to both client and server builds
 * - If server .vite is missing but client .vite exists -> copy client -> server
 * - If client .vite is missing but server .vite exists -> copy server -> client
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const clientViteDir = path.join(root, 'build', 'client', '.vite');
const serverViteDir = path.join(root, 'build', 'server', '.vite');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return false;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
  return true;
}

try {
  const clientExists = fs.existsSync(clientViteDir);
  const serverExists = fs.existsSync(serverViteDir);

  if (clientExists && !serverExists) {
    copyDir(clientViteDir, serverViteDir);
    console.log(`✓ Copied .vite from client to server (${clientViteDir} -> ${serverViteDir})`);
  } else if (serverExists && !clientExists) {
    copyDir(serverViteDir, clientViteDir);
    console.log(`✓ Copied .vite from server to client (${serverViteDir} -> ${clientViteDir})`);
  } else if (serverExists && clientExists) {
    console.log('✓ Both client and server .vite directories exist.');
  } else {
    console.warn('⚠ Neither client nor server .vite directories exist; nothing done.');
  }
} catch (err) {
  console.error('Error ensuring manifest:', err);
  process.exitCode = 1;
}
