import { i as index, s as start, c as createElementJsx, S as Site } from "../../Site-74be924f.js";
const title = "Feature Page", layout = "PageReadLayout";
function _createMdxContent(props2) {
  const _components = Object.assign({
    p: "p"
  }, props2.components);
  return index.createElementJsx(index.FragmentInstance, null, index.createElementJsx(_components.p, null, "일반적인 기능 페이지는 여기서 작성해주세요."), "\n", index.createElementJsx(_components.p, null, "소개 페이지 또는 기능 소개 페이지 등을 작성할 수 있습니다."));
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
const filename = "pages/page/index.mdx";
const site = /* @__PURE__ */ createElementJsx(Site, { filename, page: MDXContent, ...props });
{
  start(site, {
    container: document.getElementById("app")
  });
}
