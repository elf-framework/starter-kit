import { url } from "~/component/utils/url";

interface IMenu {
  type: "link" | "category";
  title: string;
  category?: string;
  link?: string;
  items?: IMenu[];
}

const menu: IMenu[] = [
  {
    type: "link",
    title: "Application",
    category: "/application",
    link: url("application/"),
  },
  {
    type: "link",
    title: "Feature Page",
    category: "/page",
    link: url("page/"),
  },
  {
    type: "link",
    title: "Document",
    category: "/document",
    link: url("document/"),
  },
  {
    type: "link",
    title: "Article",
    category: "/article",
    link: url("article/"),
  },
  {
    type: "link",
    title: "Blog",
    category: "/blog",
    link: url("blog/"),
  },
  {
    type: "link",
    title: "Simple",
    category: "/simple",
    link: url("simple/"),
  },

  {
    type: "link",
    title: "Embeded",
    category: "/embeded",
    link: url("embeded/"),
  },
];

export default menu;