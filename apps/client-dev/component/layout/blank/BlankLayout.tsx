import type { ContentType } from "@elf-framework/sapa";
import { makeCssVariablePrefixMap, propertyMap, View } from "@elf-framework/ui";

import "./BlankLayout.scss";

import { useTheme } from "~/component/hooks/useTheme";

const cssProperties = makeCssVariablePrefixMap("--blank-layout", {
  contentBackgroundColor: true,
});

interface BlankLayoutProps {
  content?: ContentType;
  style?: any;
}

export function BlankLayout({ content, style = {} }: BlankLayoutProps) {
  useTheme();

  return (
    <div class="blank-layout" style={propertyMap(style, cssProperties)}>
      {content}
    </div>
  );
}
