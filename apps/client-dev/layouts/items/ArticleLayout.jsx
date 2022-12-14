import { BlankLayout } from "./BlankLayout";
// import { SimpleLayout } from "./SimpleLayout";

import menu from "~/constants/article-pages";

export function ArticleLayout({ content, ...extraProps }) {
  return (
    <BlankLayout
      {...extraProps}
      title="Article"
      menu={menu}
      style={{
        contentBackgroundColor: "var(--color-gray-1)",
      }}
    >
      {content}
    </BlankLayout>
  );
}
