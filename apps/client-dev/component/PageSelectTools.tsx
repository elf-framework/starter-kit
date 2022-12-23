import mainMenus from "../constants/menu/main-menu";
import "./PageSelectTools.scss";

export function PageSelectTools() {
  const pathname = location.pathname;

  return (
    <div class="page-select-tools">
      <select
        class="select"
        onChange={(e) => {
          if (e.target.value) {
            location.href = e.target.value;
          }
        }}
      >
        <option value="/">Main</option>
        {mainMenus.map((it) => {
          const selected = pathname.startsWith(it.category);

          const props = {
            selected: selected ? "selected" : undefined,
          };

          return (
            <option value={it.link} {...props}>
              {it.title}
            </option>
          );
        })}
      </select>
    </div>
  );
}
