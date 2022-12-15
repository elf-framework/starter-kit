import { start } from "@elf-framework/sapa";

import { ArticleReadLayout } from "~/layouts/items/ArticleReadLayout";
import { Site } from "~/layouts/Site";
start(
  <Site
    layout="ArticleReadLayout"
    page={function ({ menu }) {
      return (
        <ArticleReadLayout
          menu={menu}
          showLogo={false}
          showTools={false}
          sidebar={<div>sidebar</div>}
        >
          hello
        </ArticleReadLayout>
      );
    }}
  />
);
