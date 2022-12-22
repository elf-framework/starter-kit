import "./Header.scss";

interface HeaderProps {
  title: string;
}

export function Header(props: HeaderProps) {
  const { title, content } = props;

  return (
    <header class="header">
      {title ? <div class="header-title">{title}</div> : undefined}
      {content}
    </header>
  );
}
