import { UIElement } from "@elf-framework/sapa";
import type { ContentType } from "@elf-framework/ui";

interface SiteProps {
  Page: ContentType;
  filename: string;
  layout: string;
}
export class Site extends UIElement {
  props: SiteProps;
}
