import chokidar from "chokidar";

import path from "path";

import { layouts } from "../constants/layouts";
import { makeJsxFile } from "./functions/makeJsxFile";
import { makeMdxFile } from "./functions/makeMdxFile";
// import { removeFile } from "./functions/utils"

const PROJECT_ROOT = path.resolve(__dirname, "..");
const PROJECT_ROOT_DIR = PROJECT_ROOT + "/";
const PROJECT_PAGES_DIR = "pages/";

const JSX_EXT = "tsx";
const VIEW_PAGE_JSX_EXTENSION = ".page." + JSX_EXT;
const VIEW_PAGE_MDX_EXTENSION = ".mdx";

function generateHtmlFile(realpath, options) {
  if (realpath.endsWith(VIEW_PAGE_JSX_EXTENSION)) {
    // *.page.jsx 파일 기준 생성
    makeJsxFile(PROJECT_ROOT_DIR, realpath, {
      layouts,
      jsxExt: JSX_EXT,
      ...options,
    });
  }

  if (realpath.endsWith(VIEW_PAGE_MDX_EXTENSION)) {
    // .mdx 파일 기준 생성
    makeMdxFile(PROJECT_ROOT_DIR, realpath, {
      layouts,
      jsxExt: JSX_EXT,
      ...options,
    });
  }
}

/**
 * pages/ 디렉토리를 가지고 있는지 체크
 */
function isPagesDirectory(path) {
  return path.replace(PROJECT_ROOT_DIR, "").startsWith(PROJECT_PAGES_DIR);
}

export function autoViewGenerator(options) {
  let command, config, rootDir;
  let watcher;
  return [
    {
      name: "mdx-generator",
      enforce: "pre",
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
              generateHtmlFile(path, options);
            })
            .on("change", async function (path) {
              if (isPagesDirectory(path) === false) return;
              //   console.log("File", path, "has been changed");
              generateHtmlFile(path, options);
            })
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
