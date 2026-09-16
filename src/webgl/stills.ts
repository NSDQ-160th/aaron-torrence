import {
  Group,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  SRGBColorSpace,
  TextureLoader,
  Vector3,
} from "three";

const SRC = [
  "/plates/study-lens.jpg",
  "/plates/study-tungsten.jpg",
  "/plates/study-leak.jpg",
];

export type StillRig = {
  group: Group;
  target: number;
};

export function createStills(): StillRig {
  const group = new Group();
  const loader = new TextureLoader();
  const rests = [
    new Vector3(-2.55, 0.55, -0.35),
    new Vector3(-2.1, -0.2, -0.75),
    new Vector3(-1.65, 0.9, -1.15),
  ];

  SRC.forEach((url, i) => {
    const tex = loader.load(url);
    tex.colorSpace = SRGBColorSpace;
    const mat = new MeshBasicMaterial({
      map: tex,
      transparent: true,
      opacity: 0,
      toneMapped: true,
    });
    const mesh = new Mesh(new PlaneGeometry(1.4, 0.78), mat);
    mesh.position.copy(rests[i]);
    mesh.rotation.y = 0.2;
    mesh.userData.mat = mat;
    group.add(mesh);
  });

  return { group, target: 0 };
}

export function tickStills(rig: StillRig) {
  for (const child of rig.group.children) {
    const mat = child.userData.mat as MeshBasicMaterial | undefined;
    if (!mat) continue;
    mat.opacity += (rig.target - mat.opacity) * 0.045;
  }
}
