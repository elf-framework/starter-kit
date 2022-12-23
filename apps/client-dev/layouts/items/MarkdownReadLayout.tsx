import type { ContentType } from "@elf-framework/sapa";

import { SimpleLayout } from "~/component/layout/simple/SimpleLayout";
import menu from "~/constants/menu/markdown-sidebar-menu";

interface MarkdownReadLayoutProps {
  content: ContentType;
}

export function MarkdownReadLayout({
  content,
  ...extraProps
}: MarkdownReadLayoutProps) {
  return (
    <SimpleLayout {...extraProps} menu={menu}>
      {content}
    </SimpleLayout>
  );
}
