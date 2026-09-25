import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Color, ShaderMaterial, Vector2 } from "three";
import { params, studio } from "./studio";
import type { Quality } from "./quality";

const vert = /* glsl */ `
  varying vec2 vXZ;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vXZ = world.xz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const frag = /* glsl */ `
  uniform float uTime;
  uniform float uContour;
  uniform float uFog;
  uniform float uRelief;
  uniform vec2 uPan;
  uniform vec3 uFogColor;
  varying vec2 vXZ;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 m = mat2(0.80, -0.60, 0.60, 0.80);
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = m * p * 2.05;
      a *= 0.5;
    }
    return v;
  }

  float heightAt(vec2 p) {
    vec2 q = vec2(fbm(p), fbm(p + vec2(19.2, 7.4)));
    float ridges = 1.0 - abs(fbm(p * 0.85 + q * 0.55) * 2.0 - 1.0);
    float mounds = fbm(p * 0.55 + 11.0);
    return mix(mounds, ridges, 0.42);
  }

  void main() {
    vec2 p = vXZ * 0.042 + uPan + vec2(uTime * 0.035, uTime * 0.022);
    float h = mix(0.5, heightAt(p), uRelief);
    float bands = uContour;
    float v = h * bands;
    float fw = fwidth(v);
    float major = 1.0 - smoothstep(0.0, max(fw * 1.15, 0.03), abs(fract(v - 0.5) - 0.5));
    float minor = 1.0 - smoothstep(0.0, max(fw * 1.05, 0.04), abs(fract(v * 2.0 - 0.5) - 0.5));

    vec3 valley = vec3(0.078, 0.078, 0.076);
    vec3 rise = vec3(0.086, 0.085, 0.082);
    vec3 line = vec3(0.19, 0.185, 0.17);
    vec3 col = mix(valley, rise, smoothstep(0.25, 0.75, h));
    col = mix(col, line, clamp(major * 0.55 + minor * 0.14, 0.0, 1.0));

    float dist = length(vXZ);
    float fog = 1.0 - exp(-uFog * dist);
    col = mix(col, uFogColor, clamp(fog, 0.0, 1.0));
    gl_FragColor = vec4(col, 1.0);
  }
`;

export function Landscape({ quality: _quality }: { quality: Quality }) {
  const material = useMemo(() => {
    return new ShaderMaterial({
      toneMapped: false,
      uniforms: {
        uTime: { value: 0 },
        uContour: { value: params.contour },
        uFog: { value: params.fog },
        uRelief: { value: params.relief },
        uPan: { value: new Vector2(0, 0) },
        uFogColor: { value: new Color("#181818") },
      },
      vertexShader: vert,
      fragmentShader: frag,
    });
  }, []);

  const pan = useRef(new Vector2());

  useEffect(() => () => material.dispose(), [material]);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime * params.speed;
    material.uniforms.uContour.value = params.contour;
    material.uniforms.uFog.value = params.fog;
    material.uniforms.uRelief.value = params.relief;
    pan.current.x += (studio.pointer.x * 0.55 - pan.current.x) * 0.02;
    pan.current.y += (studio.pointer.y * 0.4 - pan.current.y) * 0.02;
    material.uniforms.uPan.value.copy(pan.current);
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} frustumCulled={false}>
      <planeGeometry args={[220, 220]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}
