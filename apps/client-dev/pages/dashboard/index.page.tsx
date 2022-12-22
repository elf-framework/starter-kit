/**
 * meta data 정의
 */

import { Button } from "@elf-framework/ui";

import { Header } from "~/component/site/Header";
import { FrontMatter } from "~/types/site";

export const frontmatter: FrontMatter = {
  title: "Dashboard",
  layout: "DashboardReadLayout",
};

export default function Page() {
  return (
    <div class="page" style={{ paddingTop: 50 }}>
      <Header>
        <h3>Dashboard Header</h3>
        <div>center</div>
        <div>
          Buttons:{" "}
          <Button size="small" variant="primary">
            sample
          </Button>
        </div>
      </Header>
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
    </div>
  );
}
