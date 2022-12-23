declare module "*.mdx" {
  import type { ContentType } from "@elf-framework/sapa";
  let MDXComponent: (props: any) => ContentType;
  export default MDXComponent;
}
