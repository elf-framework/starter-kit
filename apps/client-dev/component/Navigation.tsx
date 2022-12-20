import { useEffect } from "@elf-framework/sapa";
import type { ContentType } from "@elf-framework/sapa";
import { Sidebar } from "@elf-framework/ui";

interface NavigationProps {
  menu?: any[];
  header?: ContentType;
  footer?: any;
}

export function Navigation({ menu = [], header, footer }: NavigationProps) {
  const { href, pathname } = location;

  useEffect(() => {
    setTimeout(() => {
      const el = document.querySelector(".elf--sidebar-item.selected");
      if (el) {
        el.scrollIntoView();
      }
    }, 100);
  }, [href]);

  return (
    <Sidebar
      items={menu}
      header={header}
      footer={footer}
      hasSelected={(it) => {
        return it.link === pathname;
      }}
    />
  );
}
