/**
 * meta data 정의
 */

import { Button, InputEditor } from "@elf-framework/ui";

import { Body } from "~/component/site/Body";
import { Header } from "~/component/site/Header";
import { FrontMatter } from "~/types/site";

export const frontmatter: FrontMatter = {
  title: "E Commerce",
  layout: "DashboardReadLayout",
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

        <p>
          <a href="/dashboard/e-commerce/product/">Go to Product page</a>
        </p>

        <p>
          <a href="/dashboard/e-commerce/product/create">
            Go to Product Create page
          </a>
        </p>

        <p>
          <a href="/dashboard/e-commerce/product/1">
            Go to Product Detail page
          </a>
        </p>
      </Body>
    </div>
  );
}
