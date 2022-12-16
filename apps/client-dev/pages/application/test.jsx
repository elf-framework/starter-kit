import { renderToHtml, start } from "@elf-framework/sapa";

// real view page
import Page, { frontmatter } from "./test.page.jsx";

import { Site } from "~/layouts/Site";

const filename = "pages/application/test.page.jsx";

const site = <Site filename={filename} page={Page} {...frontmatter} />;

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
