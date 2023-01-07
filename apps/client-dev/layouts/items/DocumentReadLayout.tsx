import type { ContentType } from "@elf-framework/sapa";

import { DocumentLayout } from "~/component/layout/document/DocumentLayout";
import menu from "~/constants/menu/article-sidebar-menu";

interface DocumentReadLayoutProps {
  content?: ContentType;
}

export function DocumentReadLayout({
  content,
  ...extraProps
}: DocumentReadLayoutProps) {
  return (
    <DocumentLayout {...extraProps} title="Document" menu={menu}>
      {content}
    </DocumentLayout>
  );
}
