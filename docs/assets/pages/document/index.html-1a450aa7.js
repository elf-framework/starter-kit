import { i as index, s as start, c as createElementJsx, S as Site } from "../../Site-74be924f.js";
const title = "Document", layout = "DocumentReadLayout";
function _createMdxContent(props2) {
  const _components = Object.assign({
    p: "p"
  }, props2.components);
  return index.createElementJsx(index.FragmentInstance, null, index.createElementJsx(_components.p, null, "Document 설명은 여기다 적어주세요."), "\n", index.createElementJsx(_components.p, null, "실제로 필요한 문서화는 여기서 처리합니다."), "\n", index.createElementJsx(_components.p, null, "Sidebar 를 포함한 전체 영역의 문서화는 여기서 처리합니다."));
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
const filename = "pages/document/index.mdx";
start(/* @__PURE__ */ createElementJsx(Site, { filename, page: MDXContent, ...props }));
