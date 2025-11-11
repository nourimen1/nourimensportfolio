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
