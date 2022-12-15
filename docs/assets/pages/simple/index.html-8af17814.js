import { i as index, s as start, c as createElementJsx, S as Site } from "../../Site-74be924f.js";
const title = "Simple", layout = "SimpleReadLayout", meta = {
  "title": "Simple",
  "description": "Simple page has no menu and toolbar.",
  "keywords": "simple, page, menu, toolbar",
  "link": [{
    "rel": "canonical",
    "href": "https://www.example.com/simple"
  }, {
    "rel": "prev",
    "href": "https://www.example.com/prev"
  }, {
    "rel": "next",
    "href": "https://www.example.com/next"
  }]
};
function _createMdxContent(props2) {
  const _components = Object.assign({
    p: "p",
    a: "a"
  }, props2.components);
  return index.createElementJsx(_components.p, null, "Simple page has no menu and toolbar. ", index.createElementJsx(_components.a, {
    href: "/pages/main/"
  }, "go to main page"), ";");
}
function MDXContent(props2 = {}) {
  const { wrapper: MDXLayout } = props2.components || {};
  return MDXLayout ? index.createElementJsx(MDXLayout, props2, index.createElementJsx(_createMdxContent, props2)) : _createMdxContent(props2);
}
const props = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title,
  layout,
  meta,
  default: MDXContent
}, Symbol.toStringTag, { value: "Module" }));
const filename = "pages/simple/index.mdx";
const site = /* @__PURE__ */ createElementJsx(Site, { filename, page: MDXContent, ...props });
{
  start(site, {
    container: document.getElementById("app")
  });
}
