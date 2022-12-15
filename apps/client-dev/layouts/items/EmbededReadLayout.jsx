import { EmbededLayout } from "./EmbededLayout";

import menu from "~/constants/article-pages";

export function EmbededReadLayout({ content, ...extraProps }) {
  return (
    <EmbededLayout {...extraProps} title="Document" menu={menu}>
      {content}
    </EmbededLayout>
  );
}
