import { useStoreValue } from "@elf-framework/sapa";
import type { ContentType } from "@elf-framework/sapa";
import { Flex, View } from "@elf-framework/ui";

import "./DocumentLayout.scss";

import { useTheme } from "~/component/hooks/useTheme";
import { Logo } from "~/component/Logo";
import { MobileMenu } from "~/component/MobileMenu";
import { Navigation } from "~/component/Navigation";
import { PageTools } from "~/component/PageTools";

interface DocumentLayoutProps {
  content?: ContentType;
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
  const [showMobileMenu] = useStoreValue<boolean>("show.mobile.menu");

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
      {showMobileMenu ? <MobileMenu menu={menu} /> : undefined}
    </div>
  );
}
