import { renderToHtml, start } from "@elf-framework/sapa";

import Page, * as props from "{{mdxFilePath}}";

import { Site } from "~/layouts/Site";

const filename = "{{filename}}";

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
