import { View } from "@elf-framework/ui";

import "./EmbededLayout.scss";

import { useTheme } from "~/hooks/useTheme";

export function EmbededLayout(props) {
  const { content } = props;

  useTheme();

  return (
    <div class="embeded-layout">
      <View class="layout-content">{content}</View>
    </div>
  );
}
