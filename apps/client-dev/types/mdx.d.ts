declare module "*.mdx" {
  import type { ContentType } from "@elf-framework/ui";
  let MDXComponent: (props: any) => ContentType;
  export default MDXComponent;
}
