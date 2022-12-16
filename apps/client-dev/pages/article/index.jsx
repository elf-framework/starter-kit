import { renderToHtml, start } from "@elf-framework/sapa";

// real view page
import Page, * as props from "./index.mdx";

import { Site } from "~/layouts/Site";

const filename = "pages/article/index.mdx";

const site = <Site filename={filename} page={Page} {...props} />;

export function render() {
  return renderToHtml(site);
}

if (import.meta.env.SSR) {
  // noop
} else {
  start(site, {
    container: document.getElementById("app"),
  });
}
