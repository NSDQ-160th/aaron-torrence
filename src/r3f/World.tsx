import { Suspense, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";
import { Delorean } from "./Delorean";
import { params, poses, studio } from "./studio";
import type { Quality } from "./quality";

function CameraRig({ orbit }: { orbit: boolean }) {
  const { camera } = useThree();
  useFrame(() => {
    if (orbit) return;
    const p = poses[studio.scene];
    camera.position.x += (p.x + studio.pointer.x * 0.1 - camera.position.x) * 0.05;
    camera.position.y += (p.y - camera.position.y) * 0.05;
    camera.position.z += (p.z - camera.position.z) * 0.05;
    camera.lookAt(p.lookX, p.lookY, 0);
  });
  return null;
}

function LiveEffects({ bloom }: { bloom: boolean }) {
  const bloomRef = useRef<{ intensity: number } | null>(null);
  const noise = useRef<{ opacity: number } | null>(null);
  useFrame(({ scene }) => {
    if (bloomRef.current) bloomRef.current.intensity = params.bloom;
    if (noise.current) noise.current.opacity = params.grain;
    scene.environmentIntensity = params.env;
  });
  if (!bloom) return null;
  return (
    <EffectComposer>
      <Bloom ref={bloomRef as never} intensity={params.bloom} luminanceThreshold={0.82} mipmapBlur />
      <Noise ref={noise as never} opacity={params.grain} />
    </EffectComposer>
  );
}

export function World({ orbit = false, quality }: { orbit?: boolean; quality: Quality }) {
  return (
    <>
      <ambientLight intensity={0.18} />
      <directionalLight color="#ff3ad1" intensity={1.6} position={[-4, 3.2, 2]} />
      <directionalLight color="#7cf0ff" intensity={2.2} position={[4, 2.4, -1]} />
      <pointLight color="#7cf0ff" intensity={2.4} distance={10} position={[-3, 1.2, 2]} />
      <pointLight color="#ff3ad1" intensity={1.8} distance={12} position={[3, 2, -3]} />
      <Suspense fallback={null}>
        {!quality.low && <Environment preset="night" environmentIntensity={params.env} />}
        <Delorean quality={quality} />
      </Suspense>
      <CameraRig orbit={orbit} />
      <LiveEffects bloom={quality.bloom} />
    </>
  );
}
