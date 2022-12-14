import type { ContentType } from "@elf-framework/sapa";

import "./Body.scss";

interface BodyProps {
  content?: ContentType;
}

export function Body(props: BodyProps) {
  const { content } = props;

  return <section class={`body `}>{content}</section>;
}
