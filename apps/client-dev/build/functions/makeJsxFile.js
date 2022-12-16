import * as acorn from "acorn";
import acornJsx from "acorn-jsx";

// var jsx = require("acorn-jsx");
// var JSXParser = acorn.Parser.extend(jsx());
import { existsSync } from "fs";
import { basename, dirname, extname } from "path";

import {
  getHtmlFilePath,
  getJsxFilePath,
  getMetaFilePath,
  getTitle,
  makeMetaTags,
  readContent,
  wrapTime,
  writeContent,
} from "./utils";

// console.log(acorn, acornJsx);

var JSXParser = acorn.Parser.extend(acornJsx());

class Visitor {
  start(node) {
    this.collects = [];
    this.visitNode(node);
  }

  /* Deal with nodes in an array */
  visitNodes(nodes) {
    for (const node of nodes) this.visitNode(node);
  }
  /* Dispatch each type of node to a function */
  visitNode(node) {
    // console.log(node);
    switch (node.type) {
      case "Program":
        return this.visitProgram(node);
      case "ExportNamedDeclaration":
        return this.visitExportNamedDeclaration(node);
      case "VariableDeclaration":
        return this.visitVariableDeclaration(node);
      case "VariableDeclarator":
        return this.visitVariableDeclarator(node);
      case "Identifier":
        return this.visitIdentifier(node);
      case "Literal":
        return this.visitLiteral(node);
    }
  }
  /* Functions to deal with each type of node */
  visitExportNamedDeclaration(node) {
    node.declaration.declarations.forEach((it) => {
      this.collects.push({
        [it.id.name]: it.init.value,
      });
    });
    // return this.visitNode(node.declaration);
  }
  visitProgram(node) {
    return this.visitNodes(node.body);
  }
  visitVariableDeclaration(node) {
    return this.visitNodes(node.declarations);
  }
  visitVariableDeclarator(node) {
    this.visitNode(node.id);
    return this.visitNode(node.init);
  }
  visitIdentifier(node) {
    return node.name;
  }
  visitLiteral(node) {
    return node.value;
  }

  toJSON() {
    return Object.assign(...this.collects);
  }
}

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
export async function makeJsxFile(rootDir, realpath) {
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
  const startTemplate = readContent("./build/template/start.jsx");

  // page template
  const pageTemplate = readContent("./build/template/page.jsx");

  // create index.html file
  const title = getTitle(entryFilePath, 1);

  writeContent(htmlFile, indexTemplate, {
    meta: makeMetaTags({
      title,
    }),
    entryFileName: "./" + entryFileName + ".jsx",
  });

  // create start jsx
  writeContent(startJsxFile, startTemplate, {
    filename: entryRelativeFileName,
    applicationFilePath: "./" + entryBaseName.replace(".jsx", ".page.jsx"),
  });

  // create page jsx
  // 파일이 존재하지 않을 때만 생성
  if (existsSync(pageJsxFile) === false) {
    writeContent(pageJsxFile, pageTemplate, {
      title,
      pageLayout: "BlankLayout",
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
        pageLayout: "BlankLayout",
      });
      content = readContent(pageJsxFile);
    }

    const parsed = JSXParser.parse(content, {
      ecmaVersion: 2020,
      sourceType: "module",
    });

    visitor.start(parsed);
    Object.assign(metaInfo, visitor.toJSON());
  }

  // create meta json
  writeContent(metaFile, wrapTime(metaInfo));
}
