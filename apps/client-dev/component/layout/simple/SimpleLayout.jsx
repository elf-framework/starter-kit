import { makeCssVariablePrefixMap, propertyMap, View } from "@elf-framework/ui";

import "./SimpleLayout.scss";

import { Logo } from "~/component/Logo";
import { Navigation } from "~/component/Navigation";
import { PageSelectTools } from "~/component/PageSelectTools";
import { ThemeButton } from "~/component/utils/theme-button/ThemeButton";
import { useTheme } from "~/hooks/useTheme";

const cssProperties = makeCssVariablePrefixMap("--simple-layout", {
  sidebarWidth: true,
});

export function SimpleLayout(props) {
  let {
    content,
    menu = [],
    logo = undefined,
    toolbar = undefined,
    sidebar = undefined,
    title = "",
    class: className = "",
    showLogo = true,
    showTools = true,
    style = {},
  } = props;

  logo = logo || <Logo title={title} />;
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
