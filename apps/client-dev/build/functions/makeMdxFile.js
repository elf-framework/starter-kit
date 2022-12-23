import { existsSync } from "fs";
import { basename, extname } from "path";

import {
  generateMarkdownMetaFile,
  getHtmlFilePath,
  getJsxFilePath,
  getMetaFilePath,
  makeMetaTags,
  readContent,
  writeContent,
} from "./utils";

export async function makeMdxFile(rootDir, realpath, options = {}) {
  const JSX_EXT = options.jsxExt || "jsx";

  const docFile = realpath;
  const relativeDocFile = docFile.replace(rootDir, "");

  let entryRelativeFileName = relativeDocFile;
  let entryFilePath = docFile;
  let entryFileName = basename(
    entryRelativeFileName,
    extname(entryRelativeFileName)
  );
  let entryExtName = extname(entryRelativeFileName);
  let htmlFile = getHtmlFilePath(entryFilePath);
  let startJsxFile = getJsxFilePath(entryFilePath, JSX_EXT);
  const metaFile = getMetaFilePath(entryFilePath, JSX_EXT);

  // load template file contents
  const indexTemplate = readContent("./build/template/index.html");

  // jsx page template
  const startTemplate = readContent("./build/template/start." + JSX_EXT);

  if (entryExtName !== ".mdx") {
    // throw new Error("not mdx file");
    return;
  }

  const oldMetaInfo = JSON.parse(readContent(metaFile) || "{}");

  // mdx 일 경우 meta.json 파일을 생성한다.
  // create meta.json file
  const meta = await generateMarkdownMetaFile(
    entryRelativeFileName,
    entryFilePath,
    options.layouts,
    options.mdxParser,
    options.unified
  );

  const oldMetaTags = makeMetaTags(oldMetaInfo);
  const newMetaTags = makeMetaTags(meta);

  // create index.html file
  // meta 태그 기준으로 변경이 있으면 index.html 파일을 다시 생성한다.
  if (oldMetaTags !== newMetaTags) {
    writeContent(htmlFile, indexTemplate, {
      meta: newMetaTags,
      entryFileName: "./" + entryFileName + "." + JSX_EXT,
    });
  }

  // 여긴 한번 생성되면 바뀔일이 없는 듯 하다.
  // create start page jsx file
  if (existsSync(startJsxFile) === false) {
    writeContent(startJsxFile, startTemplate, {
      filename: entryRelativeFileName,
      applicationFilePath: "./" + entryFileName + ".mdx",
      metaFilePath: "./" + entryFileName + ".meta.json",
    });
  }
}
