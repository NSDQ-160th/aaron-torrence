import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Engine, SceneName } from "../r3f/studio";

const order: { id: string; scene: SceneName }[] = [
  { id: "hero", scene: "hero" },
  { id: "reel", scene: "reel" },
  { id: "look", scene: "reel" },
  { id: "selected", scene: "work" },
  { id: "approach", scene: "approach" },
  { id: "specs", scene: "about" },
  { id: "about", scene: "about" },
  { id: "contact", scene: "contact" },
];

export function bindScroll(engine: Engine) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return [];

  return order
    .map(({ id, scene }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 45%",
        onEnter: () => engine.setScene(scene),
        onEnterBack: () => engine.setScene(scene),
      });
    })
    .filter((t): t is ScrollTrigger => t !== null);
}
