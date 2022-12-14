import { SimpleLayout } from "./SimpleLayout";

import menu from "~/constants/article-pages";

export function ArticleLayout({ content, ...extraProps }) {
  return (
    <SimpleLayout {...extraProps} title="Article" menu={menu}>
      {content}
    </SimpleLayout>
  );
}
