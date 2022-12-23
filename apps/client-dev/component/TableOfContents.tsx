import { classnames } from "@elf-framework/sapa";
import type { VNode } from "@elf-framework/sapa";

import "./TableOfContents.scss";
import { makeId } from "./utils/url";

export interface TableOfContentsItem {
  id: string;
  text: string;
  level: string;
}

interface TableOfContentsProps {
  items: VNode;
}

function visitVNode(node: VNode, callback: (node: VNode) => void) {
  callback(node);
  node.children?.forEach((child: VNode) => visitVNode(child, callback));
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const list: TableOfContentsItem[] = [];

  visitVNode(items, (node: VNode) => {
    if (node.tag === "object") {
      // eslint-disable-next-line @typescript-eslint/ban-types
      const ComponentName = (node.Component as Function).name;
      let id = "",
        text = "",
        level = "";
      switch (ComponentName) {
        case "Heading1":
        case "Heading2":
        case "Heading3":
        case "Heading4":
        case "Heading5":
        case "Heading6":
          level = ComponentName.replace("Heading", "");
          text = node.children.join("");
          id = [level, makeId(text)].join("-");

          list.push({
            id,
            text,
            level,
          });
          break;
      }
    }
  });

  return (
    <div class="table-of-contents">
      <div class="items">
        <div class="title">Table of contents</div>
        {list.map((it) => {
          const selected =
            location.hash.split("#")[1] === encodeURIComponent(it.id);
          return (
            <div
              class={classnames("toc-item", {
                selected,
              })}
              data-level={it.level}
            >
              <a href={`#${it.id}`}>{it.text}</a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
