import { DocumentLayout } from "./DocumentLayout";

import menu from "~/constants/article-pages";

export function DocumentReadLayout({ content, ...extraProps }) {
  return (
    <DocumentLayout {...extraProps} title="Document" menu={menu}>
      {content}
    </DocumentLayout>
  );
}
