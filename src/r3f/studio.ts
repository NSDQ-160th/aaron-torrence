export type SceneName = "hero" | "reel" | "work" | "approach" | "about" | "contact";

export type Engine = {
  canvas: HTMLCanvasElement | null;
  setScene: (name: SceneName) => void;
  setProgress: (v: number) => void;
  dispose: () => void;
};

export const params = {
  bloom: 0.02,
  speed: 1,
  contour: 18,
  fog: 0.016,
  relief: 1.05,
  grain: 0.018,
  metalness: 1,
  roughness: 0.22,
  transmission: 0.85,
  env: 0.35,
};

export const studio = {
  scene: "hero" as SceneName,
  pointer: { x: 0, y: 0 },
};

export const poses: Record<
  SceneName,
  { x: number; y: number; z: number; lookX: number; lookY: number; lookZ: number }
> = {
  hero: { x: 2.4, y: 22, z: 18, lookX: 0, lookY: 0, lookZ: 0 },
  reel: { x: -6, y: 16, z: 14, lookX: 2, lookY: 0, lookZ: -2 },
  work: { x: 10, y: 18, z: 10, lookX: 0, lookY: 0, lookZ: 0 },
  approach: { x: 0.4, y: 28, z: 8, lookX: 0, lookY: 0, lookZ: 0 },
  about: { x: -8, y: 14, z: 12, lookX: 1, lookY: 0, lookZ: -1 },
  contact: { x: 4, y: 20, z: 20, lookX: 0, lookY: 0, lookZ: 0 },
};
