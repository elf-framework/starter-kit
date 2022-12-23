import { start } from "@elf-framework/sapa";

// real view page
import Page, * as frontmatter from "./index.mdx";
import metaJSON from "./index.meta.json";
import { Site } from "~/component/site/Site";

const newProps = {
  ...metaJSON,
  ...frontmatter,
};

const filename = "pages/markdown/flowchart/index.mdx";

const site = <Site filename={filename} page={Page} {...newProps} />;

start(site, {
  container: document.getElementById("app"),
});
