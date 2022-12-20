interface ILayouts {
  [key: string]: string;
}

/**
 * Predefined layouts for pages
 */
export const layouts: ILayouts = {
  "pages/article": "ArticleReadLayout",
  "pages/blog": "BlogReadLayout",
  "pages/main": "HomeLayout",
  "pages/document": "DocumentReadLayout",
  "pages/page": "PageReadLayout",
  "pages/simple": "SimpleReadLayout",
  "pages/embeded": "EmbededReadLayout",
  "pages/application": "ApplicationReadLayout",
};
