import { BlogLayout } from "~/component/layout/blog/BlogLayout";
import menu from "~/constants/pages/article-pages";

export function BlogReadLayout({ content, ...extraProps }) {
  return (
    <BlogLayout {...extraProps} menu={menu}>
      {content}
    </BlogLayout>
  );
}
