import { isFunction } from "@elf-framework/sapa";
import { Blank, Button } from "@elf-framework/ui";

import "./HomeLayout.scss";
import { Logo } from "./Logo";

import { Footer } from "~/component/Footer";
import { ThemeButton } from "~/component/utils/theme-button/ThemeButton";
import mainMenus from "~/constants/main-menus";
import { useTheme } from "~/hooks/useTheme";
import { url } from "~/utils/url";

export function HomeLayout({ content, menu = [] }) {
  useTheme();

  return (
    <div class="home-layout">
      <div class="home-layout-header">
        <div class="background"></div>
        <div class="layout-header">
          <div>
            <Logo />
          </div>
          <nav class="tools">
            <ul>
              {mainMenus.map((it) => {
                return (
                  <li>
                    <a href={it.link}>{it.title}</a>
                  </li>
                );
              })}
              <li>
                <ThemeButton />
              </li>
            </ul>
          </nav>
        </div>
        <section class="content">
          <div class="hero">
            <h1>Let's make the editor easy and fun.</h1>
          </div>
          <div class="description">
            Sapa, UI component, Base editor system for web.
          </div>
          <div>
            <Button
              size="extra-large"
              outline
              // shape="round"
              variant="primary"
              as="link"
              href={url("pages/introduction/")}
            >
              Go to introduction
            </Button>
          </div>
          <Blank />
        </section>
      </div>
      <div class="layout-content">
        <section>
          {content.map((it) => {
            return isFunction(it) ? it(menu) : it;
          })}
        </section>
      </div>
      <div class="layout-footer">
        <Footer />
      </div>
    </div>
  );
}
