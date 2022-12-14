import { BlogLayout } from "./BlogLayout";

import menu from "~/constants/article-pages";

export function BlogReadLayout({ content, ...extraProps }) {
  return (
    <BlogLayout {...extraProps} menu={menu}>
      {content}
    </BlogLayout>
  );
}
