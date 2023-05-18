import * as glob from "glob";
import { defineConfig } from "vite";

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

export default defineConfig(async () => {
  const mdx = (await import("@mdx-js/rollup")).default;
  const remarkFrontmatter = (await import("remark-frontmatter")).default;
  const remarkGfm = (await import("remark-gfm")).default;
  const remarkMdxFrontmatter = (await import("remark-mdx-frontmatter")).default;
  // const remarkCodeMeta = (await import("remark-code-meta")).default;
  const rehypePrism = (await import("mdx-prism")).default;
  const rehypePrismPlus = (await import("rehype-prism-plus")).default;
  const remarkMermaidDataurl = (await import("remark-mermaid-dataurl")).default;

  return {
    appType: "mpa",
    esbuild: {
      jsxFactory: "createElementJsx",
      jsxFragment: "FragmentInstance",
      jsxInject: `import { createElementJsx, FragmentInstance } from "@elf-framework/sapa"`,
    },
    ssr: true,
    root: path.resolve(__dirname, PAGES_DIR),
    build: {
      minify: false,
      sourcemap: false,
      emptyOutDir: true,
      outDir: path.join(__dirname, "../../docs"),
      rollupOptions: {
        cache: false,
        input: {
          // ui: path.resolve(__dirname, "index.html"),
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
    plugins: [
      {
        enforce: "pre",
        ...mdx({
          jsxRuntime: "classic",
          pragma: "sapa.createElementJsx",
          pragmaFrag: "sapa.FragmentInstance",
          pragmaImportSource: "@elf-framework/sapa",
          remarkPlugins: [
            remarkGfm,
            remarkFrontmatter,
            remarkMdxFrontmatter,
            remarkMermaidDataurl,
          ],
          rehypePlugins: [rehypePrism, rehypePrismPlus],
        }),
      },
    ],
  };
});
