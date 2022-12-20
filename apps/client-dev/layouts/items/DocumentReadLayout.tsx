import { DocumentLayout } from "~/component/layout/document/DocumentLayout";
import menu from "~/constants/menu/article-sidebar-menu";

export function DocumentReadLayout({ content, ...extraProps }) {
  return (
    <DocumentLayout {...extraProps} title="Document" menu={menu}>
      {content}
    </DocumentLayout>
  );
}
