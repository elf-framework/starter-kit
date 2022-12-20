import type { ContentType } from "@elf-framework/sapa";
import { makeCssVariablePrefixMap, propertyMap, View } from "@elf-framework/ui";

import "./SimpleLayout.scss";

import { useTheme } from "~/component/hooks/useTheme";
import { Logo } from "~/component/Logo";
import { Navigation } from "~/component/Navigation";
import { PageSelectTools } from "~/component/PageSelectTools";
import { ThemeButton } from "~/component/utils/theme-button/ThemeButton";

const cssProperties = makeCssVariablePrefixMap("--simple-layout", {
  sidebarWidth: true,
});

interface SimpleLayoutProps {
  content: ContentType;
  menu?: any[];
  logo?: ContentType;
  toolbar?: ContentType;
  sidebar?: ContentType;
  title?: ContentType;
  class?: string;
  showLogo?: boolean;
  showTools?: boolean;
  style?: any;
}

export function SimpleLayout({
  content,
  menu = [],
  logo = undefined,
  toolbar = undefined,
  sidebar = undefined,
  class: className = "",
  showLogo = true,
  showTools = true,
  style = {},
}: SimpleLayoutProps) {
  logo = logo || <Logo />;
  toolbar = toolbar || <PageSelectTools menu={menu} />;
  sidebar = sidebar || <Navigation menu={menu} />;

  useTheme();

  return (
    <div
      class={`simple-layout layout ${className}`}
      style={propertyMap(style, cssProperties)}
    >
      <View class="layout-menu">
        {showLogo ? (
          <div class="logo-area">
            {logo}
            <ThemeButton />
          </div>
        ) : undefined}
        {showTools ? <div class="tools-area">{toolbar}</div> : undefined}
        <div class="sidebar-area">{sidebar}</div>
      </View>
      <View class="layout-content">
        <div>{content}</div>

        {/* <Footer /> */}
      </View>
    </div>
  );
}
