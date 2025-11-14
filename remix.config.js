/**
 * Remix + Vite configuration
 * The serverDependenciesToBundle was removed as it conflicted with Vite's dependency optimization
 * Vite now handles all dependencies correctly in ESM mode
 */
/** @type {import('@remix-run/dev').AppConfig} */
export default {
  appDirectory: 'app',
  assetsBuildDirectory: 'public/build',
  publicPath: '/build/',
  serverBuildPath: 'build/index.js',
  serverModuleFormat: 'esm',
  tailwind: true,
};

