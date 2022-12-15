import { BlankLayout } from "./BlankLayout";

import menu from "~/constants/article-pages";

export function SimpleReadLayout({ content, ...extraProps }) {
  return (
    <BlankLayout {...extraProps} title="Document" menu={menu}>
      {content}
    </BlankLayout>
  );
}
