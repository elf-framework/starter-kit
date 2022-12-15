import { i as index, s as start, c as createElementJsx, S as Site } from "../../../Site-74be924f.js";
const title = "블로그를  처음 적어보아요.", date = "2022-12-16", layout = "BlogReadLayout", tags = ["hello", "world", "blog", "elf"], account = {
  "imageUrl": "https://avatars.githubusercontent.com/u/1234567?v=4",
  "name": "elf"
};
function _createMdxContent(props2) {
  const _components = Object.assign({
    p: "p",
    h2: "h2",
    pre: "pre",
    code: "code",
    span: "span"
  }, props2.components);
  return index.createElementJsx(index.FragmentInstance, null, index.createElementJsx(_components.p, null, "안녕 여긴 블로그야 그러고보니 컨텐츠가 바뀌면 그것도 정리를 해야하는데 말이지"), "\n", index.createElementJsx(_components.p, null, "어떻게 해야할지 모르겠어"), "\n", index.createElementJsx(_components.p, null, "니가 방법을 제시해줘  알겠어. 일단 내가 해볼게"), "\n", index.createElementJsx(_components.p, null, "코드 적는거 그만하고"), "\n", index.createElementJsx(_components.h2, null, "Hello World"), "\n", index.createElementJsx(_components.pre, {
    className: "language-js language-js"
  }, index.createElementJsx(_components.code, {
    className: "language-js code-highlight"
  }, index.createElementJsx(_components.span, {
    className: "code-line"
  }, index.createElementJsx(_components.span, {
    className: "token console class-name"
  }, "console"), index.createElementJsx(_components.span, {
    className: "token punctuation"
  }, "."), index.createElementJsx(_components.span, {
    className: "token method function property-access"
  }, "log"), index.createElementJsx(_components.span, {
    className: "token punctuation"
  }, "("), index.createElementJsx(_components.span, {
    className: "token string"
  }, "'Hello World'"), index.createElementJsx(_components.span, {
    className: "token punctuation"
  }, ")"), "\n"))), "\n", index.createElementJsx(_components.h2, null, "Hello World"), "\n", index.createElementJsx(_components.pre, {
    className: "language-js language-js"
  }, index.createElementJsx(_components.code, {
    className: "language-js code-highlight"
  }, index.createElementJsx(_components.span, {
    className: "code-line"
  }, index.createElementJsx(_components.span, {
    className: "token console class-name"
  }, "console"), index.createElementJsx(_components.span, {
    className: "token punctuation"
  }, "."), index.createElementJsx(_components.span, {
    className: "token method function property-access"
  }, "log"), index.createElementJsx(_components.span, {
    className: "token punctuation"
  }, "("), index.createElementJsx(_components.span, {
    className: "token string"
  }, "'Hello World'"), index.createElementJsx(_components.span, {
    className: "token punctuation"
  }, ")"), "\n"))), "\n", index.createElementJsx(_components.p, null, "블로글 글을 생성해보자."), "\n", index.createElementJsx(_components.h2, null, "Hello World"), "\n", index.createElementJsx(_components.pre, {
    className: "language-js language-js"
  }, index.createElementJsx(_components.code, {
    className: "language-js code-highlight"
  }, index.createElementJsx(_components.span, {
    className: "code-line"
  }, "\n"), index.createElementJsx(_components.span, {
    className: "code-line"
  }, index.createElementJsx(_components.span, {
    className: "token console class-name"
  }, "console"), index.createElementJsx(_components.span, {
    className: "token punctuation"
  }, "."), index.createElementJsx(_components.span, {
    className: "token method function property-access"
  }, "log"), index.createElementJsx(_components.span, {
    className: "token punctuation"
  }, "("), index.createElementJsx(_components.span, {
    className: "token string"
  }, "'Hello World'"), index.createElementJsx(_components.span, {
    className: "token punctuation"
  }, ")"), "\n"), index.createElementJsx(_components.span, {
    className: "code-line"
  }, "\n"))));
}
function MDXContent(props2 = {}) {
  const { wrapper: MDXLayout } = props2.components || {};
  return MDXLayout ? index.createElementJsx(MDXLayout, props2, index.createElementJsx(_createMdxContent, props2)) : _createMdxContent(props2);
}
const props = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title,
  date,
  layout,
  tags,
  account,
  default: MDXContent
}, Symbol.toStringTag, { value: "Module" }));
const filename = "pages/blog/2022-12-15/index.mdx";
start(/* @__PURE__ */ createElementJsx(Site, { filename, page: MDXContent, ...props }));
