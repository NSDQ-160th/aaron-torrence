import {
  AmbientLight,
  DirectionalLight,
  PerspectiveCamera,
  PointLight,
  Scene,
  Vector2,
  WebGLRenderer,
} from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import WebGL from "three/addons/capabilities/WebGL.js";
import { createLens, type LensRig } from "./lens";
import { grainShader } from "./materials";

export type SceneName = "hero" | "reel" | "work" | "approach" | "about" | "contact";

type CamPose = { x: number; y: number; z: number; lookY: number };

const poses: Record<SceneName, CamPose> = {
  hero: { x: 0.35, y: 0.35, z: 4.8, lookY: 0.15 },
  reel: { x: -0.55, y: 0.1, z: 5.4, lookY: 0 },
  work: { x: 1.6, y: 0.4, z: 6.4, lookY: -0.15 },
  approach: { x: 0.7, y: 0.55, z: 5.6, lookY: 0.12 },
  about: { x: -1.35, y: 0.3, z: 6.0, lookY: 0.05 },
  contact: { x: 0.25, y: 0, z: 7.0, lookY: 0 },
};

export type Engine = {
  canvas: HTMLCanvasElement;
  setScene: (name: SceneName) => void;
  setProgress: (v: number) => void;
  dispose: () => void;
};

export function canWebGL() {
  return WebGL.isWebGL2Available() || WebGL.isWebGLAvailable();
}

export function createEngine(canvas: HTMLCanvasElement): Engine {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.matchMedia("(pointer: coarse)").matches;
  const low = mobile || navigator.hardwareConcurrency <= 4;

  const renderer = new WebGLRenderer({
    canvas,
    antialias: !low,
    alpha: true,
    powerPreference: "high-performance",
  });
  const cap = low ? 1 : Math.min(window.devicePixelRatio, 1.75);
  renderer.setPixelRatio(cap);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  scene.background = null;
  const camera = new PerspectiveCamera(32, window.innerWidth / window.innerHeight, 0.1, 40);
  camera.position.set(0.35, 0.35, 4.8);

  scene.add(new AmbientLight(0x1a1d24, 0.85));
  const key = new DirectionalLight(0xffb067, 3.4);
  key.position.set(-4, 3, 2);
  const rim = new DirectionalLight(0x8ab4ff, 2.1);
  rim.position.set(3, 1.5, -2);
  const core = new PointLight(0xffc27a, 3.4, 8);
  core.position.set(0.2, 0.6, 1.4);
  scene.add(key, rim, core);

  const lens: LensRig = createLens();
  lens.group.scale.setScalar(0.92);
  scene.add(lens.group);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  if (!low && !reduced) {
    composer.addPass(
      new UnrealBloomPass(new Vector2(window.innerWidth, window.innerHeight), 0.35, 0.7, 0.85)
    );
  }
  const grain = new ShaderPass(grainShader);
  composer.addPass(grain);
  composer.addPass(new OutputPass());

  let target: CamPose = { ...poses.hero };
  let pointer = { x: 0, y: 0 };
  let running = true;
  let raf = 0;

  const onMove = (e: PointerEvent) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener("pointermove", onMove, { passive: true });

  const onResize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    composer.setSize(w, h);
  };
  window.addEventListener("resize", onResize);

  const onVis = () => {
    running = document.visibilityState === "visible";
    if (running) loop();
  };
  document.addEventListener("visibilitychange", onVis);

  const clock0 = performance.now();
  const loop = () => {
    if (!running) return;
    raf = requestAnimationFrame(loop);
    const t = (performance.now() - clock0) / 1000;
    if (!reduced) {
      lens.group.rotation.y += (pointer.x * 0.35 - lens.group.rotation.y) * 0.04;
      lens.group.rotation.x += (0.35 + pointer.y * 0.12 - lens.group.rotation.x) * 0.04;
      lens.dust.rotation.y = t * 0.03;
    }
    lens.glass.uniforms.uTime.value = t;
    lens.glass.uniforms.uPointer.value.set(pointer.x, pointer.y);
    grain.uniforms.uTime.value = t;

    camera.position.x += (target.x + pointer.x * 0.08 - camera.position.x) * 0.045;
    camera.position.y += (target.y - camera.position.y) * 0.045;
    camera.position.z += (target.z - camera.position.z) * 0.045;
    camera.lookAt(0, target.lookY, 0);
    composer.render();
  };
  loop();

  return {
    canvas,
    setScene(name) {
      target = { ...poses[name] };
    },
    setProgress() {},
    dispose() {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      composer.dispose();
      renderer.dispose();
    },
  };
}
