import { EmbededLayout } from "~/component/layout/embeded/EmbededLayout";
import menu from "~/constants/menu/article-sidebar-menu";

export function EmbededReadLayout({ content, ...extraProps }) {
  return (
    <EmbededLayout {...extraProps} title="Document" menu={menu}>
      {content}
    </EmbededLayout>
  );
}
