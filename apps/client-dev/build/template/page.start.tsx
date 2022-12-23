import { start } from "@elf-framework/sapa";

// real view page
import Page, { frontmatter } from "{{applicationFilePath}}";
import metaJSON from "{{metaFilePath}}";
import { Site } from "~/component/site/Site";

const filename = "{{filename}}";

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
