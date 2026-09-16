import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { AdditiveBlending, Color, DoubleSide, Group, Points } from "three";
import { params, studio } from "./studio";

type Frag = { rest: [number, number, number]; weight: number };

function Tube({
  r,
  r2,
  depth,
  radial,
  position,
  weight,
  color,
  roughness,
}: {
  r: number;
  r2?: number;
  depth: number;
  radial?: number;
  position: [number, number, number];
  weight: number;
  color: string;
  roughness: number;
}) {
  return (
    <group
      rotation={[0, 0, Math.PI / 2]}
      position={position}
      userData={{ frag: { rest: position, weight } satisfies Frag }}
    >
      <mesh>
        <cylinderGeometry args={[r, r2 ?? r, depth, radial ?? 64, 1, true]} />
        <meshStandardMaterial color={color} metalness={params.metalness} roughness={roughness} />
      </mesh>
    </group>
  );
}

export function Lens() {
  const group = useRef<Group>(null);
  const dust = useRef<Points>(null);

  const dustPos = useMemo(() => {
    const n = 180;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 0.9 + Math.random() * 2.1;
      const t = Math.random() * Math.PI * 2;
      arr[i * 3] = Math.cos(t) * r * 0.7;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 1.8;
      arr[i * 3 + 2] = Math.sin(t) * r;
    }
    return arr;
  }, []);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime * params.speed;
    const px = studio.pointer.x;
    const py = studio.pointer.y;
    g.rotation.y += (0.55 + px * 0.28 - g.rotation.y) * 0.045;
    g.rotation.x += (0.16 + py * 0.1 - g.rotation.x) * 0.045;
    if (dust.current) dust.current.rotation.y = t * 0.04;
    g.traverse((obj) => {
      const mesh = obj as { isMesh?: boolean; material?: { metalness?: number; roughness?: number; transmission?: number } };
      if (mesh.isMesh && mesh.material) {
        if (typeof mesh.material.metalness === "number") mesh.material.metalness = params.metalness;
        if (typeof mesh.material.roughness === "number" && mesh.material.transmission === undefined) {
          /* brass roughness from pane; skip glass */
        }
        if (typeof mesh.material.transmission === "number") mesh.material.transmission = params.transmission;
      }
    });
    g.children.forEach((child) => {
      const f = child.userData.frag as Frag | undefined;
      if (!f) return;
      child.position.x += (f.rest[0] + px * 0.28 * f.weight - child.position.x) * 0.07;
      child.position.y += (f.rest[1] - py * 0.18 * f.weight - child.position.y) * 0.07;
    });
  });

  return (
    <group ref={group} position={[1.05, 0.12, 0]} scale={0.92} rotation={[0.18, 0.55, 0.08]}>
      <Tube r={0.58} depth={0.16} position={[-0.92, 0.04, 0]} weight={0.35} color="#c4a36a" roughness={params.roughness} />
      <group
        rotation={[0, 0, Math.PI / 2]}
        position={[-0.82, 0.02, 0.02]}
        userData={{ frag: { rest: [-0.82, 0.02, 0.02], weight: 0.45 } satisfies Frag }}
      >
        <mesh>
          <torusGeometry args={[0.58, 0.03, 10, 72]} />
          <meshStandardMaterial color="#c4a36a" metalness={params.metalness} roughness={params.roughness} />
        </mesh>
      </group>
      <Tube r={0.5} depth={0.22} position={[-0.48, 0, 0]} weight={0.4} color="#c4a36a" roughness={params.roughness} />
      <Tube r={0.52} depth={0.07} radial={48} position={[-0.32, 0.01, -0.01]} weight={0.55} color="#c4a36a" roughness={params.roughness} />
      <Tube r={0.44} depth={0.1} position={[-0.08, -0.02, 0.01]} weight={0.5} color="#8d939c" roughness={0.22} />
      <Tube r={0.38} depth={0.08} position={[0.12, 0, 0]} weight={0.42} color="#1a1d22" roughness={0.38} />
      <mesh
        position={[0.34, 0, 0]}
        scale={[0.38, 1, 1]}
        userData={{ frag: { rest: [0.34, 0, 0], weight: 0.25 } satisfies Frag }}
      >
        <sphereGeometry args={[0.36, 64, 48]} />
        <MeshTransmissionMaterial
          samples={6}
          thickness={0.55}
          chromaticAberration={0.035}
          anisotropy={0.15}
          roughness={0.06}
          ior={1.5}
          color="#9ec4ff"
          transmission={params.transmission}
        />
      </mesh>
      <Tube r={0.4} depth={0.055} position={[0.52, 0.01, 0]} weight={0.38} color="#1a1d22" roughness={0.38} />
      <Tube r={0.48} r2={0.4} depth={0.1} radial={48} position={[0.62, 0, 0]} weight={0.3} color="#1a1d22" roughness={0.38} />
      <mesh
        position={[-0.7, 0.22, 0.18]}
        rotation={[0.4, 0.2, 1.2]}
        userData={{ frag: { rest: [-0.7, 0.22, 0.18], weight: 1 } satisfies Frag }}
      >
        <torusGeometry args={[0.62, 0.018, 10, 72, Math.PI * 0.72]} />
        <meshStandardMaterial color="#8d939c" metalness={params.metalness} roughness={0.22} />
      </mesh>
      <mesh
        position={[-0.2, -0.28, 0.16]}
        rotation={[-0.5, 0.3, 0.8]}
        userData={{ frag: { rest: [-0.2, -0.28, 0.16], weight: 0.9 } satisfies Frag }}
      >
        <torusGeometry args={[0.5, 0.016, 10, 72, Math.PI * 0.55]} />
        <meshStandardMaterial color="#c4a36a" metalness={params.metalness} roughness={params.roughness} />
      </mesh>
      <mesh position={[0.7, 0.02, 0.05]}>
        <planeGeometry args={[3.6, 0.08]} />
        <meshBasicMaterial
          color={new Color("#ffb067")}
          transparent
          opacity={0.35}
          blending={AdditiveBlending}
          side={DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <points ref={dust}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dustPos, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#e8d7b0" size={0.016} transparent opacity={0.45} depthWrite={false} />
      </points>
    </group>
  );
}
