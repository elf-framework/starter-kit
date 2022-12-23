import { url } from "~/component/utils/url";
import { MenuItem } from "~/types/site.d";
const menu: MenuItem[] = [
  "Diagram Syntax",
  {
    link: url("markdown/flowchart/"),
    title: "Flowchart",
  },
  {
    link: url("markdown/sequence/"),
    title: "Sequence Diagram",
  },
  {
    link: url("markdown/class/"),
    title: "Class Diagram",
  },
  {
    link: url("markdown/state/"),
    title: "State Diagram",
  },
  {
    link: url("markdown/entity/"),
    title: "Entity Relationship Diagram",
  },
  {
    link: url("markdown/user-journey/"),
    title: "User Journey",
  },
  {
    link: url("markdown/gantt/"),
    title: "Gantt",
  },
  {
    link: url("markdown/pie/"),
    title: "Pie Chart",
  },
  {
    link: url("markdown/requirement/"),
    title: "Requirement Diagram",
  },
];

export default menu;
