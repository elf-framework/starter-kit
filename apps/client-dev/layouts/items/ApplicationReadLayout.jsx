import { ApplicationLayout } from "~/component/layout/application/ApplicationLayout";
import menu from "~/constants/pages/article-pages";

export function ApplicationReadLayout({ content, ...extraProps }) {
  return (
    <ApplicationLayout {...extraProps} title="Application" menu={menu}>
      {content}
    </ApplicationLayout>
  );
}
