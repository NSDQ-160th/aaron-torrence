import {
  BufferGeometry,
  CylinderGeometry,
  Float32BufferAttribute,
  Group,
  Mesh,
  Object3D,
  PlaneGeometry,
  Points,
  PointsMaterial,
  SphereGeometry,
  TorusGeometry,
  Vector3,
} from "three";
import { brass, darkMetal, glassPhysical, steel, streakMaterial } from "./materials";

export type Frag = {
  mesh: Object3D;
  rest: Vector3;
  weight: number;
};

export type LensRig = {
  group: Group;
  glass: ReturnType<typeof glassPhysical>;
  streak: ReturnType<typeof streakMaterial>;
  dust: Points;
  frags: Frag[];
};

function tube(r: number, depth: number, radial = 64) {
  return new CylinderGeometry(r, r, depth, radial, 1, true);
}

function ring(r: number, tubeR: number, arc = Math.PI * 2) {
  return new TorusGeometry(r, tubeR, 10, 72, arc);
}

export function createLens(): LensRig {
  const group = new Group();
  const frags: Frag[] = [];
  const glass = glassPhysical();
  const streak = streakMaterial();

  const add = (mesh: Mesh, x: number, y: number, z: number, weight: number) => {
    mesh.position.set(x, y, z);
    mesh.rotation.z = Math.PI / 2;
    group.add(mesh);
    frags.push({
      mesh,
      rest: new Vector3(x, y, z),
      weight,
    });
  };

  const mount = new Mesh(tube(0.58, 0.16), brass());
  add(mount, -0.92, 0.04, 0, 0.35);

  const lip = new Mesh(ring(0.58, 0.03), brass());
  add(lip, -0.82, 0.02, 0.02, 0.45);

  const body = new Mesh(tube(0.5, 0.22), brass());
  add(body, -0.48, 0, 0, 0.4);

  const knurl = new Mesh(tube(0.52, 0.07, 48), brass());
  add(knurl, -0.32, 0.01, -0.01, 0.55);

  const steelRing = new Mesh(tube(0.44, 0.1), steel());
  add(steelRing, -0.08, -0.02, 0.01, 0.5);

  const inner = new Mesh(tube(0.38, 0.08), darkMetal());
  add(inner, 0.12, 0, 0, 0.42);

  const element = new Mesh(new SphereGeometry(0.36, 64, 48), glass);
  element.scale.set(0.38, 1, 1);
  element.position.set(0.34, 0, 0);
  group.add(element);
  frags.push({ mesh: element, rest: new Vector3(0.34, 0, 0), weight: 0.25 });

  const front = new Mesh(tube(0.4, 0.055), darkMetal());
  add(front, 0.52, 0.01, 0, 0.38);

  const hood = new Mesh(new CylinderGeometry(0.48, 0.4, 0.1, 48, 1, true), darkMetal());
  add(hood, 0.62, 0, 0, 0.3);

  const arcA = new Mesh(ring(0.62, 0.018, Math.PI * 0.72), steel());
  arcA.position.set(-0.7, 0.22, 0.18);
  arcA.rotation.set(0.4, 0.2, 1.2);
  group.add(arcA);
  frags.push({ mesh: arcA, rest: new Vector3(-0.7, 0.22, 0.18), weight: 1 });

  const arcB = new Mesh(ring(0.5, 0.016, Math.PI * 0.55), brass());
  arcB.position.set(-0.2, -0.28, 0.16);
  arcB.rotation.set(-0.5, 0.3, 0.8);
  group.add(arcB);
  frags.push({ mesh: arcB, rest: new Vector3(-0.2, -0.28, 0.16), weight: 0.9 });

  const streakMesh = new Mesh(new PlaneGeometry(3.6, 0.08), streak);
  streakMesh.position.set(0.7, 0.02, 0.05);
  group.add(streakMesh);

  const count = 220;
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 0.9 + Math.random() * 2.2;
    const t = Math.random() * Math.PI * 2;
    const y = (Math.random() - 0.5) * 1.8;
    pos[i * 3] = Math.cos(t) * r * 0.7;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = Math.sin(t) * r;
  }
  const dustGeo = new BufferGeometry();
  dustGeo.setAttribute("position", new Float32BufferAttribute(pos, 3));
  const dust = new Points(
    dustGeo,
    new PointsMaterial({
      color: "#e8d7b0",
      size: 0.016,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    })
  );
  group.add(dust);

  group.rotation.set(0.18, 0.55, 0.08);
  return { group, glass, streak, dust, frags };
}
