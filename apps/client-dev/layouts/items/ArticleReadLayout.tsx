import type { ContentType } from "@elf-framework/sapa";

import { SimpleLayout } from "~/component/layout/simple/SimpleLayout";
import menu from "~/constants/menu/article-sidebar-menu";

interface ArticleReadLayoutProps {
  content: ContentType;
}

export function ArticleReadLayout({
  content,
  ...extraProps
}: ArticleReadLayoutProps) {
  return (
    <SimpleLayout {...extraProps} title="Article" menu={menu}>
      {content}
    </SimpleLayout>
  );
}
