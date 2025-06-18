import pages from "@hono/vite-cloudflare-pages";
import build from "@hono/vite-build/cloudflare-pages";
import adapter from "@hono/vite-dev-server/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import honox from "honox/vite";
import client from "honox/vite/client";
import { defineConfig } from "vite";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

const baseConfig = {
  resolve: {
    alias: {
      "@": "/app",
    },
  },
  plugins: [
    mdx({
      jsxImportSource: "hono/jsx",
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    }),
    honox({
      client: {
        input: ["/app/style.css"],
      },
    }),
    build(),
    tailwindcss(),
  ],
};

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      ...baseConfig,
      plugins: [
        mdx({
          jsxImportSource: "hono/jsx",
          remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
        }),
        honox({
          client: {
            input: ["/app/style.css"],
          },
        }),
        client(),
        build(),
        tailwindcss(),
      ],
    };
  } else {
    return {
      ...baseConfig,
      plugins: [
        mdx({
          jsxImportSource: "hono/jsx",
          remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
        }),
        honox({
          devServer: { adapter },
        }),
        pages(),
      ],
      build: {
        ssrEmitAssets: true,
      },
    };
  }
});
