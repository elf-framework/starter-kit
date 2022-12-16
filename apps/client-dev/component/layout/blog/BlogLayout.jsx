import { Avatar, Badge, Flex } from "@elf-framework/ui";

import "./BlogLayout.scss";

import { Logo } from "~/component/Logo";
import { PageTools } from "~/component/PageTools";
import currentBlogList from "~/data/current-blog-list";

const meta = {
  currentBlogList,
};

export function BlogLayout(props) {
  let {
    content,
    date,
    menu = [],
    tags,
    logo,
    toolbar,
    account,
    title = "",
    class: className = "",
  } = props;

  logo = logo || <Logo title={title} />;
  toolbar = toolbar || <PageTools menu={menu} />;

  return (
    <div class={`blog-layout ${className}`}>
      <div class="layout-header">
        <Flex class={`layout-tools`}>
          {logo}
          {toolbar}
        </Flex>
      </div>
      <div class="application-main">
        <main>
          <div class="application-content">
            <div class="container-lg">
              <Flex style={{ gap: 10 }}>
                <div class="blog-area" style={{ flex: "1 1 auto" }}>
                  <div class="blog-header">
                    <div class="blog-title">{title}</div>

                    {account ? (
                      <div class="blog-account">
                        <div>
                          <Avatar>
                            <img src={account?.imageUrl} />
                          </Avatar>
                          {account?.name}
                        </div>

                        {date ? (
                          <span class="blog-date"> {date} </span>
                        ) : undefined}
                      </div>
                    ) : undefined}

                    <div class="blog-divider"></div>
                    {tags ? (
                      <div class="blog-tags">
                        Tags:{" "}
                        {tags.map((it) => (
                          <Badge>{it}</Badge>
                        ))}
                      </div>
                    ) : undefined}
                  </div>
                  <Flex style={{ gap: 10 }}>
                    <div class="blog-content" style={{ flex: "1 1 auto" }}>
                      {content}
                    </div>
                  </Flex>
                </div>
                <div
                  style={{
                    flex: "none",
                    width: 240,
                    paddingTop: 30,
                    position: "relative",
                  }}
                >
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
                    <div class="blog-sidebar-title">Recent Posts</div>
                    <div class="blog-sidebar-list">
                      {meta.currentBlogList.map((it) => (
                        <div class="blog-sidebar-item">
                          <a href={it.link}>{it.title}</a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Flex>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
