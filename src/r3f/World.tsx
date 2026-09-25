import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Color } from "three";
import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";
import { Landscape } from "./Landscape";
import { params, poses, studio } from "./studio";
import type { Quality } from "./quality";

const VOID = new Color("#181818");

function CameraRig({ orbit }: { orbit: boolean }) {
  const { camera, scene } = useThree();

  useFrame(() => {
    scene.background = VOID;
    if (orbit) return;
    const p = poses[studio.scene];
    camera.position.x += (p.x + studio.pointer.x * 1.6 - camera.position.x) * 0.028;
    camera.position.y += (p.y - camera.position.y) * 0.028;
    camera.position.z += (p.z + studio.pointer.y * 1.1 - camera.position.z) * 0.028;
    camera.lookAt(p.lookX, p.lookY, p.lookZ);
  });
  return null;
}

function LiveEffects({ bloom }: { bloom: boolean }) {
  const bloomRef = useRef<{ intensity: number } | null>(null);
  const noise = useRef<{ opacity: number } | null>(null);
  useFrame(() => {
    if (bloomRef.current) bloomRef.current.intensity = params.bloom;
    if (noise.current) noise.current.opacity = params.grain;
  });
  if (!bloom) return null;
  return (
    <EffectComposer>
      <Bloom ref={bloomRef as never} intensity={params.bloom} luminanceThreshold={0.88} mipmapBlur />
      <Noise ref={noise as never} opacity={params.grain} />
    </EffectComposer>
  );
}

export function World({ orbit = false, quality }: { orbit?: boolean; quality: Quality }) {
  return (
    <>
      <ambientLight intensity={0.42} color="#c8c4bc" />
      <directionalLight color="#d8d2c6" intensity={0.55} position={[8, 22, 6]} />
      <directionalLight color="#8a8e94" intensity={0.22} position={[-12, 10, -8]} />
      <Landscape quality={quality} />
      <CameraRig orbit={orbit} />
      <LiveEffects bloom={quality.bloom} />
    </>
  );
}
