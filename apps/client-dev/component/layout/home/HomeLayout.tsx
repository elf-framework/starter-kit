import { Blank, Button, Divider } from "@elf-framework/ui";
import type { ContentType } from "@elf-framework/ui";

import "./HomeLayout.scss";

import { Footer } from "~/component/Footer";
import { useTheme } from "~/component/hooks/useTheme";
import { Logo } from "~/component/Logo";
import { ThemeButton } from "~/component/utils/theme-button/ThemeButton";
import { url } from "~/component/utils/url";
import mainMenus from "~/constants/menu/main-menu";

interface HomeLayoutProps {
  content: ContentType;
  sidebar?: ContentType;
  toolbar?: ContentType;
  menu?: any[];
}

export function HomeLayout({ content, sidebar, toolbar }: HomeLayoutProps) {
  useTheme();

  return (
    <div class="home-layout">
      <div class="home-layout-header">
        <div class="background"></div>
        <div class="layout-header">
          <div class="container-lg">
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
        </div>
      </div>
      <div class="layout-content">
        <section class="content" style={{ paddingTop: 0 }}>
          <div
            style={{
              fontSize: "9rem",
              fontWeight: "bold",
              textAlign: "center",
              letterSpacing: "0.2rem",
              padding: "2rem 0",
              paddingTop: 0,
              borderBottom: "1px solid #c4c4c4",
            }}
          >
            READ &amp; WORK
          </div>
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
              href={url("introduction/")}
            >
              Go to introduction
            </Button>
          </div>

          <Blank style={{ height: 30 }} />
          <Divider />
        </section>
        <section>{content}</section>
      </div>
      <div class="layout-footer">
        <Footer />
      </div>
    </div>
  );
}
