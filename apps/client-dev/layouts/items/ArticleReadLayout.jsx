import { SimpleLayout } from "../../component/layout/simple/SimpleLayout";

import menu from "~/constants/pages/article-pages";

export function ArticleReadLayout({ content, ...extraProps }) {
  return (
    <SimpleLayout {...extraProps} title="Article" menu={menu}>
      {content}
    </SimpleLayout>
  );
}
