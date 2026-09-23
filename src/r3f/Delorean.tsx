import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial, Sparkles, useTexture } from "@react-three/drei";
import { Group, ShaderMaterial, Texture } from "three";
import { params, studio } from "./studio";
import type { Quality } from "./quality";

function SoftPlate({
  map,
  width,
  height,
  fadeY = 0.82,
}: {
  map: Texture;
  width: number;
  height: number;
  fadeY?: number;
}) {
  const material = useMemo(() => {
    const mat = new ShaderMaterial({
      transparent: true,
      depthWrite: false,
      toneMapped: false,
      uniforms: { uMap: { value: map }, uFadeY: { value: fadeY } },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform sampler2D uMap;
        uniform float uFadeY;
        varying vec2 vUv;
        void main() {
          vec4 c = texture2D(uMap, vUv);
          float x = smoothstep(0.0, 0.06, vUv.x) * (1.0 - smoothstep(0.94, 1.0, vUv.x));
          float y = smoothstep(0.0, 0.04, vUv.y) * (1.0 - smoothstep(uFadeY, 1.0, vUv.y));
          gl_FragColor = vec4(c.rgb, x * y);
        }
      `,
    });
    return mat;
  }, [map, fadeY]);

  return (
    <mesh>
      <planeGeometry args={[width, height]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

function ExtraPlates() {
  const [flux, interior] = useTexture(["/delorean/flux.webp", "/delorean/interior.webp"]);
  const work = studio.scene === "work" || studio.scene === "reel";
  return (
    <>
      <mesh position={[-4.4, 1.7, -2.4]} rotation={[0, 0.5, 0.02]} scale={work ? 1.08 : 0.86}>
        <planeGeometry args={[3.4, 2.15]} />
        <meshBasicMaterial map={flux} toneMapped={false} transparent opacity={0.78} />
      </mesh>
      <mesh
        position={[-2.4, 0.95, 0.6]}
        rotation={[0, 0.85, 0]}
        visible={studio.scene === "about" || studio.scene === "contact"}
      >
        <planeGeometry args={[2.4, 1.6]} />
        <meshBasicMaterial map={interior} toneMapped transparent opacity={0.9} />
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
      rig.current.rotation.y += (px * 0.1 - rig.current.rotation.y) * 0.03;
      rig.current.rotation.x += (py * 0.04 - rig.current.rotation.x) * 0.03;
    }
    if (hero.current) {
      const home = studio.scene === "hero";
      const target = home ? 1 : 0.82;
      const s = hero.current.scale.x + (target - hero.current.scale.x) * 0.04;
      hero.current.scale.setScalar(s);
      hero.current.position.y = 1.35 + Math.sin(t * 0.45) * (home ? 0.05 : 0.02);
    }
  });

  return (
    <group ref={rig}>
      <mesh position={[1.6, 2.4, -9.2]}>
        <planeGeometry args={[24, 13.5]} />
        <meshBasicMaterial map={synth} toneMapped={false} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 40]} />
        {quality.reflector ? (
          <MeshReflectorMaterial
            blur={[220, 70]}
            resolution={256}
            mixBlur={0.9}
            mixStrength={22}
            roughness={0.82}
            metalness={0.62}
            color="#08080e"
            mirror={0.42}
          />
        ) : (
          <meshStandardMaterial color="#08080e" roughness={0.9} metalness={0.2} />
        )}
      </mesh>

      {quality.sparkles > 0 && (
        <>
          <Sparkles count={quality.sparkles} scale={[16, 7, 16]} size={2.2} speed={0.28} color="#ff7ae8" opacity={0.4} />
          <Sparkles count={Math.floor(quality.sparkles / 2)} scale={[14, 5, 14]} size={1.5} speed={0.5} color="#7cf0ff" opacity={0.32} />
        </>
      )}

      <group ref={hero} position={[2.35, 1.35, -1.05]} rotation={[0, -0.12, 0]}>
        <SoftPlate map={street} width={8.6} height={9.06} fadeY={0.84} />
        <pointLight color="#7cf0ff" intensity={2.6} distance={9} position={[-1.8, 0.1, 1.4]} />
        <pointLight color="#ff3ad1" intensity={1.9} distance={8} position={[1.8, 0.9, 1]} />
      </group>

      {quality.extraPlates && <ExtraPlates />}
    </group>
  );
}
