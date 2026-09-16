import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial, Sparkles, useTexture } from "@react-three/drei";
import { Group } from "three";
import { params, studio } from "./studio";

export function Delorean() {
  const rig = useRef<Group>(null);
  const hero = useRef<Group>(null);
  const [street, synth, flux, interior] = useTexture([
    "/delorean/street.jpg",
    "/delorean/synthwave.jpg",
    "/delorean/flux.jpg",
    "/delorean/interior.jpg",
  ]);

  useFrame((state) => {
    const t = state.clock.elapsedTime * params.speed;
    const px = studio.pointer.x;
    const py = studio.pointer.y;
    if (rig.current) {
      rig.current.rotation.y += (px * 0.12 - rig.current.rotation.y) * 0.04;
      rig.current.rotation.x += (py * 0.05 - rig.current.rotation.x) * 0.04;
    }
    if (hero.current) {
      hero.current.position.y = 1.05 + Math.sin(t * 0.55) * 0.06;
    }
  });

  const work = studio.scene === "work" || studio.scene === "reel";

  return (
    <group ref={rig}>
      {/* deep neon city — synthwave plate */}
      <mesh position={[1.4, 2.15, -8.5]}>
        <planeGeometry args={[22, 12.4]} />
        <meshBasicMaterial map={synth} toneMapped={false} />
      </mesh>

      {/* wet street */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[40, 40]} />
        <MeshReflectorMaterial
          blur={[180, 50]}
          resolution={256}
          mixBlur={0.85}
          mixStrength={22}
          roughness={0.8}
          metalness={0.6}
          color="#09090f"
          mirror={0.4}
        />
      </mesh>

      <Sparkles count={48} scale={[16, 7, 16]} size={2.6} speed={0.35} color="#ff7ae8" opacity={0.5} />
      <Sparkles count={24} scale={[14, 5, 14]} size={1.8} speed={0.6} color="#7cf0ff" opacity={0.4} />

      {/* hero DeLorean — user's rear 3/4 still, floating as the 3D object */}
      <group ref={hero} position={[2.55, 1.2, -0.85]} rotation={[0, -0.16, 0]}>
        <mesh>
          <planeGeometry args={[7.2, 7.58]} />
          <meshBasicMaterial map={street} toneMapped={false} />
        </mesh>
        <pointLight color="#7cf0ff" intensity={2.4} distance={8} position={[-1.8, 0.1, 1.4]} />
        <pointLight color="#ff3ad1" intensity={1.8} distance={7} position={[1.6, 0.8, 1]} />
      </group>

      {/* flux / lightning still — drifts on the left */}
      <mesh
        position={[-4.2, 1.7, -2.2]}
        rotation={[0, 0.5, 0.02]}
        scale={work ? 1.08 : 0.88}
      >
        <planeGeometry args={[3.4, 2.15]} />
        <meshBasicMaterial map={flux} toneMapped={false} />
      </mesh>

      {/* interior still — about / contact */}
      <mesh
        position={[-2.4, 0.95, 0.6]}
        rotation={[0, 0.85, 0]}
        visible={studio.scene === "about" || studio.scene === "contact"}
      >
        <planeGeometry args={[2.4, 1.6]} />
        <meshBasicMaterial map={interior} toneMapped />
      </mesh>
    </group>
  );
}
