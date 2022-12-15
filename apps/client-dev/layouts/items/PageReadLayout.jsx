import { PageLayout } from "./PageLayout";

import menu from "~/constants/article-pages";

export function PageReadLayout({ content, ...extraProps }) {
  return (
    <PageLayout {...extraProps} title="Document" menu={menu}>
      {content}
    </PageLayout>
  );
}
