import { Button, InputEditor } from "@elf-framework/ui";

import { Body } from "~/component/site/Body";
import { Header } from "~/component/site/Header";
import { FrontMatter } from "~/types/site";

/**
 * meta data 정의
 */
export const frontmatter: FrontMatter = {
  title: "{{title}}",
  layout: "{{pageLayout}}",
};

export default function Page() {
  return (
    <div class="page">
      <Header>
        <div class="left">Title</div>
        <div class="center">
          <div class="search">
            <InputEditor type="text" placeholder="Search" />
          </div>
        </div>
        <div class="right">
          <Button variant="primary">Button</Button>
        </div>
      </Header>
      <Body>
        <p>This is body text of e-commerce page.</p>
        <p>
          Please edit this page at
          apps/client-dev/pages/dashboard/e-commerce/index.page.tsx
        </p>
      </Body>
    </div>
  );
}
