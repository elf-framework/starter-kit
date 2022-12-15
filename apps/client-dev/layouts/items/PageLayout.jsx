import { isFunction } from "@elf-framework/sapa";
import { Flex } from "@elf-framework/ui";

import { Logo } from "./Logo";
import "./PageLayout.scss";

import { Footer } from "~/component/Footer";
import { PageTools } from "~/component/PageTools";
import { useTheme } from "~/hooks/useTheme";

function LogoView() {
  return (
    <div>
      <Logo />
    </div>
  );
}

export function PageLayout(props) {
  let {
    content,
    menu = [],
    logo = undefined,
    toolbar = undefined,
    navigator = undefined,
    title = "",
    class: className = "",
  } = props;

  logo = logo || <LogoView title={title} />;
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
            <div class="container-lg">
              {content.map((it) => {
                return isFunction(it) ? it(menu) : it;
              })}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
