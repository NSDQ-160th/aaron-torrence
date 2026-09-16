import { Canvas } from "@react-three/fiber";
import { ACESFilmicToneMapping } from "three";
import { World } from "./World";
import { poses } from "./studio";

export default function StudioCanvas() {
  const hero = poses.hero;
  return (
    <Canvas
      camera={{ fov: 30, position: [hero.x, hero.y, hero.z] }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, toneMapping: ACESFilmicToneMapping }}
    >
      <World />
    </Canvas>
  );
}
