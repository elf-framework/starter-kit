import type { ContentType } from "@elf-framework/sapa";
import { Flex, View } from "@elf-framework/ui";

import "./ApplicationLayout.scss";

import { useTheme } from "~/component/hooks/useTheme";
import { Logo } from "~/component/Logo";
import { Navigation } from "~/component/Navigation";
import { PageTools } from "~/component/PageTools";
import { ThemeButton } from "~/component/utils/theme-button/ThemeButton";

interface ApplicationLayoutProps {
  content: ContentType;
  menu?: any[];
  logo?: ContentType;
  toolbar?: ContentType;
  sidebar?: ContentType;
  title?: string;
  class?: string;
}

export function ApplicationLayout({
  content,
  menu = [],
  logo = undefined,
  toolbar = undefined,
  sidebar = undefined,
  class: className = "",
}: ApplicationLayoutProps) {
  logo = logo || <Logo />;
  toolbar = toolbar || <PageTools menu={menu} showThemeButton={false} />;
  sidebar = sidebar || <Navigation menu={menu} />;

  useTheme();

  return (
    <div class={`application-layout layout ${className}`}>
      <div class="top">
        <div class="layout-header">
          <div>
            <Flex class="layout-logo">{logo}</Flex>
            <Flex class="layout-tools">{toolbar}</Flex>
          </div>
          <div>
            <ThemeButton />
          </div>
        </div>
      </div>
      <div class="body">
        <div class="left">
          <View class="layout-menu">{sidebar}</View>
        </div>
        <div class="center">
          <View class="layout-content">
            {content}
            {/* <Footer /> */}
          </View>
        </div>
        <div class="right">
          <View class="layout-menu">{sidebar}</View>
        </div>
      </div>
    </div>
  );
}
