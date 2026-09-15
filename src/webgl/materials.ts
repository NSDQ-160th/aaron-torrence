import {
  Color,
  ShaderMaterial,
  Vector2,
} from "three";

export const glassMaterial = () =>
  new ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uHeat: { value: new Color("#ffb067") },
      uCool: { value: new Color("#8ab4ff") },
      uVoid: { value: new Color("#07080c") },
      uPointer: { value: new Vector2(0, 0) },
    },
    transparent: true,
    depthWrite: false,
    vertexShader: /* glsl */ `
      varying vec3 vN;
      varying vec3 vV;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec4 w = modelMatrix * vec4(position, 1.0);
        vN = normalize(mat3(modelMatrix) * normal);
        vV = normalize(cameraPosition - w.xyz);
        gl_Position = projectionMatrix * viewMatrix * w;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform vec3 uHeat;
      uniform vec3 uCool;
      uniform vec3 uVoid;
      uniform vec2 uPointer;
      varying vec3 vN;
      varying vec3 vV;
      varying vec2 vUv;
      void main() {
        float fres = pow(1.0 - max(dot(normalize(vN), normalize(vV)), 0.0), 2.4);
        float iris = smoothstep(0.22, 0.08, length(vUv - 0.5));
        vec3 rim = mix(uHeat, uCool, 0.5 + 0.5 * sin(uTime * 0.25 + uPointer.x));
        vec3 col = mix(uVoid, rim, fres);
        col = mix(col, uHeat * 0.45, iris * 0.35);
        float alpha = mix(0.22, 0.92, fres) + iris * 0.15;
        gl_FragColor = vec4(col, alpha);
      }
    `,
  });

export const grainShader = {
  uniforms: {
    tDiffuse: { value: null },
    uAmount: { value: 0.035 },
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
      float n = hash(vUv * vec2(1920.0, 1080.0) + uTime * 60.0) - 0.5;
      gl_FragColor = vec4(c.rgb + n * uAmount, c.a);
    }
  `,
};
