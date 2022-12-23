import "./Header.scss";

interface HeaderProps {
  title: string;
  sticky?: boolean;
}

export function Header(props: HeaderProps) {
  const { title, content, sticky = false } = props;

  return (
    <header class={`header ${sticky ? "sticky" : ""}`}>
      {title ? <div class="header-title">{title}</div> : undefined}
      {content}
    </header>
  );
}
