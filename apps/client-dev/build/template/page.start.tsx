import { start } from "@elf-framework/sapa";

// real view page
import Page, { frontmatter } from "{{applicationFilePath}}";
import metaJSON from "{{metaFilePath}}";
import { Site } from "~/component/site/Site";

const newProps = {
  ...metaJSON,
  ...frontmatter,
};

const filename = "{{filename}}";

const site = <Site filename={filename} page={Page} {...newProps} />;

start(site, {
  container: document.getElementById("app"),
});
