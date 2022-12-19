import { makeCssVariablePrefixMap, propertyMap, View } from "@elf-framework/ui";

import "./BlankLayout.scss";

import { useTheme } from "~/component/hooks/useTheme";

const cssProperties = makeCssVariablePrefixMap("--blank-layout", {
  contentBackgroundColor: true,
});

export function BlankLayout(props) {
  const { content, style = {} } = props;

  useTheme();

  return (
    <div class="blank-layout" style={propertyMap(style, cssProperties)}>
      <View class="layout-content">
        <div class="container-lg">{content}</div>
      </View>
    </div>
  );
}
