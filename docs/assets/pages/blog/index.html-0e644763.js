import { i as index, a as currentBlogList, s as start, c as createElementJsx, S as Site } from "../../Site-74be924f.js";
const title = "최신 블로그 리스트", layout = "BlogReadLayout";
function _createMdxContent(props2) {
  const _components = Object.assign({
    div: "div",
    h2: "h2",
    a: "a",
    small: "small"
  }, props2.components);
  return index.createElementJsx("div", null, currentBlogList.map((blog) => index.createElementJsx(_components.div, null, index.createElementJsx(_components.h2, null, index.createElementJsx(_components.a, {
    href: blog.link
  }, blog == null ? void 0 : blog.title), "  ", blog.date ? index.createElementJsx(_components.small, {
    style: {
      color: "var(--color-gray-5)",
      fontSize: "1rem"
    }
  }, new Intl.DateTimeFormat("en-US").format(new Date(blog == null ? void 0 : blog.date))) : void 0))));
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
const filename = "pages/blog/index.mdx";
start(/* @__PURE__ */ createElementJsx(Site, { filename, page: MDXContent, ...props }));
