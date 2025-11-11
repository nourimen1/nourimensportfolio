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
  ]
};
/**
 * Remix config tweaks for Cloudflare Pages runtime.
 * Bundling serverDependenciesToBundle prevents the server build from
 * leaving bare imports that the Pages bundler may ignore as side-effect-free.
 * Adjust the list if you add/remove dependencies that need server bundling.
 */
module.exports = {
  serverDependenciesToBundle: [
    "isbot",
    "@mdx-js/react",
    "@aws-sdk/client-ses",
    "three",
    "three-stdlib",
    "framer-motion"
  ]
};
