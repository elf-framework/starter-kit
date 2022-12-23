import "./Logo.scss";

import { url } from "~/component/utils/url";

interface LogoProps {
  link?: string;
}

export function Logo({ link = url("") }: LogoProps) {
  return (
    <div class="logo">
      <a href={link}>
        <span class="symbol">E</span>
        <div>LF</div>
      </a>
    </div>
  );
}
