import fm from "front-matter";
// import parse from "remark-parse";
// import { unified } from "unified";

// import * as glob from "glob";

import { existsSync, readFileSync, unlinkSync, writeFileSync } from "fs";
import path, { basename, dirname, extname } from "path";

export function writeContent(file, content, replaceMap = {}) {
  Object.keys(replaceMap).forEach((key) => {
    const value = replaceMap[key];
    content = content.replace(`{{${key}}}`, value);
  });

  return writeFileSync(file, content, { encoding: "utf-8" });
}

export function readContent(file) {
  if (!existsSync(file)) {
    return "";
  }

  return readFileSync(file, {
    encoding: "utf-8",
  });
}

export function ucwords(str) {
  return str.replace(/[_-]/g, " ").replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase();
  });
}

export function getFilePath(realPath, ext, depth = 0) {
  let entryBaseName = basename(realPath, extname(realPath));

  if (depth > 0) {
    // depth 만큼 이름 잘라내기
    for (let i = 0; i < depth; i++) {
      entryBaseName = basename(entryBaseName, extname(entryBaseName));
    }
  }

  const entryDirName = dirname(realPath);
  return path.resolve(entryDirName, entryBaseName + ext);
}

export function getMetaFilePath(realPath, depth = 0) {
  return getFilePath(realPath, ".meta.json", depth);
}

export function getHtmlFilePath(realPath, depth = 0) {
  return getFilePath(realPath, ".html", depth);
}

export function getJsxFilePath(realPath, ext = "jsx", depth = 0) {
  return getFilePath(realPath, "." + [ext].filter(Boolean).join("."), depth);
}

export function getTitle(realPath, depth = 0) {
  let entryBaseName = basename(realPath, extname(realPath));

  if (depth > 0) {
    // depth 만큼 이름 잘라내기
    for (let i = 0; i < depth; i++) {
      entryBaseName = basename(entryBaseName, extname(entryBaseName));
    }
  }

  if (entryBaseName === "index") {
    return ucwords(basename(dirname(realPath)));
  }

  return ucwords(entryBaseName);
}

export function removeFile(file) {
  if (existsSync(file)) {
    unlinkSync(file);
  }
}

export function wrapTime(info) {
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

export function makeMetaTags({ title, meta: metaResult = {} }) {
  const metaTags = [];

  metaResult.title = metaResult.title || title;

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

export function getLayoutByPath(layouts, entryRelativeFileName) {
  let layout = "BlankLayout"; // default layout
  Object.entries(layouts).forEach(([key, value]) => {
    if (entryRelativeFileName.startsWith(key)) {
      layout = value;
    }
  });

  return layout;
}

export function collectLinks(markdownRoot, links) {
  (markdownRoot.children || []).forEach((node) => {
    if (node.type === "link") {
      links.push({
        title: node.title || node.children[0].value,
        url: node.url,
      });
    } else {
      collectLinks(node, links);
    }
  });
}

// entryFilePath: realPath
// file: relative path
export function generateMarkdownMetaFile(
  entryRelativeFileName,
  entryFilePath,
  layouts,
  mdxParser,
  unified
) {
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
    metaResult.layout = getLayoutByPath(layouts, entryRelativeFileName);

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

  // 요약 정리
  const root = unified().use(mdxParser).parse(mdxResult.body);

  const links = [];
  collectLinks(root, links);

  const summary = root.children
    .filter((it) => it.type === "paragraph")
    .map((it) =>
      it.children
        .filter((it) => it.type === "text")
        .map((it) => it.value)
        .join(" ")
    )
    .join(" ")
    .substring(0, 100);

  // write meta file
  writeContent(
    metaFile,
    wrapTime({
      ...localMetaResult,
      ...metaResult,
      summary,
      links,
      body: mdxResult.body,
    })
  );

  return {
    ...metaResult,
    summary,
    links,
    body: mdxResult.body,
  };
}
