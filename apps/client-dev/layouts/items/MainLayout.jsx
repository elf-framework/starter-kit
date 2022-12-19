import { isFunction } from "@elf-framework/sapa";

import { HomeLayout } from "~/component/layout/home/HomeLayout";
import menu from "~/constants/menu/main-sidebar-menu";

export function MainLayout({ content, ...extraProps }) {
  return (
    <HomeLayout {...extraProps} menu={menu}>
      {content.map((it) => {
        return isFunction(it) ? it(menu) : it;
      })}
    </HomeLayout>
  );
}
