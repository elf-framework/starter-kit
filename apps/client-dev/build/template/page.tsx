/**
 * meta data 정의
 */

import { FrontMatter } from "~/types/site";

export const frontmatter: FrontMatter = {
  title: "{{title}}",
  layout: "{{pageLayout}}",
};

export default function Page() {
  return <div>Page View</div>;
}
