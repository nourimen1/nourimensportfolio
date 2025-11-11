/**
 * Remix config: force bundling of certain server deps so Wrangler's bundler
 * doesn't drop them as ignored bare imports (sideEffects: false packages).
 *
 * This helps prevent warnings like:
 *  Ignoring this import because ".../@aws-sdk/client-ses/..." was marked as having no side effects
 */
module.exports = {
  serverDependenciesToBundle: [
    "isbot",
    "@mdx-js/react",
    "@aws-sdk/client-ses",
    "three",
    "three-stdlib",
    "framer-motion"
  ],
  // Use Node runtime for Netlify builds (when NETLIFY env var is set)
  serverBuildTarget: process.env.NETLIFY ? "node" : undefined,
};
