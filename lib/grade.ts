/** Colour grades; must match the `:root[data-theme]` blocks in globals.css. */
export const GRADES = [
  { id: "teal", label: "Teal", swatch: "#5ee6d8" },
  { id: "amber", label: "Amber", swatch: "#ffb340" },
  { id: "crimson", label: "Crimson", swatch: "#ff4d5e" },
  { id: "violet", label: "Violet", swatch: "#a78bff" },
] as const;

export type GradeId = (typeof GRADES)[number]["id"];

export const GRADE_STORAGE_KEY = "cinema:grade";
export const GRADE_EVENT = "cinema:grade-change";

/** Runs in <head> before first paint so a saved grade never flashes the default. */
export const GRADE_BOOT_SCRIPT = `(function(){try{var t=localStorage.getItem("${GRADE_STORAGE_KEY}");if(t&&t!=="teal")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

/** Applies a grade to the document, remembers it, and notifies listeners. */
export function applyGrade(id: GradeId) {
  const root = document.documentElement;
  if (id === "teal") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", id);
  try {
    localStorage.setItem(GRADE_STORAGE_KEY, id);
  } catch {
    // Not persisted; the grade still applies for this visit.
  }
  window.dispatchEvent(new Event(GRADE_EVENT));
}
