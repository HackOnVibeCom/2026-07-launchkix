import patterns from "@/styles/patterns.module.css";

/** Full-bleed mesh + film grain backdrop (decorative) */
export function MeshBackground() {
  return (
    <div
      className={`${patterns.mesh} ${patterns.filmGrain}`}
      aria-hidden="true"
    />
  );
}
