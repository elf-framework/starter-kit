import { start } from "@elf-framework/sapa";

// real view page
import Page, { frontmatter } from "./index.page.tsx";
import metaJSON from "./index.meta.json";
import { Site } from "~/component/site/Site";

const filename = "pages/dashboard/e-commerce/product/index.page.tsx";

const newProps = {
  ...metaJSON,
  ...frontmatter,
  filename,
  page: Page,
};

const site = <Site {...newProps} />;

start(site, {
  container: document.getElementById("app"),
});
