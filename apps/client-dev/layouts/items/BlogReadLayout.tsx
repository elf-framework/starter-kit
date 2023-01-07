import type { ContentType } from "@elf-framework/sapa";

import { BlogLayout } from "~/component/layout/blog/BlogLayout";
import menu from "~/constants/menu/article-sidebar-menu";

interface BlogReadLayoutProps {
  content?: ContentType;
}

export function BlogReadLayout({
  content,
  ...extraProps
}: BlogReadLayoutProps) {
  return (
    <BlogLayout {...extraProps} menu={menu}>
      {content}
    </BlogLayout>
  );
}
