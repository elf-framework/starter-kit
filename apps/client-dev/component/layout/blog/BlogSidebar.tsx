import { BlogRecentPosts } from "./BlogRecentPosts";
import "./BlogSidebar.scss";

export function BlogSidebar() {
  return (
    <div
      class="blog-sidebar"
      style={{
        position: "sticky",
        top: 20,
        flex: "none",
        width: 400,

        backgroundColor: "var(--color-background-default)",
        // border: "1px solid var(--color-gray-3)",
        boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.2)",
        borderRadius: 4,
        padding: 10,
      }}
    >
      <BlogRecentPosts />
    </div>
  );
}
