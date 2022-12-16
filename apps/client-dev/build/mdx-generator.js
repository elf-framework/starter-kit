import chokidar from "chokidar";

import path, { basename, dirname, extname } from "path";

import { makeJsxFile } from "./functions/makeJsxFile";
import { makeMdxFile } from "./functions/makeMdxFile";
// import { removeFile } from "./functions/utils";

function generateHtmlFile(realpath) {
  if (realpath.endsWith(".page.jsx")) {
    // *.page.jsx 파일 기준 생성
    makeJsxFile(PAGE_ROOT_DIR, realpath);
  }

  if (realpath.endsWith(".mdx")) {
    // .mdx 파일 기준 생성
    makeMdxFile(PAGE_ROOT_DIR, realpath);
  }
}

/**
 * pages/ 디렉토리를 가지고 있는지 체크
 */
function isPagesDirectory(path) {
  return path.replace(PAGE_ROOT_DIR, "").startsWith("pages/");
}

const PAGE_ROOT = path.resolve(__dirname, "..");
const PAGE_ROOT_DIR = PAGE_ROOT + "/";

export function mdxGenerator() {
  let command, config, rootDir;
  let watcher;
  return [
    {
      name: "mdx-generator",
      enforce: "pre",
      async config(config) {
        // const entries = makeIndexEntries();

        config.build.rollupOptions.input = {
          ...config.build.rollupOptions.input,
          // ...entries,
        };

        return config;
      },
      configResolved(resolvedConfig) {
        config = resolvedConfig;
        rootDir = resolvedConfig.root;
        command = resolvedConfig.command;
      },
      buildStart() {
        if (command === "serve") {
          const watchDirFullPath = path.join(
            rootDir,
            config.watchDirectory || "."
          );

          watcher = chokidar.watch(watchDirFullPath, {
            ignoreInitial: true,
          });

          watcher
            .on("add", function (path) {
              if (isPagesDirectory(path) === false) return;

              console.log("File", path, "has been added");
              generateHtmlFile(path);
            })
            .on("change", async function (path) {
              if (isPagesDirectory(path) === false) return;
              //   console.log("File", path, "has been changed");
              generateHtmlFile(path);
            })
            // .on("unlink", function (path) {
            //   if (isPagesDirectory(path) === false) return;
            //   console.log("File", path, "has been removed");

            //   if (path.endsWith(".mdx")) {
            //     const dir = dirname(path);
            //     //   const filename = basename(path);
            //     const name = basename(path, extname(path));

            //     removeFile(dir + "/" + name + ".html");
            //     removeFile(dir + "/" + name + ".jsx");
            //     removeFile(dir + "/" + name + ".mdx");
            //     removeFile(dir + "/" + name + ".meta.json");

            //     //   makeIndexEntries();
            //   } else if (path.endsWith(".page.jsx")) {
            //     const dir = dirname(path);
            //     //   const filename = basename(path);
            //     const name = basename(basename(path, extname(path)));

            //     removeFile(dir + "/" + name + ".html");
            //     removeFile(dir + "/" + name + ".jsx");
            //     removeFile(dir + "/" + name + ".page.jsx");
            //     removeFile(dir + "/" + name + ".meta.json");
            //   }
            // })
            .on("error", function (error) {
              console.error("Error happened", error);
            });
        }
      },
      buildEnd() {
        console.log("build end");
        watcher?.close();
      },
    },
  ];
}
