import { isFunction } from "@elf-framework/sapa";
import { Avatar, Badge, Flex } from "@elf-framework/ui";

import "./BlogLayout.scss";
import { Logo } from "./Logo";

import { PageTools } from "~/component/PageTools";

export function BlogLayout(props) {
  let {
    content,
    date,
    menu = [],
    tags = [],
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
              <div class="blog-area">
                <div class="blog-header">
                  <div class="blog-title">{title}</div>
                  <div class="blog-account">
                    <div>
                      <Avatar>
                        <img src={account.imageUrl} />
                      </Avatar>
                      {account.name}
                    </div>

                    <span class="blog-date"> {date} </span>
                  </div>
                  <div class="blog-divider"></div>
                  <div class="blog-tags">
                    Tags:{" "}
                    {tags.map((it) => (
                      <Badge>{it}</Badge>
                    ))}
                  </div>
                </div>
                <div class="blog-content">
                  {content.map((it) => {
                    return isFunction(it) ? it(menu) : it;
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
