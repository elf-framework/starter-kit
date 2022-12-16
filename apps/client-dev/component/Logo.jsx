import { url } from "../utils/url";
import "./Logo.scss";

export function Logo({ link = url("") }) {
  return (
    <div class="logo">
      <a href={link}>
        <span class="symbol">E</span>
        <div>LF</div>
      </a>
    </div>
  );
}
