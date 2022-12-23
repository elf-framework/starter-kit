import DarkModeFilled from "@elf-framework/icon/DarkModeFilled";
import LightModeFilled from "@elf-framework/icon/LightModeFilled";
import { useEmit, useState, useSubscribe } from "@elf-framework/sapa";
import { RoundButton } from "@elf-framework/ui";

export function ThemeButton() {
  const mode = window.localStorage.getItem("view-mode") || "light";
  const [viewMode, setViewMode] = useState(mode);

  useSubscribe("view-mode", (mode: string) => {
    setViewMode(mode);
  });

  return (
    <div style={{ justifyContent: "flex-end", color: "inherit" }}>
      {viewMode === "dark" ? (
        <RoundButton
          iconOnly
          quiet
          onClick={() => {
            setViewMode("light");
            useEmit("view-mode", "light");
            window.localStorage.setItem("view-mode", "light");
            document.body.classList.toggle("theme-dark", false);
          }}
        >
          <DarkModeFilled />
        </RoundButton>
      ) : (
        <RoundButton
          iconOnly
          quiet
          onClick={() => {
            setViewMode("dark");
            useEmit("view-mode", "dark");
            window.localStorage.setItem("view-mode", "dark");
            document.body.classList.toggle("theme-dark", true);
          }}
        >
          <LightModeFilled />
        </RoundButton>
      )}
    </div>
  );
}
