import { Flex, View } from "@elf-framework/ui";

import "./DocumentLayout.scss";
import { Logo } from "./Logo";

import { Navigation } from "~/component/Navigation";
import { PageTools } from "~/component/PageTools";
import { useTheme } from "~/hooks/useTheme";

function LogoView() {
  return (
    <div>
      <Logo />
    </div>
  );
}

export function DocumentLayout(props) {
  let {
    content,
    menu = [],
    logo = undefined,
    toolbar = undefined,
    sidebar = undefined,
    title = "",
    class: className = "",
  } = props;

  logo = logo || <LogoView title={title} />;
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
