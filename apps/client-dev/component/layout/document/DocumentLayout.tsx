import { Flex, View } from "@elf-framework/ui";

import "./DocumentLayout.scss";

import { useTheme } from "~/component/hooks/useTheme";
import { Logo } from "~/component/Logo";
import { Navigation } from "~/component/Navigation";
import { PageTools } from "~/component/PageTools";

interface DocumentLayoutProps {
  content: any;
  menu?: any[];
  logo?: any;
  toolbar?: any;
  sidebar?: any;
  title?: string;
  class?: string;
}

export function DocumentLayout({
  content,
  menu = [],
  logo = undefined,
  toolbar = undefined,
  sidebar = undefined,
  class: className = "",
}: DocumentLayoutProps) {
  logo = logo || <Logo />;
  toolbar = toolbar || <PageTools menu={menu} />;
  sidebar = sidebar || <Navigation menu={menu} />;

  useTheme();

  return (
    <div class={`document-layout layout ${className}`}>
      <div class="layout-header">
        <Flex class="layout-logo">{logo}</Flex>
        <Flex class="layout-tools">{toolbar}</Flex>
      </div>
      <View class="layout-menu">{sidebar}</View>
      <View class="layout-content">
        {content}
        {/* <Footer /> */}
      </View>
    </div>
  );
}
