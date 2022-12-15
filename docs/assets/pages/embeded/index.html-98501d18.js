import { i as index, s as start, c as createElementJsx, S as Site } from "../../Site-74be924f.js";
const title = "Embeded", layout = "EmbededReadLayout", og = {
  "image": "/images/og-image.png",
  "title": "Embeded"
}, ldjson = {
  "@type": "Recipe",
  "name": "Party Coffee Cake",
  "author": {
    "@type": "Person",
    "name": "Mary Stone"
  },
  "datePublished": "2018-03-10",
  "description": "This coffee cake is awesome and perfect for parties.",
  "prepTime": "PT20M"
};
function _createMdxContent(props2) {
  const _components = Object.assign({
    p: "p",
    a: "a"
  }, props2.components);
  return index.createElementJsx(index.FragmentInstance, null, index.createElementJsx(_components.p, null, "여기는 레이아웃 스타일이 없는 형태의 컨텐츠를 표현하기 위한 Embeded Layout 입니다."), "\n", index.createElementJsx(_components.p, null, index.createElementJsx(_components.a, {
    href: "/pages/document/"
  }, "메인 페이지")));
}
function MDXContent(props2 = {}) {
  const { wrapper: MDXLayout } = props2.components || {};
  return MDXLayout ? index.createElementJsx(MDXLayout, props2, index.createElementJsx(_createMdxContent, props2)) : _createMdxContent(props2);
}
const props = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title,
  layout,
  og,
  ldjson,
  default: MDXContent
}, Symbol.toStringTag, { value: "Module" }));
const filename = "pages/embeded/index.mdx";
const site = /* @__PURE__ */ createElementJsx(Site, { filename, page: MDXContent, ...props });
{
  start(site, {
    container: document.getElementById("app")
  });
}
