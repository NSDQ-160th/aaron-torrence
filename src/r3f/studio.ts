export type SceneName = "hero" | "reel" | "work" | "approach" | "about" | "contact";

export const params = {
  bloom: 0.28,
  speed: 1,
  metalness: 1,
  roughness: 0.28,
  transmission: 1,
  env: 0.55,
  grain: 0.018,
};

export const studio = {
  scene: "hero" as SceneName,
  pointer: { x: 0, y: 0 },
};

export const poses: Record<SceneName, { x: number; y: number; z: number; lookX: number; lookY: number }> = {
  hero: { x: -0.35, y: 0.12, z: 3.45, lookX: 0.85, lookY: 0.04 },
  reel: { x: -0.55, y: 0.06, z: 4.15, lookX: 0.5, lookY: 0 },
  work: { x: 1.7, y: 0.22, z: 5.0, lookX: -0.15, lookY: 0.04 },
  approach: { x: 0.4, y: 0.32, z: 4.5, lookX: 0.4, lookY: 0.06 },
  about: { x: -1.05, y: 0.16, z: 4.7, lookX: 0.55, lookY: 0.03 },
  contact: { x: 0.1, y: 0.04, z: 5.5, lookX: 0.4, lookY: 0 },
};
