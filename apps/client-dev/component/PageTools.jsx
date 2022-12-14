import { classnames } from "@elf-framework/sapa";
import { Tools } from "@elf-framework/ui";

import mainMenus from "../constants/main-menus";
import "./PageTools.scss";
import { ThemeButton } from "./utils/theme-button/ThemeButton";

export function PageTools({ menu, showThemeButton = true }) {
  const pathname = location.pathname;

  return (
    <div class="page-tools">
      <div class="sm">
        <Tools
          items={[
            {
              type: "menu",
              title: "Menu",
              items: [
                {
                  type: "item",
                  title: "Documents",
                  items: [{ type: "group", title: "Docs" }, ...mainMenus],
                },
                "-",
                ...menu.map((it) => {
                  if (typeof it === "string") {
                    return { type: "group", title: it };
                  }
                  return {
                    type: "link",
                    selected: pathname.startsWith(it.category),
                    ...it,
                  };
                }),
              ],
            },
          ]}
        />
      </div>
      <div class="lg">
        <div>
          {mainMenus.map((it, index) => {
            const selected = pathname.startsWith(it.category);

            return [
              index === 0 ? undefined : <span class="divider"></span>,
              <a
                href={it.link}
                class={classnames({
                  selected,
                })}
              >
                {it.title}
              </a>,
            ];
          })}
        </div>
        {showThemeButton ? (
          <div style={{ justifyContent: "flex-end", color: "inherit" }}>
            <ThemeButton />
          </div>
        ) : undefined}
      </div>
    </div>
  );
}