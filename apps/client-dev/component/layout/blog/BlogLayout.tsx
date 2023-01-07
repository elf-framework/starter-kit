import { useStoreValue } from "@elf-framework/sapa";
import type { ContentType } from "@elf-framework/sapa";
import { Avatar, Badge, Flex } from "@elf-framework/ui";

import "./BlogLayout.scss";
import { BlogSidebar } from "./BlogSidebar";

import { Logo } from "~/component/Logo";
import { MobileMenu } from "~/component/MobileMenu";
import { PageTools } from "~/component/PageTools";

interface BlogLayoutProps {
  content?: ContentType;
  date?: string;
  menu?: any[];
  tags?: string[];
  logo?: any;
  toolbar?: any;
  account?: any;
  title?: string;
  class?: string;
}

export function BlogLayout({
  content,
  date,
  menu = [],
  tags,
  logo,
  toolbar,
  account,
  title = "",
  class: className = "",
}: BlogLayoutProps) {
  logo = logo || <Logo />;
  toolbar = toolbar || <PageTools menu={menu} />;

  const [showMobileMenu] = useStoreValue<boolean>("show.mobile.menu");

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
                    paddingTop: 30,
                    position: "relative",
                    boxSizing: "border-box",
                  }}
                >
                  <BlogSidebar />
                </div>
              </Flex>
            </div>
          </div>
        </main>
      </div>
      {showMobileMenu ? <MobileMenu menu={menu} /> : undefined}
    </div>
  );
}
