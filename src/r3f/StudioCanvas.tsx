import { useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ACESFilmicToneMapping } from "three";
import { World } from "./World";
import { poses } from "./studio";
import { detectQuality } from "./quality";

export default function StudioCanvas() {
  const hero = poses.hero;
  const quality = useMemo(() => detectQuality(), []);
  const [play, setPlay] = useState(true);

  useEffect(() => {
    const onVis = () => setPlay(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <Canvas
      camera={{ fov: 38, position: [hero.x, hero.y, hero.z], far: 400 }}
      dpr={quality.dpr}
      frameloop={play ? "always" : "never"}
      gl={{
        antialias: quality.antialias,
        alpha: false,
        toneMapping: ACESFilmicToneMapping,
        powerPreference: quality.low ? "low-power" : "high-performance",
      }}
    >
      <World quality={quality} />
    </Canvas>
  );
}
