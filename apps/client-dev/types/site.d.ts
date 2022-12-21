export type MenuItemObject = {
  type?: "link" | "category";
  title: string;
  category?: string;
  link?: string;
  items?: MenuItemArray;

  /**
   * disabled menu item
   */
  disabled?: boolean;
};

export type MenuItemArray = MenuItem[];

export type MenuItem = string | MenuItemObject;

export interface ILayouts {
  [key: string]: string;
}

interface CanonicalLink {
  rel: "canonical";
  href: string;
}

interface AlternateLink {
  rel: "alternate";
  href?: string;
  hreflang: string;
}

export type FrontMatterLink = CanonicalLink | AlternateLink;

export interface FrontMatter {
  title?: string;
  layout?: string;
  meta?: {
    description?: string;
    keywords?: string;
    title?: string;
    link?: FrontMatterLink[];
  };
  date?: string | Date;
  tags?: string[];
  account?: {
    imageUrl?: string;
    name?: string;
  };
}
