import { renderToHtml, start } from "@elf-framework/sapa";

import Page, * as props from "./test.page.jsx";

import { Site } from "~/component/site/Site";

const filename = "pages/article/blue/test.page.jsx";

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
