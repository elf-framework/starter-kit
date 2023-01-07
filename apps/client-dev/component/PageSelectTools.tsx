import MenuFilled from "@elf-framework/icon/MenuFilled";
import { useSetStoreValue } from "@elf-framework/sapa";
import { Button } from "@elf-framework/ui";

import mainMenus from "../constants/menu/main-menu";
import "./PageSelectTools.scss";

export function PageSelectTools() {
  const pathname = location.pathname;

  const setShowMobileMenu = useSetStoreValue("show.mobile.menu");

  return (
    <div class="page-select-tools">
      <div class="sm">
        <Button iconOnly quiet onClick={() => setShowMobileMenu(true)}>
          <MenuFilled />
        </Button>
      </div>

      <div class="lg">
        <select
          class="select"
          onChange={(e) => {
            if (e.target.value) {
              location.href = e.target.value;
            }
          }}
        >
          <option value="/">Main</option>
          {mainMenus.map((it) => {
            const selected = pathname.startsWith(it.category);

            const props = {
              selected: selected ? "selected" : undefined,
            };

            return (
              <option value={it.link} {...props}>
                {it.title}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
