import { i as index, s as start, c as createElementJsx, S as Site } from "../../Site-74be924f.js";
const title = "Article", layout = "ArticleLayout", tableOfContents = false, menuLink = false, editableSourceLink = false;
function _createMdxContent(props2) {
  const _components = Object.assign({
    p: "p",
    a: "a"
  }, props2.components);
  return index.createElementJsx(index.FragmentInstance, null, index.createElementJsx(_components.p, null, "Document 가 아닌  정보전달을 좀 더 가볍게 할 수 있는 컨텐츠 들은 Article 로 묶습니다."), "\n", index.createElementJsx(_components.p, null, "pages/article/ 에서 관리합니다."), "\n", index.createElementJsx(_components.p, null, index.createElementJsx(_components.a, {
    href: "/pages/document/"
  }, "go to Document")));
}
function MDXContent(props2 = {}) {
  const { wrapper: MDXLayout } = props2.components || {};
  return MDXLayout ? index.createElementJsx(MDXLayout, props2, index.createElementJsx(_createMdxContent, props2)) : _createMdxContent(props2);
}
const props = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title,
  layout,
  tableOfContents,
  menuLink,
  editableSourceLink,
  default: MDXContent
}, Symbol.toStringTag, { value: "Module" }));
const filename = "pages/article/index.mdx";
const site = /* @__PURE__ */ createElementJsx(Site, { filename, page: MDXContent, ...props });
{
  start(site, {
    container: document.getElementById("app")
  });
}
