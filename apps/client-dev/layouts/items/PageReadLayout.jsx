import { PageLayout } from "~/component/layout/page/PageLayout";
import menu from "~/constants/menu/article-sidebar-menu";

export function PageReadLayout({ content, ...extraProps }) {
  return (
    <PageLayout {...extraProps} title="Document" menu={menu}>
      {content}
    </PageLayout>
  );
}
