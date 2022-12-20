import { MenuItem } from "~/types/site";

const menu: MenuItem[] = [
  "Introduction",
  {
    link: "/introduction/core/",
    title: "Core Concept",
  },
  {
    link: "/introduction/getting-started/",
    title: "Getting Started",
  },
  {
    link: "/introduction/install/",
    title: "Install",
    items: [
      {
        link: "/introduction/install/vite/",
        title: "Vite",
      },
      {
        link: "/introduction/install/webpack/",
        title: "! webpack",
        disabled: true,
      },
      {
        link: "/introduction/install/create-sapa-app/",
        title: "! create-sapa-app",
        disabled: true,
      },
    ],
  },
  {
    link: "/introduction/develop/",
    title: "Development",
  },
  {
    link: "/introduction/contribute/",
    title: "Contribute",
  },
];

export default menu;
