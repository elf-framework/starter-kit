import { BlogRecentPosts } from "./BlogRecentPosts";

export function BlogSidebar() {
  return (
    <div
      class="blog-sidebar"
      style={{
        position: "sticky",
        top: 20,
        flex: "none",
        width: 240,
        backgroundColor: "var(--color-background-default)",
        border: "1px solid var(--color-gray-9)",
        borderRadius: 10,
        padding: 10,
      }}
    >
      <BlogRecentPosts />
    </div>
  );
}
