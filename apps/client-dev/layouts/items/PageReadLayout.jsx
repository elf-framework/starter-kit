import { PageLayout } from "~/component/layout/page/PageLayout";
import menu from "~/constants/pages/article-pages";

export function PageReadLayout({ content, ...extraProps }) {
  return (
    <PageLayout {...extraProps} title="Document" menu={menu}>
      {content}
    </PageLayout>
  );
}
