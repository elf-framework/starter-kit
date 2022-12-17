import { start } from "@elf-framework/sapa";

// real view page
import Page, * as props from "{{applicationFilePath}}";
import { Site } from "~/layouts/Site";

const filename = "{{filename}}";

const site = <Site filename={filename} page={Page} {...props} />;

start(site, {
  container: document.getElementById("app"),
});
