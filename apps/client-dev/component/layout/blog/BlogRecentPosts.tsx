import "./BlogRecentPosts.scss";

import currentBlogList from "~/data/current-blog-list";

const meta = {
  currentBlogList,
};

export function BlogRecentPosts() {
  return (
    <div class="blog-recent-posts">
      <div class="title">Recent Posts</div>
      <div class="list">
        {meta.currentBlogList.map((it) => (
          <div class="recent-post-item">
            <a href={it.link}>{it.title}</a>
          </div>
        ))}
      </div>
    </div>
  );
}
