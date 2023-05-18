import { start } from "@elf-framework/sapa";

// real view page
import Page, * as frontmatter from "./index.mdx";
import metaJSON from "./index.meta.json";
import { Site } from "~/component/site/Site";

const filename = "pages/page/index.mdx";

const newProps = {
  ...metaJSON,
  ...frontmatter,
  filename,
  page: Page,
};

const site = <Site {...newProps} />;

start(site, {
  container: document.getElementById("app"),
});
