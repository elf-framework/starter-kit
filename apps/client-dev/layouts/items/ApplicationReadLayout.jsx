import { ApplicationLayout } from "~/component/layout/application/ApplicationLayout";
import menu from "~/constants/menu/article-sidebar-menu";

export function ApplicationReadLayout({ content, ...extraProps }) {
  return (
    <ApplicationLayout {...extraProps} title="Application" menu={menu}>
      {content}
    </ApplicationLayout>
  );
}
