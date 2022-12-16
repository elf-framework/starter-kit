import { basename, dirname, extname } from "path";

import {
  generateMarkdownMetaFile,
  getHtmlFilePath,
  getJsxFilePath,
  getMetaFilePath,
  makeMetaTags,
  readContent,
  writeContent,
} from "./utils";

export function makeMdxFile(rootDir, realpath) {
  const docFile = realpath;
  const relativeDocFile = docFile.replace(rootDir, "");

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
  let startJsxFile = getJsxFilePath(entryFilePath);
  const metaFile = getMetaFilePath(entryFilePath);
  let layouts = {};

  // load template file contents
  const indexTemplate = readContent("./build/template/index.html");

  // jsx page template
  const startTemplate = readContent("./build/template/start.jsx");

  if (entryExtName !== ".mdx") {
    // throw new Error("not mdx file");
    return;
  }

  // mdx 일 경우 meta.json 파일을 생성한다.
  // create meta.json file
  const meta = generateMarkdownMetaFile(
    entryRelativeFileName,
    entryFilePath,
    layouts
  );

  // create index.html file
  writeContent(htmlFile, indexTemplate, {
    meta: makeMetaTags(meta),
    entryFileName: "./" + entryFileName + ".jsx",
  });

  // create start page jsx file
  writeContent(startJsxFile, startTemplate, {
    filename: entryRelativeFileName,
    applicationFilePath: "./" + entryBaseName,
  });
}
