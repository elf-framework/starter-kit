import { start } from "@elf-framework/sapa";

// real view page
import Page, * as frontmatter from "./index.mdx";
import { Site } from "~/component/site/Site";
import { FrontMatter } from "~/types/site";

const filename = "pages/blog/2022-12-16/index.mdx";

const targetInfo = frontmatter as FrontMatter;

const site = <Site filename={filename} page={Page} {...targetInfo} />;

start(site, {
  container: document.getElementById("app"),
});
