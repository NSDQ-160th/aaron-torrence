export type Quality = {
  low: boolean;
  mobile: boolean;
  dpr: [number, number] | number;
  antialias: boolean;
  bloom: boolean;
  reflector: boolean;
  sparkles: number;
  extraPlates: boolean;
};

export function detectQuality(): Quality {
  if (typeof window === "undefined") {
    return {
      low: false,
      mobile: false,
      dpr: [1, 1.5],
      antialias: true,
      bloom: true,
      reflector: true,
      sparkles: 48,
      extraPlates: true,
    };
  }
  const mobile = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 800;
  const saveData = Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
  const low = mobile || saveData || navigator.hardwareConcurrency <= 4;
  return {
    low,
    mobile,
    dpr: low ? 1 : [1, 1.5],
    antialias: !low,
    bloom: !low,
    reflector: !low,
    sparkles: low ? 0 : 48,
    extraPlates: !low,
  };
}
