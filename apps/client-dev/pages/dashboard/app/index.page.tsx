/**
 * meta data 정의
 */

import { Button } from "@elf-framework/ui";

import { Body } from "~/component/site/Body";
import { Header } from "~/component/site/Header";
import { FrontMatter } from "~/types/site";

export const frontmatter: FrontMatter = {
  title: "App",
  layout: "DashboardReadLayout",
};

export default function Page() {
  return (
    <div>
      <Header sticky>
        <h3>Sticky Header</h3>
        <div></div>
        <div>
          Buttons:{" "}
          <Button size="small" variant="primary">
            sample
          </Button>
        </div>
      </Header>
      <Body>
        <h1>App</h1>
        <h1>fdsafadsfsdf</h1>
        <h1 style={{ height: 5000 }}>fdsafadsfsdf</h1>
      </Body>
    </div>
  );
}
