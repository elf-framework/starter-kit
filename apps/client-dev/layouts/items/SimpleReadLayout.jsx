import { BlankLayout } from "~/component/layout/blank/BlankLayout";
import menu from "~/constants/menu/article-sidebar-menu";

export function SimpleReadLayout({ content, ...extraProps }) {
  return (
    <BlankLayout {...extraProps} title="Document" menu={menu}>
      {content}
    </BlankLayout>
  );
}
