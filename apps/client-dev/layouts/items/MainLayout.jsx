import { isFunction } from "@elf-framework/sapa";

import { DocumentLayout } from "~/component/layout/document/DocumentLayout";
import menu from "~/constants/pages/main-pages";

export function MainLayout({ content, ...extraProps }) {
  return (
    <DocumentLayout {...extraProps} menu={menu}>
      {content.map((it) => {
        return isFunction(it) ? it(menu) : it;
      })}
    </DocumentLayout>
  );
}
