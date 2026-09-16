export type SceneName = "hero" | "reel" | "work" | "approach" | "about" | "contact";

export const params = {
  bloom: 0.55,
  speed: 1,
  metalness: 1,
  roughness: 0.22,
  transmission: 0.85,
  env: 0.35,
  grain: 0.02,
};

export const studio = {
  scene: "hero" as SceneName,
  pointer: { x: 0, y: 0 },
};

export const poses: Record<SceneName, { x: number; y: number; z: number; lookX: number; lookY: number }> = {
  hero: { x: -1.6, y: 1.05, z: 6.6, lookX: 1.5, lookY: 1.05 },
  reel: { x: -2.4, y: 1.2, z: 5.8, lookX: 0.2, lookY: 1.1 },
  work: { x: 2.6, y: 1.4, z: 7.2, lookX: 0.8, lookY: 1.0 },
  approach: { x: 0.1, y: 2.2, z: 8.4, lookX: 0.8, lookY: 0.8 },
  about: { x: -2.8, y: 1.1, z: 4.6, lookX: 0.4, lookY: 1.0 },
  contact: { x: 0.2, y: 1.6, z: 8.0, lookX: 0.9, lookY: 0.9 },
};
