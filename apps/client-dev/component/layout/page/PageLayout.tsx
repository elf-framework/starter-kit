import type { ContentType } from "@elf-framework/sapa";
import { Flex } from "@elf-framework/ui";

import "./PageLayout.scss";

import { Footer } from "~/component/Footer";
import { useTheme } from "~/component/hooks/useTheme";
import { Logo } from "~/component/Logo";
import { PageTools } from "~/component/PageTools";

interface PageLayoutProps {
  content: ContentType;
  menu?: any[];
  logo?: ContentType;
  toolbar?: ContentType;
  navigator?: ContentType;
  title?: ContentType;
  class?: string;
}

export function PageLayout({
  content,
  menu = [],
  logo = undefined,
  toolbar = undefined,
  navigator = undefined,
  class: className = "",
}: PageLayoutProps) {
  logo = logo || <Logo />;
  toolbar = toolbar || <PageTools menu={menu} />;
  navigator = navigator || "Navigation";

  useTheme();

  return (
    <div class={`page-layout ${className}`}>
      <div class="layout-header">
        <div class="container-lg">
          <Flex class={`layout-tools`}>
            {logo}
            {toolbar}
          </Flex>
        </div>
      </div>
      <div class="application-main">
        <main>
          <div class="navigation">
            <div class="container-lg">
              <div>{navigator}</div>
            </div>
          </div>
          <div class="application-content">
            <div class="container-lg">{content}</div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
