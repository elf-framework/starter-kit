import { BlogLayout } from "~/component/layout/blog/BlogLayout";
import menu from "~/constants/menu/article-sidebar-menu";

export function BlogReadLayout({ content, ...extraProps }) {
  return (
    <BlogLayout {...extraProps} menu={menu}>
      {content}
    </BlogLayout>
  );
}
