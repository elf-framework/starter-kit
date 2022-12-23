import { start } from "@elf-framework/sapa";

// real view page
import Page, * as props from "./index.mdx";
import { Site } from "~/component/site/Site";

const filename = "pages/simple/index.mdx";

const site = <Site filename={filename} page={Page} {...props} />;

start(site, {
  container: document.getElementById("app"),
});
