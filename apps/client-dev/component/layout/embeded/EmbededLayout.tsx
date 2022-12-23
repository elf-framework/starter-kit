import type { ContentType } from "@elf-framework/sapa";
import { View } from "@elf-framework/ui";

import "./EmbededLayout.scss";

import { useTheme } from "~/component/hooks/useTheme";

interface EmbededLayoutProps {
  content: ContentType;
}

export function EmbededLayout({ content }: EmbededLayoutProps) {
  useTheme();

  return (
    <div class="embeded-layout">
      <View class="layout-content">{content}</View>
    </div>
  );
}
