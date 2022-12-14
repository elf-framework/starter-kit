import { isFunction } from "@elf-framework/sapa";

import menu from "../../constants/main-pages";
import { DocumentLayout } from "./DocumentLayout";

export function MainLayout({ content, ...extraProps }) {
  return (
    <DocumentLayout {...extraProps} menu={menu}>
      {content.map((it) => {
        return isFunction(it) ? it(menu) : it;
      })}
    </DocumentLayout>
  );
}
