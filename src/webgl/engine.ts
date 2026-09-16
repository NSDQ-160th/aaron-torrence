import {
  ACESFilmicToneMapping,
  AmbientLight,
  DirectionalLight,
  PerspectiveCamera,
  PointLight,
  PMREMGenerator,
  Scene,
  SRGBColorSpace,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import WebGL from "three/addons/capabilities/WebGL.js";
import { createLens, type LensRig } from "./lens";
import { grainShader } from "./materials";
import { createStills, tickStills, type StillRig } from "./stills";

export type SceneName = "hero" | "reel" | "work" | "approach" | "about" | "contact";

type CamPose = { x: number; y: number; z: number; lookX: number; lookY: number };

const poses: Record<SceneName, CamPose> = {
  hero: { x: -0.35, y: 0.12, z: 3.45, lookX: 0.85, lookY: 0.04 },
  reel: { x: -0.55, y: 0.06, z: 4.15, lookX: 0.5, lookY: 0 },
  work: { x: 1.7, y: 0.22, z: 5.0, lookX: -0.15, lookY: 0.04 },
  approach: { x: 0.4, y: 0.32, z: 4.5, lookX: 0.4, lookY: 0.06 },
  about: { x: -1.05, y: 0.16, z: 4.7, lookX: 0.55, lookY: 0.03 },
  contact: { x: 0.1, y: 0.04, z: 5.5, lookX: 0.4, lookY: 0 },
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
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const cap = low ? 1 : Math.min(window.devicePixelRatio, 1.6);
  renderer.setPixelRatio(cap);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  scene.background = null;

  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.32;
  pmrem.dispose();

  const camera = new PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 40);
  camera.position.set(-0.35, 0.12, 3.45);

  scene.add(new AmbientLight(0x141820, 0.28));
  const key = new DirectionalLight(0xffb067, 2.6);
  key.position.set(-3.5, 2.4, 2.2);
  const rim = new DirectionalLight(0x8ab4ff, 1.8);
  rim.position.set(2.8, 0.8, -1.6);
  const core = new PointLight(0xffc27a, 2.2, 7);
  core.position.set(0.45, 0.15, 1.2);
  scene.add(key, rim, core);

  const lens: LensRig = createLens();
  lens.group.position.set(1.05, 0.12, 0);
  lens.group.scale.setScalar(low ? 0.78 : 0.92);
  scene.add(lens.group);

  const stills: StillRig = createStills();
  scene.add(stills.group);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  if (!low && !reduced) {
    composer.addPass(
      new UnrealBloomPass(new Vector2(window.innerWidth, window.innerHeight), 0.22, 0.55, 0.82)
    );
  }
  const grain = new ShaderPass(grainShader);
  composer.addPass(grain);
  composer.addPass(new OutputPass());

  let target: CamPose = { ...poses.hero };
  let pointer = { x: 0, y: 0 };
  let running = true;
  let raf = 0;
  const pull = new Vector3();

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
      lens.group.rotation.y += (0.55 + pointer.x * 0.28 - lens.group.rotation.y) * 0.045;
      lens.group.rotation.x += (0.16 + pointer.y * 0.1 - lens.group.rotation.x) * 0.045;
      lens.dust.rotation.y = t * 0.04;
      pull.set(pointer.x * 0.28, -pointer.y * 0.18, 0);
      for (const frag of lens.frags) {
        const tx = frag.rest.x + pull.x * frag.weight;
        const ty = frag.rest.y + pull.y * frag.weight;
        frag.mesh.position.x += (tx - frag.mesh.position.x) * 0.07;
        frag.mesh.position.y += (ty - frag.mesh.position.y) * 0.07;
      }
    }

    lens.streak.uniforms.uTime.value = t;
    grain.uniforms.uTime.value = t;
    tickStills(stills);

    camera.position.x += (target.x + pointer.x * 0.1 - camera.position.x) * 0.05;
    camera.position.y += (target.y - camera.position.y) * 0.05;
    camera.position.z += (target.z - camera.position.z) * 0.05;
    camera.lookAt(target.lookX, target.lookY, 0);
    composer.render();
  };
  loop();

  return {
    canvas,
    setScene(name) {
      target = { ...poses[name] };
      stills.target = name === "work" || name === "reel" ? 0.88 : 0;
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
