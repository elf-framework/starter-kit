import * as glob from "glob";
import { defineConfig } from "vite";
import sapa from "vite-plugin-sapa";

import path from "path";

const entries = {};
const PAGES_DIR = "pages/";
const pages = path.join(PAGES_DIR, "**/*.html");
const files = glob.sync(pages, {
  dot: true,
  // node_modules 은 검색대상에서 제외
  ignore: ["node_modules/**"],
});

files.forEach((it) => {
  const file = it;
  const entryFileName = file.replace(PAGES_DIR, "").replace(".html", "");
  entries[entryFileName] = path.resolve(__dirname, it);
});

import { autoViewGenerator } from "./build/auto-view-generator";

export default defineConfig(async () => {
  const mdx = (await import("@mdx-js/rollup")).default;
  const remarkFrontmatter = (await import("remark-frontmatter")).default;
  const remarkGfm = (await import("remark-gfm")).default;
  const remarkMdxFrontmatter = (await import("remark-mdx-frontmatter")).default;
  // const remarkCodeMeta = (await import("remark-code-meta")).default;
  const rehypePrism = (await import("mdx-prism")).default;
  const rehypePrismPlus = (await import("rehype-prism-plus")).default;
  const remarkParse = (await import("remark-parse")).default;
  const { unified } = await import("unified");

  return {
    appType: "mpa",
    server: {
      hmr: {
        protocol: "ws",
        host: "localhost",
      },
      watch: {
        usePolling: true,
        ignored: ["!**/node_modules/@elf-framework/**"],
      },
    },
    esbuild: {
      jsx: "transform",
      jsxFactory: "createElementJsx",
      jsxFragment: "FragmentInstance",
      jsxInject: `import { createElementJsx, FragmentInstance } from "@elf-framework/sapa"`,
    },
    root: path.resolve(__dirname, PAGES_DIR),
    publicDir: path.resolve(__dirname, "public"),
    build: {
      write: true,
      outDir: "dist",
      minify: false,
      manifest: true,
      rollupOptions: {
        input: {
          index: path.resolve(__dirname, "index.html"),
          ...entries,
        },
      },
    },
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./"),
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", "md", "mdx"],
    },
    optimizeDeps: {
      exclude: [
        "@elf-framework/sapa",
        "@elf-framework/ui",
        "@elf-framework/icon",
        "@elf-framework/sapa-router",
        "@elf-framework/design-tokens",
        "@elf-framework/design-system",
      ],
    },
    plugins: [
      sapa(),
      autoViewGenerator({
        mdxParser: remarkParse,
        unified,
      }),
      mdx({
        jsxRuntime: "classic",
        pragma: "sapa.createElementJsx",
        pragmaFrag: "sapa.FragmentInstance",
        pragmaImportSource: "@elf-framework/sapa",
        remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
        rehypePlugins: [rehypePrism, rehypePrismPlus],
      }),
    ],
  };
});
