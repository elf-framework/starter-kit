import { start } from "@elf-framework/sapa";

import Page, * as props from "./index.mdx";

import { Site } from "~/layouts/Site";

const filename = "pages/document/index.mdx";
start(<Site filename={filename} page={Page} {...props} />);
