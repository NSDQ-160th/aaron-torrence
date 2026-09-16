import {
  AdditiveBlending,
  Color,
  DoubleSide,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  ShaderMaterial,
} from "three";

export const brass = () =>
  new MeshStandardMaterial({
    color: new Color("#c4a36a"),
    metalness: 1,
    roughness: 0.28,
    envMapIntensity: 1.1,
  });

export const steel = () =>
  new MeshStandardMaterial({
    color: new Color("#8d939c"),
    metalness: 1,
    roughness: 0.22,
    envMapIntensity: 1.15,
  });

export const darkMetal = () =>
  new MeshStandardMaterial({
    color: new Color("#1a1d22"),
    metalness: 0.95,
    roughness: 0.38,
    envMapIntensity: 0.7,
  });

export const glassPhysical = () =>
  new MeshPhysicalMaterial({
    color: new Color("#9ec4ff"),
    metalness: 0,
    roughness: 0.06,
    transmission: 1,
    thickness: 0.55,
    ior: 1.62,
    iridescence: 0.85,
    iridescenceIOR: 1.3,
    iridescenceThicknessRange: [120, 420],
    transparent: true,
    opacity: 1,
    envMapIntensity: 1.4,
    attenuationColor: new Color("#1a2840"),
    attenuationDistance: 0.8,
  });

export const streakMaterial = () =>
  new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    side: DoubleSide,
    uniforms: {
      uTime: { value: 0 },
      uHeat: { value: new Color("#ffb067") },
      uCool: { value: new Color("#8ab4ff") },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform vec3 uHeat;
      uniform vec3 uCool;
      varying vec2 vUv;
      void main() {
        float line = 1.0 - smoothstep(0.0, 0.018, abs(vUv.y - 0.5));
        float pulse = 0.75 + 0.25 * sin(uTime * 0.7);
        float fade = smoothstep(0.0, 0.12, vUv.x) * (1.0 - smoothstep(0.82, 1.0, vUv.x));
        vec3 col = mix(uHeat, uCool, vUv.x);
        gl_FragColor = vec4(col, line * fade * 0.55 * pulse);
      }
    `,
  });

export const grainShader = {
  uniforms: {
    tDiffuse: { value: null },
    uAmount: { value: 0.022 },
    uTime: { value: 0 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uAmount;
    uniform float uTime;
    varying vec2 vUv;
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }
    void main() {
      vec4 c = texture2D(tDiffuse, vUv);
      float n = hash(vUv * vec2(1600.0, 900.0) + floor(uTime * 24.0)) - 0.5;
      gl_FragColor = vec4(c.rgb + n * uAmount, c.a);
    }
  `,
};
