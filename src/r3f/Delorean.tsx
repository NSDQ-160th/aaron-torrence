import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial, Sparkles, useTexture } from "@react-three/drei";
import { Group } from "three";
import { params, studio } from "./studio";
import type { Quality } from "./quality";

function ExtraPlates() {
  const [flux, interior] = useTexture(["/delorean/flux.webp", "/delorean/interior.webp"]);
  const work = studio.scene === "work" || studio.scene === "reel";
  return (
    <>
      <mesh position={[-4.2, 1.7, -2.2]} rotation={[0, 0.5, 0.02]} scale={work ? 1.08 : 0.88}>
        <planeGeometry args={[3.4, 2.15]} />
        <meshBasicMaterial map={flux} toneMapped={false} />
      </mesh>
      <mesh
        position={[-2.4, 0.95, 0.6]}
        rotation={[0, 0.85, 0]}
        visible={studio.scene === "about" || studio.scene === "contact"}
      >
        <planeGeometry args={[2.4, 1.6]} />
        <meshBasicMaterial map={interior} toneMapped />
      </mesh>
    </>
  );
}

export function Delorean({ quality }: { quality: Quality }) {
  const rig = useRef<Group>(null);
  const hero = useRef<Group>(null);
  const [street, synth] = useTexture(["/delorean/street.webp", "/delorean/synthwave.webp"]);

  useFrame((state) => {
    const t = state.clock.elapsedTime * params.speed;
    const px = studio.pointer.x;
    const py = studio.pointer.y;
    if (rig.current) {
      rig.current.rotation.y += (px * 0.12 - rig.current.rotation.y) * 0.04;
      rig.current.rotation.x += (py * 0.05 - rig.current.rotation.x) * 0.04;
    }
    if (hero.current) {
      hero.current.position.y = 1.2 + Math.sin(t * 0.55) * 0.06;
    }
  });

  return (
    <group ref={rig}>
      <mesh position={[1.4, 2.15, -8.5]}>
        <planeGeometry args={[22, 12.4]} />
        <meshBasicMaterial map={synth} toneMapped={false} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 40]} />
        {quality.reflector ? (
          <MeshReflectorMaterial
            blur={[180, 50]}
            resolution={256}
            mixBlur={0.85}
            mixStrength={18}
            roughness={0.8}
            metalness={0.6}
            color="#09090f"
            mirror={0.4}
          />
        ) : (
          <meshStandardMaterial color="#09090f" roughness={0.9} metalness={0.2} />
        )}
      </mesh>

      {quality.sparkles > 0 && (
        <>
          <Sparkles count={quality.sparkles} scale={[16, 7, 16]} size={2.6} speed={0.35} color="#ff7ae8" opacity={0.5} />
          <Sparkles count={Math.floor(quality.sparkles / 2)} scale={[14, 5, 14]} size={1.8} speed={0.6} color="#7cf0ff" opacity={0.4} />
        </>
      )}

      <group ref={hero} position={[2.55, 1.2, -0.85]} rotation={[0, -0.16, 0]}>
        <mesh>
          <planeGeometry args={[7.2, 7.58]} />
          <meshBasicMaterial map={street} toneMapped={false} />
        </mesh>
        <pointLight color="#7cf0ff" intensity={2.4} distance={8} position={[-1.8, 0.1, 1.4]} />
        <pointLight color="#ff3ad1" intensity={1.8} distance={7} position={[1.6, 0.8, 1]} />
      </group>

      {quality.extraPlates && <ExtraPlates />}
    </group>
  );
}
