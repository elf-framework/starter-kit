import type { UIElement } from "@elf-framework/sapa";
import type { ContentType } from "@elf-framework/ui";

interface BlogLayoutProps {
  content?: ContentType;
  menu?: any[];
  logo?: ContentType;

  /**
   * toolbar
   *
   * Site header
   *
   *
   */
  toolbar?: ContentType;

  /**
   * sidebar
   *
   * Site sidebar
   *
   * This is a sidebar for the site layout and it is not a sidebar for the page.
   */
  sidebar?: ContentType;
  title?: ContentType;
  class?: string;
}

export class BlogLayout extends UIElement {
  props: BlogLayoutProps;
}
