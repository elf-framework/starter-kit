import { start } from "@elf-framework/sapa";

import Page, * as props from "{{mdxFilePath}}";

import { Site } from "~/layouts/Site";

const filename = "{{filename}}";
start(<Site filename={filename} page={Page} {...props} />);
