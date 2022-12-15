import type { UIElement } from "@elf-framework/sapa";
import type { ContentType } from "@elf-framework/ui";

interface ArticleReadLayoutStyle {
  sidebarWidth?: string;
  [key: string]: string | number;
}

interface ArticleReadLayoutProps {
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

  style?: ArticleReadLayoutStyle;
}

export class ArticleReadLayout extends UIElement {
  props: ArticleReadLayoutProps;
}
