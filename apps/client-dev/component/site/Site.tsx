import "@elf-framework/ui/style.css";

import "./Site.scss";

import { MarkdownPage } from "~/component/MarkdownPage";
import LayoutManager from "~/layouts/LayoutManager";
import { Body } from "./Body";

interface SiteProps {
  layout?: string;
  page: any;
  filename?: string;
}

export function Site({
  layout,
  page: CurrentPage,
  filename,
  ...props
}: SiteProps) {
  const CurrentLayout = LayoutManager.get(layout || "BasicLayout");

  if (!CurrentLayout) {
    return <div>Layout not found</div>;
  }

  // 기본 페이지 설정 (jsx 기반)
  let content = <CurrentPage {...props} />;

  // MDX 기반 페이지 설정
  if (CurrentPage.name === "MDXContent") {
    content = (
      <Body>
        <MarkdownPage page={CurrentPage} filename={filename} {...props} />
      </Body>
    );
  }

  return <CurrentLayout {...props}>{content}</CurrentLayout>;
}
