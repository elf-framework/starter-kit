import type { VNode } from "@elf-framework/sapa";

import "./MarkdownPage.scss";
import { TableOfContents, TableOfContentsItem } from "./TableOfContents";

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

interface MarkdownPageProps {
  page: any;
  filename?: string;
  tableOfContents?: boolean;
  editableSourceLink?: boolean;
}

export function MarkdownPage({
  page: Page,
  filename,
  // menu,
  tableOfContents = false,
  // menuLink = false,
  editableSourceLink = false,
}: MarkdownPageProps) {
  const template = Page();

  const items: TableOfContentsItem[] = [];
  template.children.forEach((child: VNode) => {
    if (child.nodeName?.startsWith("H")) {
      const text = child.makeText(" ");
      const id = child.makeText("-");

      // element 에 적용이 되기 위해서 memoizedProps 를 변경
      const targetId = encodeURIComponent(id);
      child.props.id = targetId;
      child.memoizedProps.id = targetId;

      const level = child.nodeName.replace("H", "");

      items.push({ id, text, level });
    }
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
          </div>
          {/* <Divider margin={100} /> */}
          {/* {menuLink ? <LinkedPage menu={menu} /> : undefined} */}

          {editableSourceLink ? (
            <FileEditorLink filename={filename} />
          ) : undefined}
        </div>

        {items.length && tableOfContents ? (
          <TableOfContents items={items} />
        ) : undefined}
      </div>
    </div>
  );
}
