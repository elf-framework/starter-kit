import { start } from "@elf-framework/sapa";

// real view page
import Page, * as frontmatter from "./test.mdx";
import { Site } from "~/component/site/Site";
import { FrontMatter } from "~/types/site";

const filename = "pages/application/test.mdx";

const targetInfo = frontmatter as FrontMatter;

const site = <Site filename={filename} page={Page} {...targetInfo} />;

start(site, {
  container: document.getElementById("app"),
});
