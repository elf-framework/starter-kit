import { start } from "@elf-framework/sapa";

import { Site } from "~/layouts/Site";
start(
  <Site
    page={function ({ menu }) {
      return <div>hello</div>;
    }}
  />
);
