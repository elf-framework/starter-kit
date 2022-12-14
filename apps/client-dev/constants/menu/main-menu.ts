import { url } from "~/component/utils/url";
import { MenuItem } from "~/types/site";

const menu: MenuItem[] = [
  {
    type: "link",
    title: "Application",
    category: "/application",
    link: url("application/"),
  },
  {
    type: "link",
    title: "Features",
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
    title: "Dashboard",
    category: "/dashboard",
    link: url("dashboard/"),
  },
  {
    type: "link",
    title: "Markdown",
    category: "/markdown",
    link: url("markdown/"),
  },

  {
    type: "link",
    title: "Embeded",
    category: "/embeded",
    link: url("embeded/"),
  },
];

export default menu;
