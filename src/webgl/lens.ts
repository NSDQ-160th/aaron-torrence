import {
  Color,
  CylinderGeometry,
  DoubleSide,
  Group,
  LatheGeometry,
  Mesh,
  MeshStandardMaterial,
  Points,
  BufferGeometry,
  Float32BufferAttribute,
  PointsMaterial,
  SphereGeometry,
  Vector2,
} from "three";
import { glassMaterial } from "./materials";

const metal = (color: string, roughness: number, metalness = 0.92) =>
  new MeshStandardMaterial({
    color: new Color(color),
    roughness,
    metalness,
    side: DoubleSide,
  });

export type LensRig = {
  group: Group;
  glass: ReturnType<typeof glassMaterial>;
  dust: Points;
};

export function createLens(): LensRig {
  const group = new Group();

  const profile = [
    new Vector2(0.22, -1.15),
    new Vector2(0.34, -1.05),
    new Vector2(0.38, -0.7),
    new Vector2(0.42, -0.35),
    new Vector2(0.48, -0.05),
    new Vector2(0.52, 0.28),
    new Vector2(0.46, 0.55),
    new Vector2(0.4, 0.72),
    new Vector2(0.36, 0.88),
    new Vector2(0.3, 0.98),
  ];
  const barrel = new Mesh(new LatheGeometry(profile, 72), metal("#1b1d22", 0.38));
  barrel.castShadow = false;
  group.add(barrel);

  const ringGeo = new CylinderGeometry(0.53, 0.53, 0.045, 72, 1, true);
  const ringA = new Mesh(ringGeo, metal("#c9a56a", 0.32));
  ringA.position.y = 0.12;
  const ringB = ringA.clone();
  ringB.position.y = 0.42;
  ringB.material = metal("#8a8f98", 0.28);
  group.add(ringA, ringB);

  const hood = new Mesh(
    new CylinderGeometry(0.62, 0.4, 0.22, 48, 1, true),
    metal("#12141a", 0.5, 0.8)
  );
  hood.position.y = 1.05;
  group.add(hood);

  const glass = glassMaterial();
  const element = new Mesh(new SphereGeometry(0.33, 64, 48), glass);
  element.scale.set(1, 0.28, 1);
  element.position.y = 0.92;
  group.add(element);

  const rear = new Mesh(new SphereGeometry(0.2, 32, 24), glass);
  rear.scale.set(1, 0.22, 1);
  rear.position.y = -1.08;
  group.add(rear);

  const count = 280;
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 1.2 + Math.random() * 2.4;
    const t = Math.random() * Math.PI * 2;
    const y = (Math.random() - 0.5) * 3.2;
    pos[i * 3] = Math.cos(t) * r;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = Math.sin(t) * r;
  }
  const dustGeo = new BufferGeometry();
  dustGeo.setAttribute("position", new Float32BufferAttribute(pos, 3));
  const dust = new Points(
    dustGeo,
    new PointsMaterial({
      color: "#e8d7b0",
      size: 0.012,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    })
  );
  group.add(dust);

  group.rotation.x = 0.35;
  group.rotation.z = -0.18;
  return { group, glass, dust };
}
