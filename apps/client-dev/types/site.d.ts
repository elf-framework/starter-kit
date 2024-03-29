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

  displayLinks?: boolean;
  /**
   * links to other pages
   */
  links?: {
    /**
     * url of the link
     */
    url: string;

    /**
     * title of the link
     * @default url
     */
    title: string;
  }[];

  /**
   * if true, the page will be editable
   */
  editableSourceLink?: boolean;

  /**
   * the filename of the page for editing
   */
  filename?: string;

  /**
   * if true, the table of contents will be displayed
   */
  tableOfContents?: boolean;
}

type Prettify<T> = {
  [K in keyof T]: Prettify<T[K]>;
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};

type Interested = {
  a: string;
} & {
  b: string;
} & {
  c: string;
  d: {
    e: string;
  } & {
    f: string;
  };
};

export type result = Prettify<Interested>;

export type identity<T> = T;
export type flatten<T> = identity<{
  [K in keyof T]: T[K];
}>;

export type result2 = flatten<Interested>;
