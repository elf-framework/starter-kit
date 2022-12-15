import chokidar from "chokidar";
import fm from "front-matter";
// import * as glob from "glob";

import { existsSync, readFileSync, unlinkSync, writeFileSync } from "fs";
import path, { basename, dirname, extname } from "path";

import { layouts } from "../constants/layouts";

function writeContent(file, content) {
  return writeFileSync(file, content, { encoding: "utf-8" });
}

function readContent(file) {
  return readFileSync(file, {
    encoding: "utf-8",
  });
}

function ucwords(str) {
  return str.replace(/[_-]/g, " ").replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase();
  });
}

function getFilePath(realPath, ext) {
  const entryBaseName = basename(realPath, extname(realPath));
  const entryDirName = dirname(realPath);
  return path.resolve(entryDirName, entryBaseName + ext);
}

function getMetaFilePath(realPath) {
  return getFilePath(realPath, ".meta.json");
}

function getHtmlFilePath(realPath) {
  return getFilePath(realPath, ".html");
}

function getJsxFilePath(realPath) {
  return getFilePath(realPath, ".jsx");
}

function getTitle(realPath) {
  const entryBaseName = basename(realPath, extname(realPath));

  if (entryBaseName === "index") {
    return ucwords(basename(dirname(realPath)));
  }

  return ucwords(entryBaseName);
}

function removeFile(file) {
  if (existsSync(file)) {
    unlinkSync(file);
  }
}

function wrapTime(info) {
  const newInfo = Object.assign(
    {
      createdAt: new Date().getTime(),
    },
    info,
    {
      updatedAt: new Date().getTime(),
    }
  );

  return JSON.stringify(newInfo, null, 4);
}

function makeMetaTags({ meta: metaResult = {} }) {
  const metaTags = [];

  Object.keys(metaResult).forEach((key) => {
    const value = metaResult[key];
    switch (key) {
      case "ldjson":
        metaTags.push(
          `<script type="application/ld+json">${JSON.stringify(value)}</script>`
        );
        break;
      case "title":
        metaTags.push(`<title>${value}</title>`);
        break;
      case "og":
        Object.keys(value).forEach((ogKey) => {
          metaTags.push(
            `<meta property="og:${ogKey}" content="${value[ogKey]}" />`
          );
        });
        break;
      case "link":
        value.forEach((link) => {
          const attributes = Object.entries(link)
            .map(([key, value]) => {
              return `${key}="${value}"`;
            })
            .join(" ");
          metaTags.push(`<link ${attributes} />`);
        });
        break;
      default:
        metaTags.push(`<meta name="${key}" content="${value}" />`);
        break;
    }
  });

  return metaTags.join("\r\n\t\t");
}

// entryFilePath: realPath
// file: relative path
function generateMarkdownMetaFile(entryRelativeFileName, entryFilePath) {
  const mdxContent = readContent(entryFilePath);
  const mdxResult = fm(mdxContent);

  // github source link
  const metaFile = getMetaFilePath(entryFilePath);

  let metaResult = mdxResult.attributes;

  if (metaResult) {
    // meta auto generate

    if (existsSync(metaFile) === false) {
      writeContent(metaFile, wrapTime(metaResult));
    }
  } else {
    metaResult = {
      description: "",
      keywords: "",
    };
  }

  let hasChangedMetaInfo = false;

  if (!metaResult.title) {
    metaResult.title = getTitle(entryFilePath);

    hasChangedMetaInfo = true;
  }

  // layout 이 없을 때는 path 에 맞는 layout 을 미리 지정한다.
  if (!metaResult.layout) {
    metaResult.layout = "BlankLayout"; // default layout
    Object.entries(layouts).forEach(([key, value]) => {
      if (entryRelativeFileName.startsWith(key)) {
        metaResult.layout = value;
      }
    });

    hasChangedMetaInfo = true;
  }

  if (hasChangedMetaInfo) {
    writeContent(metaFile, wrapTime(metaResult));

    // update mdx frontmatter

    const newMdxContent = `---
${Object.entries(metaResult)
  .map(([key, value]) => {
    return `${key}: ${value}`;
  })
  .join("\n")}
---
  
${mdxResult.body}`;

    writeContent(entryFilePath, newMdxContent);
  }

  // meta 정보 읽어서 다시 갱신
  const metaContent = readContent(metaFile);
  const localMetaResult = JSON.parse(metaContent);

  // if (JSON.stringify(metaResult) !== metaContent) {
  writeContent(
    metaFile,
    wrapTime({
      ...localMetaResult,
      ...metaResult,
    })
  );
  // }

  return {
    ...metaResult,
    body: mdxResult.body,
  };
}

function generateHtmlFile(realpath) {
  const docFile = realpath;
  const relativeDocFile = docFile.replace(PAGE_ROOT_DIR, "");

  let entryRelativeFileName = relativeDocFile;
  let entryFilePath = docFile;
  let entryDirName = dirname(entryRelativeFileName);
  let entryBaseName = basename(entryRelativeFileName);
  let entryFileName = basename(
    entryRelativeFileName,
    extname(entryRelativeFileName)
  );
  let entryExtName = extname(entryRelativeFileName);
  let htmlFile = getHtmlFilePath(entryFilePath);
  let jsxFile = getJsxFilePath(entryFilePath);

  // mdx 일 경우 meta.json 파일을 생성한다.
  if (entryExtName === ".mdx") {
    // create meta.json file
    const meta = generateMarkdownMetaFile(
      entryRelativeFileName,
      entryFilePath,
      entryDirName,
      entryBaseName,
      entryExtName
    );

    const { ldjson = {} } = meta;

    // create index.html file
    let content = indexTemplate;

    // meta auto generate
    content = content.replace("{{meta}}", makeMetaTags(meta));

    content = content.replace(
      "{{ldjson}}",
      JSON.stringify({
        "@context": "https://json-ld.org/contexts/person.jsonld",
        ...ldjson,
      })
    );

    content = content.replace(
      "{{entryFileName}}",
      "./" + entryFileName + ".jsx"
    );

    writeContent(htmlFile, content);

    // create page.jsx file
    //   if (!existsSync(pageFile)) {
    let page = pageTemplate;

    page = page.replace("{{filename}}", entryRelativeFileName);
    page = page.replace("{{mdxFilePath}}", "./" + entryBaseName);
    writeContent(jsxFile, page);
  } else if (entryExtName === ".jsx" || entryExtName === ".tsx") {
    // mdx 가 있으면 mdx 가 처리하도록 넘어간다.
    const mdxFile = getFilePath(entryFilePath, ".mdx");

    if (existsSync(mdxFile)) {
      return;
    }

    // mdx 가 없으면 jsx 를 기준으로 html 을 변화시킨다.

    // create index.html file
    let content = indexTemplate;
    const title =
      entryBaseName === "index"
        ? ucwords(basename(entryDirName))
        : ucwords(entryBaseName);
    // meta auto generate
    content = content.replace(
      "{{meta}}",
      makeMetaTags({
        title,
      })
    );

    content = content.replace(
      "{{entryFileName}}",
      "./" + entryFileName + entryExtName
    );

    writeContent(htmlFile, content);
  } else if (entryExtName === ".html") {
    // noop
    // html 은 그대로를 표현하기 때문에 따로 파일을 생성하지 않는다.
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

// load template file contents
const indexTemplate = readContent("./build/template/index.html");
const pageTemplate = readContent("./build/template/page.jsx");

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
            .on("unlink", function (path) {
              if (isPagesDirectory(path) === false) return;
              console.log("File", path, "has been removed");
              const dir = dirname(path);
              //   const filename = basename(path);
              const name = basename(path, extname(path));

              removeFile(dir + "/" + name + ".html");
              removeFile(dir + "/" + name + ".jsx");
              removeFile(dir + "/" + name + ".mdx");
              removeFile(dir + "/" + name + ".meta.json");

              //   makeIndexEntries();
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
