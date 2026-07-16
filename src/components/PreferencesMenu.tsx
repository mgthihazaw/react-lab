import { useEffect, useRef, useState } from "react";
import { PreferencesPanel } from "../features/preferences/components/PreferencesPanel";

export function PreferencesMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="preferences-menu" ref={menuRef}>
      <button
        className="preferences-menu__trigger"
        type="button"
        aria-expanded={isOpen}
        aria-controls="preferences-panel"
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className="preferences-menu__mark" aria-hidden="true">
          UI
        </span>
        <span>Preferences</span>
      </button>

      {isOpen && <PreferencesPanel />}
    </div>
  );
}
