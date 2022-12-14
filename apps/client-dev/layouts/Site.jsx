import "@elf-framework/ui/style.css";

import { MarkdownPage } from "../component/MarkdownPage";
import LayoutManager from "./LayoutManager";
import "./Site.scss";

export function Site({ layout, page: CurrentPage, filename, ...props }) {
  const CurrentLayout = LayoutManager.get(layout || "BasicLayout");

  if (!CurrentLayout) {
    return <div>Layout not found</div>;
  }

  return (
    <CurrentLayout {...props}>
      {(menu) => {
        let content = <CurrentPage menu={menu} {...props} />;

        if (CurrentPage.name === "MDXContent") {
          content = (
            <MarkdownPage
              page={CurrentPage}
              filename={filename}
              menu={menu}
              {...props}
            />
          );
        }

        return <div>{content}</div>;
      }}
    </CurrentLayout>
  );
}
