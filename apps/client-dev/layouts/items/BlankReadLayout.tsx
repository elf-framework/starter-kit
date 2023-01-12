import type { ContentType } from "@elf-framework/sapa";

import { BlankLayout } from "~/component/layout/blank/BlankLayout";

interface BlankReadLayoutProps {
  content?: ContentType;
}

export function BlankReadLayout({
  content,
  ...extraProps
}: BlankReadLayoutProps) {
  return <BlankLayout {...extraProps}>{content}</BlankLayout>;
}
