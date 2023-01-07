import MenuFilled from "@elf-framework/icon/MenuFilled";
import { classnames, useSetStoreValue } from "@elf-framework/sapa";
import { Button } from "@elf-framework/ui";

import "./PageTools.scss";
import { ThemeButton } from "./utils/theme-button/ThemeButton";

import mainMenus from "~/constants/menu/main-menu";

interface PageToolsProps {
  menu?: any[];
  showThemeButton?: boolean;
}

export function PageTools({ showThemeButton = true }: PageToolsProps) {
  const pathname = location.pathname;

  const setShowMobileMenu = useSetStoreValue("show.mobile.menu");

  return (
    <div class="page-tools">
      <div class="sm">
        <Button iconOnly quiet onClick={() => setShowMobileMenu(true)}>
          <MenuFilled />
        </Button>
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
