import { View } from "@elf-framework/ui";

import { Logo } from "./Logo";
import "./SimpleLayout.scss";

import { Navigation } from "~/component/Navigation";
import { PageSelectTools } from "~/component/PageSelectTools";
import { ThemeButton } from "~/component/utils/theme-button/ThemeButton";
import { useTheme } from "~/hooks/useTheme";

export function SimpleLayout(props) {
  let {
    content,
    menu = [],
    logo = undefined,
    toolbar = undefined,
    sidebar = undefined,
    title = "",
    class: className = "",
  } = props;

  logo = logo || <Logo title={title} />;
  toolbar = toolbar || <PageSelectTools menu={menu} />;
  sidebar = sidebar || <Navigation menu={menu} />;

  useTheme();

  return (
    <div class={`sidebar-layout layout ${className}`}>
      <View class="layout-menu">
        <div class="logo-area">
          {logo}
          <ThemeButton />
        </div>
        <div class="tools-area">{toolbar}</div>
        <div class="sidebar-area">{sidebar}</div>
      </View>
      <View class="layout-content">
        {content}
        {/* <Footer /> */}
      </View>
    </div>
  );
}
