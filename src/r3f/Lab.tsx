import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Pane } from "tweakpane";
import { ACESFilmicToneMapping } from "three";
import { useEffect } from "react";
import { World } from "./World";
import { params } from "./studio";

export default function Lab() {
  useEffect(() => {
    const pane = new Pane({ title: "DeLorean lab" }) as unknown as {
      addBinding: (target: object, key: string, opt?: Record<string, unknown>) => void;
      dispose: () => void;
    };
    pane.addBinding(params, "bloom", { min: 0, max: 2, step: 0.01 });
    pane.addBinding(params, "speed", { min: 0, max: 3, step: 0.01 });
    pane.addBinding(params, "metalness", { min: 0, max: 1, step: 0.01 });
    pane.addBinding(params, "roughness", { min: 0, max: 1, step: 0.01 });
    pane.addBinding(params, "transmission", { min: 0, max: 1, step: 0.01 });
    pane.addBinding(params, "env", { min: 0, max: 2, step: 0.01 });
    pane.addBinding(params, "grain", { min: 0, max: 0.08, step: 0.001 });
    return () => pane.dispose();
  }, []);

  return (
    <Canvas
      camera={{ fov: 32, position: [-1.2, 1.2, 6.5] }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, toneMapping: ACESFilmicToneMapping }}
    >
      <World orbit />
      <OrbitControls enableDamping />
    </Canvas>
  );
}
