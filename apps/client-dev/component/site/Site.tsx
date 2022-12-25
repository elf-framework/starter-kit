import type { ContentType } from "@elf-framework/sapa";
import "@elf-framework/ui/style.css";

import { Body } from "./Body";
import "./Site.scss";

import { MarkdownPage } from "~/component/MarkdownPage";
import LayoutManager from "~/layouts/LayoutManager";

interface SiteProps {
  layout?: string;
  page: any;
  filename?: string;
  header?: ContentType;
}

export function Site({
  layout,
  page: CurrentPage,
  filename,
  header,
  ...props
}: SiteProps) {
  const CurrentLayout = LayoutManager.get(layout || "BasicLayout");

  if (!CurrentLayout) {
    return <div>Layout not found</div>;
  }

  // 기본 페이지 설정 (jsx 기반)
  let content = <CurrentPage filename={filename} {...props} />;

  // MDX 기반 페이지 설정
  if (CurrentPage.name === "MDXContent") {
    content = (
      <div class="page">
        {header}
        <Body>
          <MarkdownPage page={CurrentPage} filename={filename} {...props} />
        </Body>
      </div>
    );
  }

  return <CurrentLayout {...props}>{content}</CurrentLayout>;
}
