/**
 * meta data 정의
 */

import { Button } from "@elf-framework/ui";
import { Body } from "~/component/site/Body";

import { Header } from "~/component/site/Header";
import { FrontMatter } from "~/types/site";

export const frontmatter: FrontMatter = {
  title: "Dashboard",
  layout: "DashboardReadLayout",
};

export default function Page() {
  return (
    <div class="page">
      <Header>
        <h3>Base Header</h3>
        <div></div>
        <div>
          Buttons:{" "}
          <Button size="small" variant="primary">
            sample
          </Button>
        </div>
      </Header>
      <Body>

      <h1>Dashboard</h1>
      <h1>fdsafadsfsdf</h1>
      <h1>fdsafadsfsdf</h1>
      <h1>fdsafadsfsdf</h1>
      <h1>fdsafadsfsdf</h1>
      <h1>fdsafadsfsdf</h1>
      <h1>fdsafadsfsdf</h1>
      <h1>fdsafadsfsdf</h1>
      <h1>Dashboard</h1>
      <h1>fdsafadsfsdf</h1>
      <h1>fdsafadsfsdf</h1>
      <h1>fdsafadsfsdf</h1>
      <h1>fdsafadsfsdf</h1>
      <h1>fdsafadsfsdf</h1>
      <h1>fdsafadsfsdf</h1>
      <h1>fdsafadsfsdf</h1>
      <h1>Dashboard</h1>
      <h1>fdsafadsfsdf</h1>
      <h1>fdsafadsfsdf</h1>
      <h1>fdsafadsfsdf</h1>
      <h1>fdsafadsfsdf</h1>
      <h1>fdsafadsfsdf</h1>
      <h1>fdsafadsfsdf</h1>
      <h1>fdsafadsfsdf</h1>
      <h1>Dashboard</h1>
      <h1>fdsafadsfsdf</h1>
      <h1>fdsafadsfsdf</h1>
      <h1>fdsafadsfsdf</h1>
      <h1>fdsafadsfsdf</h1>
      <h1>fdsafadsfsdf</h1>
      <h1>fdsafadsfsdf</h1>
      <h1>fdsafadsfsdf</h1>
      </Body>
    </div>
  );
}
