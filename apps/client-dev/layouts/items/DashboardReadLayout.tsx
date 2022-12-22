import type { ContentType } from "@elf-framework/sapa";

import { SimpleLayout } from "~/component/layout/simple/SimpleLayout";
import menu from "~/constants/menu/dashboard-sidebar-menu";

interface DashboardReadLayoutProps {
  content: ContentType;
}

export function DashboardReadLayout({
  content,
  ...extraProps
}: DashboardReadLayoutProps) {
  return (
    <SimpleLayout {...extraProps} title="Article" menu={menu}>
      {content}
    </SimpleLayout>
  );
}
