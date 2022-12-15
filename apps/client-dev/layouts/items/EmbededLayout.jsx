import { isFunction } from "@elf-framework/sapa";
import { View } from "@elf-framework/ui";

import "./EmbededLayout.scss";

import { useTheme } from "~/hooks/useTheme";

export function EmbededLayout(props) {
  const { content } = props;

  useTheme();

  return (
    <div class="embeded-layout">
      <View class="layout-content">
        {content.map((it) => {
          return isFunction(it) ? it([]) : it;
        })}
      </View>
    </div>
  );
}
