import { Suspense, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment, useTexture } from "@react-three/drei";
import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";
import { MeshBasicMaterial } from "three";
import { Lens } from "./Lens";
import { params, poses, studio } from "./studio";

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

function Stills() {
  const maps = useTexture([
    "/plates/study-lens.jpg",
    "/plates/study-tungsten.jpg",
    "/plates/study-leak.jpg",
  ]);
  const mats = useRef<(MeshBasicMaterial | null)[]>([]);
  useFrame(() => {
    const want = studio.scene === "work" || studio.scene === "reel" ? 0.88 : 0;
    mats.current.forEach((m) => {
      if (m) m.opacity += (want - m.opacity) * 0.045;
    });
  });
  const places: [number, number, number][] = [
    [-2.55, 0.55, -0.35],
    [-2.1, -0.2, -0.75],
    [-1.65, 0.9, -1.15],
  ];
  return (
    <group>
      {maps.map((map, i) => (
        <mesh key={i} position={places[i]} rotation={[0, 0.2, 0]}>
          <planeGeometry args={[1.4, 0.78]} />
          <meshBasicMaterial
            ref={(el) => {
              mats.current[i] = el;
            }}
            map={map}
            transparent
            opacity={0}
            toneMapped
          />
        </mesh>
      ))}
    </group>
  );
}

function LiveEffects() {
  const bloom = useRef<{ intensity: number } | null>(null);
  const noise = useRef<{ opacity: number } | null>(null);
  useFrame(({ scene }) => {
    if (bloom.current) bloom.current.intensity = params.bloom;
    if (noise.current) noise.current.opacity = params.grain;
    scene.environmentIntensity = params.env;
  });
  return (
    <EffectComposer>
      <Bloom ref={bloom as never} intensity={params.bloom} luminanceThreshold={0.82} mipmapBlur />
      <Noise ref={noise as never} opacity={params.grain} />
    </EffectComposer>
  );
}

export function World({ orbit = false }: { orbit?: boolean }) {
  return (
    <>
      <ambientLight intensity={0.32} />
      <directionalLight color="#ffb067" intensity={2.4} position={[-3.5, 2.4, 2.2]} />
      <directionalLight color="#8ab4ff" intensity={1.6} position={[2.8, 0.8, -1.6]} />
      <pointLight color="#ffc27a" intensity={2} distance={7} position={[0.45, 0.15, 1.2]} />
      <Suspense fallback={null}>
        <Environment preset="studio" environmentIntensity={params.env} />
        <Lens />
        {!orbit && <Stills />}
      </Suspense>
      <CameraRig orbit={orbit} />
      <LiveEffects />
    </>
  );
}
