import { renderToHtml, start } from "@elf-framework/sapa";

// real view page
import Page, * as props from "./index.mdx";

import { Site } from "~/component/site/Site";

const filename = "pages/application/index.mdx";

const site = <Site filename={filename} page={Page} {...props} />;

export function render() {
  return renderToHtml(site);
}

start(site, {
  container: document.getElementById("app"),
});
