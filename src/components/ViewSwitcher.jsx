import { useState, useEffect } from "react";

export function ViewSwitcher() {
  const [view, setView] = useState(
    () => localStorage.getItem("catalogView") || "grid"
  );

  useEffect(() => {
    localStorage.setItem("catalogView", view);
    window.dispatchEvent(new Event("catalog-view-change"));
  }, [view]);

  return (
    <div className="view-switcher">
      <button
        className={view === "grid" ? "active" : ""}
        onClick={() => setView("grid")}
        title="Плитка"
      >
        ▦
      </button>
      <button
        className={view === "list" ? "active" : ""}
        onClick={() => setView("list")}
        title="Список"
      >
        ☰
      </button>
    </div>
  );
}

export function useCatalogView() {
  const [view, setView] = useState(
    () => localStorage.getItem("catalogView") || "grid"
  );

  useEffect(() => {
    const onChange = () =>
      setView(localStorage.getItem("catalogView") || "grid");
    window.addEventListener("catalog-view-change", onChange);
    return () => window.removeEventListener("catalog-view-change", onChange);
  }, []);

  return view;
}