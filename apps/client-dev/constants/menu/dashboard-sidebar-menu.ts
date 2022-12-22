import { url } from "~/component/utils/url";
import { MenuItem } from "~/types/site.d";
const menu: MenuItem[] = [
  "GENERAL",
  {
    link: url("dashboard/app/"),
    title: "App",
  },
  {
    link: url("dashboard/e-commerce/"),
    title: "E-commerce",
  },
  {
    link: url("dashboard/analytics/"),
    title: "Analytics",
  },
  {
    link: "/article/install/",
    title: "Install",
    items: [
      {
        link: "/article/install/vite/",
        title: "Vite",
      },
      {
        link: "/article/install/webpack/",
        title: "webpack",
        disabled: true,
      },
      {
        link: "/article/install/create-sapa-app/",
        title: "create-sapa-app",
        disabled: true,
      },
    ],
  },
  {
    link: "/article/development/",
    title: "Development",
  },
  {
    link: "/article/contribute/",
    title: "Contribute",
  },
];

export default menu;
