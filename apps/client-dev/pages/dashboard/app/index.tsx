import { start } from "@elf-framework/sapa";

// real view page
import Page, { frontmatter } from "./index.page.tsx";

import { Site } from "~/component/site/Site";

const filename = "pages/dashboard/app/index.page.tsx";

const site = <Site filename={filename} page={Page} {...frontmatter} />;

start(site, {
  container: document.getElementById("app"),
});
