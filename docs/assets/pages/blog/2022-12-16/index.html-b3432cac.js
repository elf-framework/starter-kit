import { i as index, s as start, c as createElementJsx, S as Site } from "../../../Site-74be924f.js";
const title = "2번째 블로그입니다.", layout = "BlogReadLayout";
function _createMdxContent(props2) {
  const _components = Object.assign({
    p: "p"
  }, props2.components);
  return index.createElementJsx(_components.p, null, "2번째 블로그는 어떤걸 적어야 할까요?");
}
function MDXContent(props2 = {}) {
  const { wrapper: MDXLayout } = props2.components || {};
  return MDXLayout ? index.createElementJsx(MDXLayout, props2, index.createElementJsx(_createMdxContent, props2)) : _createMdxContent(props2);
}
const props = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title,
  layout,
  default: MDXContent
}, Symbol.toStringTag, { value: "Module" }));
const filename = "pages/blog/2022-12-16/index.mdx";
start(/* @__PURE__ */ createElementJsx(Site, { filename, page: MDXContent, ...props }));
