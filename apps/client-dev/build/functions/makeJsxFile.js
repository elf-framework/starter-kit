import * as acorn from "acorn";
import acornJsx from "acorn-jsx";

// var jsx = require("acorn-jsx");
// var JSXParser = acorn.Parser.extend(jsx());
import { existsSync } from "fs";
import { basename, dirname, extname } from "path";

import {
  getHtmlFilePath,
  getJsxFilePath,
  getLayoutByPath,
  getMetaFilePath,
  getTitle,
  makeMetaTags,
  readContent,
  wrapTime,
  writeContent,
} from "./utils";
import { Visitor } from "./Visitor";

// console.log(acorn, acornJsx);

var JSXParser = acorn.Parser.extend(acornJsx());

var visitor = new Visitor();

/**
 * *.page.jsx 파일은 page 를 렌더링 하기 위한 root 로 사용된다.
 *
 * /dir/index.page.jsx 와 /dir/index.mdx 는 같은 역할을 한다.
 *
 * 전체 파일 구조는 아래와 같다.
 *
 * /dir/xxx.html
 * /dir/xxx.jsx
 * /dir/xxx.page.jsx
 * /dir/xxx.meta.json
 *
 * @param {*} realpath
 * @returns
 */
export async function makeJsxFile(rootDir, realpath, options) {
  const docFile = realpath;
  const relativeDocFile = docFile.replace(rootDir, "");

  let entryRelativeFileName = relativeDocFile;
  let entryFilePath = docFile;
  let entryDirName = dirname(entryRelativeFileName);
  let entryBaseName = basename(entryRelativeFileName).replace(".page", "");

  let entryFileName = basename(
    entryRelativeFileName,
    extname(entryRelativeFileName)
  );
  let entryExtName = extname(entryRelativeFileName);
  let htmlFile = getHtmlFilePath(entryFilePath, 1);
  let startJsxFile = getJsxFilePath(entryFilePath, "", 1);
  let pageJsxFile = getJsxFilePath(entryFilePath);
  const metaFile = getMetaFilePath(entryFilePath, 1);

  if (realpath.endsWith(".page.jsx") === false) {
    // throw new Error("not page file");
    return;
  }

  // load template file contents
  const indexTemplate = readContent("./build/template/index.html");

  // jsx page template
  const startTemplate = readContent("./build/template/page.start.jsx");

  // page template
  const pageTemplate = readContent("./build/template/page.jsx");

  // create index.html file
  const title = getTitle(entryFilePath, 1);
  const pageLayout = getLayoutByPath(options.layouts, entryRelativeFileName);

  // create start jsx

  if (existsSync(startJsxFile) === false) {
    writeContent(startJsxFile, startTemplate, {
      filename: entryRelativeFileName,
      applicationFilePath: "./" + entryBaseName.replace(".jsx", ".page.jsx"),
    });
  }

  // create page jsx
  // 파일이 존재하지 않을 때만 생성
  if (existsSync(pageJsxFile) === false) {
    writeContent(pageJsxFile, pageTemplate, {
      title,
      pageLayout,
    });
  }

  let metaInfo = {
    title,
  };

  if (existsSync(pageJsxFile)) {
    let content = readContent(pageJsxFile);

    if (!content.trim()) {
      writeContent(pageJsxFile, pageTemplate, {
        title,
        pageLayout,
      });
      content = readContent(pageJsxFile);
    }

    const parsed = JSXParser.parse(content, {
      ecmaVersion: 2020,
      sourceType: "module",
    });

    visitor.start(parsed);
    Object.assign(metaInfo, visitor.toJSON().frontmatter || {});
  }

  const oldMetaInfo = makeMetaTags(JSON.parse(readContent(metaFile) || "{}"));
  const newMetaInfo = makeMetaTags(metaInfo);

  // 메타 정보가 다를 때만 xxx.html 파일을 생성한다.
  if (oldMetaInfo !== newMetaInfo) {
    writeContent(htmlFile, indexTemplate, {
      meta: makeMetaTags({
        title,
        ...metaInfo,
      }),
      entryFileName: "./" + basename(startJsxFile),
    });
  }

  // *.page.jsx 가 변경되면 meta 정보는 시간을 기록하기 위해서 항상 변경된다.
  // create meta json
  writeContent(metaFile, wrapTime(metaInfo));
}
