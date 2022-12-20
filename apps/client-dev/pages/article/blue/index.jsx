import { start } from "@elf-framework/sapa";

import { Site } from "~/component/site/Site";
start(
  <Site
    layout="ArticleReadLayout"
    page={function () {
      return "hello";
    }}
  />
);
