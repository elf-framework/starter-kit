import { BlankLayout } from "~/component/layout/blank/BlankLayout";
import menu from "~/constants/pages/article-pages";

export function SimpleReadLayout({ content, ...extraProps }) {
  return (
    <BlankLayout {...extraProps} title="Document" menu={menu}>
      {content}
    </BlankLayout>
  );
}
