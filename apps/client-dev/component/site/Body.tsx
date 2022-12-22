import "./Body.scss";

interface BodyProps {}

export function Body(props: BodyProps) {
  const { content } = props;

  return <section class={`body `}>{content}</section>;
}
