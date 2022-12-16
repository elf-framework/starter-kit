import { start } from "@elf-framework/sapa";

import { Site } from "~/layouts/Site";
start(
  <Site
    layout="ArticleReadLayout"
    page={function () {
      return "hello";
    }}
  />
);
