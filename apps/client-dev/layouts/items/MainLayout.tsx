import { isFunction } from "@elf-framework/sapa";
import type { ContentType } from "@elf-framework/ui";

import { HomeLayout } from "~/component/layout/home/HomeLayout";
import menu from "~/constants/menu/main-sidebar-menu";

interface MainLayoutProps {
  content: ContentType;
}

export function MainLayout({ content, ...extraProps }: MainLayoutProps) {
  return (
    <HomeLayout {...extraProps} menu={menu}>
      {content.map((it) => {
        return isFunction(it) ? it(menu) : it;
      })}
    </HomeLayout>
  );
}
