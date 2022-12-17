import { start } from "@elf-framework/sapa";

// real view page
import Page, { frontmatter } from "{{applicationFilePath}}";
import { Site } from "~/layouts/Site";

const filename = "{{filename}}";

const site = <Site filename={filename} page={Page} {...frontmatter} />;

start(site, {
  container: document.getElementById("app"),
});
