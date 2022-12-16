import { DocumentLayout } from "~/component/layout/document/DocumentLayout";
import menu from "~/constants/pages/article-pages";

export function DocumentReadLayout({ content, ...extraProps }) {
  return (
    <DocumentLayout {...extraProps} title="Document" menu={menu}>
      {content}
    </DocumentLayout>
  );
}
