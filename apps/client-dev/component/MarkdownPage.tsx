import { Divider } from "@elf-framework/ui";

import "./MarkdownPage.scss";
import { TableOfContents } from "./TableOfContents";
import { makeId } from "./utils/url";

import { FrontMatter } from "~/types/site";

function FileEditorLink({ filename }: { filename: string }) {
  return filename ? (
    <div class="filename">
      <a
        href={`https://github.com/elf-framework/editor/tree/develop/apps/ui-dev/${filename}`}
      >
        [Edit on the github]
      </a>
    </div>
  ) : (
    ""
  );
}

interface MarkdownPageProps extends FrontMatter {
  page: any;
  filename?: string;
  tableOfContents?: boolean;
  editableSourceLink?: boolean;
}

function Heading1(props: any) {
  const id = ["1", makeId(props.content.join(""))].join("-");
  return (
    <h1 id={id} class="h1">
      {props.content}
    </h1>
  );
}

function Heading2(props: any) {
  const id = ["2", makeId(props.content.join(""))].join("-");
  return (
    <h2 id={id} class="h2">
      {props.content}
    </h2>
  );
}

function Heading3(props: any) {
  const id = ["3", makeId(props.content.join(""))].join("-");
  return (
    <h3 id={id} class="h3">
      {props.content}
    </h3>
  );
}

function Heading4(props: any) {
  const id = ["4", makeId(props.content.join(""))].join("-");
  return (
    <h4 id={id} class="h4">
      {props.content}
    </h4>
  );
}

function Heading5(props: any) {
  const id = ["5", makeId(props.content.join(""))].join("-");
  return (
    <h5 id={id} class="h5">
      {props.content}
    </h5>
  );
}

function Heading6(props: any) {
  const id = ["6", makeId(props.content.join(""))].join("-");
  return (
    <h6 id={id} class="h6">
      {props.content}
    </h6>
  );
}

export function MarkdownPage({
  page: Page,
  filename,
  // menu,
  tableOfContents = false,
  // menuLink = false,
  editableSourceLink = false,

  /** links in markdown paper */
  displayLinks = false,
  links = [],
}: MarkdownPageProps) {
  // fixed table of contents

  const template = Page({
    components: {
      h1: Heading1,
      h2: Heading2,
      h3: Heading3,
      h4: Heading4,
      h5: Heading5,
      h6: Heading6,
    },
  });

  return (
    <div class="markdown-page">
      <div class="markdown-page-content">
        <div class="content-container">
          {editableSourceLink ? (
            <FileEditorLink filename={filename} />
          ) : undefined}
          <div class="content-inner" ref="$inner">
            {template.children || template}

            {displayLinks ? <Divider /> : undefined}

            {displayLinks ? (
              <div>
                <ul>
                  {links.map((link) => (
                    <li>
                      <a href={link.url} target="_link">
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : undefined}
          </div>
          {/* <Divider margin={100} /> */}
          {/* {menuLink ? <LinkedPage menu={menu} /> : undefined} */}

          {editableSourceLink ? (
            <FileEditorLink filename={filename} />
          ) : undefined}
        </div>

        {tableOfContents ? <TableOfContents items={template} /> : undefined}
      </div>
    </div>
  );
}
