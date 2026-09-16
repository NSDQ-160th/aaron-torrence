import { createRoot, type Root } from "react-dom/client";
import { StrictMode, type ReactNode } from "react";
import type { Engine, SceneName } from "../webgl/engine";
import { studio } from "./studio";
import StudioCanvas from "./StudioCanvas";
import Lab from "./Lab";

let root: Root | null = null;

function mount(el: HTMLElement, node: ReactNode) {
  root?.unmount();
  root = createRoot(el);
  root.render(<StrictMode>{node}</StrictMode>);
}

export function mountStudio(el: HTMLElement): Engine {
  mount(el, <StudioCanvas />);
  return {
    canvas: el.querySelector("canvas") as HTMLCanvasElement,
    setScene(name: SceneName) {
      studio.scene = name;
    },
    setProgress() {},
    dispose() {
      root?.unmount();
      root = null;
    },
  };
}

export function mountLab(el: HTMLElement) {
  mount(el, <Lab />);
}
