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
];

export default menu;
