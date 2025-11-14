import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from '@remix-run/dev';
import { defineConfig } from 'vite';
import jsconfigPaths from 'vite-jsconfig-paths';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypeImgSize from 'rehype-img-size';
import rehypeSlug from 'rehype-slug';
import rehypePrism from '@mapbox/rehype-prism';

export default defineConfig({
  base: '/',
  assetsInclude: [
    '**/*.glb',
    '**/*.hdr',
    '**/*.glsl',
    '**/*.woff2',
    '**/*.jpg',
    '**/*.png',
    '**/*.svg',
    '**/*.jpeg',
    '**/*.gif',
    '**/*.webp',
    '**/*.ico',
    '**/*.mp4',
  ],
  build: {
    assetsInlineLimit: 1024,
    ssrManifest: true,
    manifest: true,
  },
  server: {
    port: 8888,
  },
  plugins: [
    mdx({
      rehypePlugins: [[rehypeImgSize, { dir: 'public' }], rehypeSlug, rehypePrism],
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      providerImportSource: '@mdx-js/react',
    }),
    // Only use Cloudflare dev proxy when not running on Netlify
    ...(process.env.NETLIFY ? [] : [remixCloudflareDevProxy()]),
    remix(),
    jsconfigPaths(),
  ],
});
