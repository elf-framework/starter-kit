import { ApplicationLayout } from "./ApplicationLayout";

import menu from "~/constants/article-pages";

export function ApplicationReadLayout({ content, ...extraProps }) {
  return (
    <ApplicationLayout {...extraProps} title="Application" menu={menu}>
      {content}
    </ApplicationLayout>
  );
}
