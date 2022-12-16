import type { UIElement } from "@elf-framework/sapa";
import type { ContentType } from "@elf-framework/ui";

interface SimpleLayoutStyle {
  sidebarWidth?: string;
  [key: string]: string | number;
}

interface SimpleLayoutProps {
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

  /**
   * showTools
   *
   */
  showTools?: boolean;

  /**
   * showLogo
   *
   *
   */
  showLogo?: boolean;

  style?: SimpleLayoutStyle;
}

export class SimpleLayout extends UIElement {
  props: SimpleLayoutProps;
}
