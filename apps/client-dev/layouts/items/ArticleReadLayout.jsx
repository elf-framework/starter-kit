import { SimpleLayout } from "../../component/layout/simple/SimpleLayout";

import menu from "~/constants/menu/article-sidebar-menu";

export function ArticleReadLayout({ content, ...extraProps }) {
  return (
    <SimpleLayout {...extraProps} title="Article" menu={menu}>
      {content}
    </SimpleLayout>
  );
}
