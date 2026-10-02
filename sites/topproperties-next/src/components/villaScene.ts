import * as THREE from "three";

export type VillaView = "terrace" | "garden" | "aerial";
export interface VillaScene {
  setView: (view: VillaView) => void;
  setHour: (hour: number) => void;
  setPlaying: (playing: boolean) => void;
  dispose: () => void;
}

/** An illustrative architectural maquette, not a reconstruction of a listing. */
export function createVillaScene(host: HTMLElement, onFailure: () => void): VillaScene {
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const canvas = renderer.domElement;
  canvas.setAttribute("role", "img");
  canvas.setAttribute(
    "aria-label",
    "Illustrative Mediterranean villa with terraces, a pool and gardens",
  );
  host.appendChild(canvas);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#e7e6e1");
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 120);
  const model = new THREE.Group();
  scene.add(model);
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const material = (color: string, roughness = 0.8) => {
    const value = new THREE.MeshStandardMaterial({ color, roughness });
    materials.add(value);
    return value;
  };
  const stone = material("#e6ded0");
  const plaster = material("#fff5e3");
  const timber = material("#98745a");
  const windowFrame = material("#363e3d", 0.4);
  const foliage = material("#6b7d55");
  const lawn = material("#8b9573");
  const fabric = material("#f1e8d7");
  const water = new THREE.MeshStandardMaterial({
    color: "#298f9c",
    roughness: 0.23,
    metalness: 0.35,
  });
  materials.add(water);
  const glass = new THREE.MeshStandardMaterial({
    color: "#769c9f",
    metalness: 0.3,
    roughness: 0.15,
    transparent: true,
    opacity: 0.65,
  });
  materials.add(glass);

  function box(
    w: number,
    h: number,
    d: number,
    x: number,
    y: number,
    z: number,
    mat: THREE.Material,
  ) {
    const geometry = new THREE.BoxGeometry(w, h, d);
    geometries.add(geometry);
    const mesh = new THREE.Mesh(geometry, mat);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    model.add(mesh);
    return mesh;
  }
  // Plinth, garden and limestone terraces.
  box(14, 0.55, 11, 0, -0.35, 0, stone);
  box(13.7, 0.08, 10.7, 0, -0.03, 0, lawn);
  box(11.8, 0.14, 8.5, 0, 0.08, -0.1, stone);
  // A glazed ground floor beneath a deep, sun-shading roof.
  box(9.2, 0.2, 4.1, 0, 0.25, -1.75, plaster);
  box(9.2, 0.24, 4.3, 0, 3.05, -1.75, plaster);
  box(9.2, 2.6, 0.18, 0, 1.65, -3.65, plaster);
  box(0.18, 2.6, 3.9, -4.5, 1.65, -1.75, plaster);
  box(0.18, 2.6, 3.9, 4.5, 1.65, -1.75, plaster);
  box(8.9, 2.4, 0.06, 0, 1.65, 0.12, glass);
  for (let x = -4.4; x <= 4.4; x += 1.1) box(0.055, 2.45, 0.09, x, 1.65, 0.17, windowFrame);
  box(8.9, 0.055, 0.09, 0, 1.65, 0.17, windowFrame);
  // Interior partitions and a sitting room visible through the glazing.
  box(0.15, 2.55, 3.6, 0.7, 1.65, -1.75, plaster);
  box(2.5, 0.45, 0.9, -2, 0.65, -1.3, fabric);
  box(2.5, 0.6, 0.18, -2, 1.05, -1.65, fabric);
  box(1.5, 0.13, 0.8, -2, 0.55, -0.1, timber);
  // Upper suite, framed balcony and rooftop terrace.
  box(4.3, 0.2, 3.7, 1.8, 3.27, -2.05, stone);
  box(4.3, 1.9, 0.18, 1.8, 4.3, -3.8, plaster);
  box(0.18, 1.9, 3.5, 3.86, 4.3, -2.05, plaster);
  box(0.18, 1.9, 3.5, -0.26, 4.3, -2.05, plaster);
  box(4.3, 0.22, 3.85, 1.8, 5.35, -2.05, plaster);
  box(4, 1.85, 0.06, 1.8, 4.3, -0.34, glass);
  for (let x = -0.2; x < 3.9; x += 1) box(0.055, 1.9, 0.09, x, 4.3, -0.28, windowFrame);
  box(4.5, 0.06, 0.08, 1.8, 4.2, 0.42, windowFrame);
  for (const x of [-0.4, 1.8, 4]) box(0.04, 0.85, 0.04, x, 3.78, 0.42, windowFrame);
  box(4.3, 0.78, 0.025, 1.8, 3.78, 0.4, glass);
  // Timber pergola: visible changing shadows make daylight meaningful.
  for (const x of [-4.55, -0.75]) box(0.12, 2.65, 0.12, x, 1.48, 1.8, timber);
  for (let x = -4.6; x <= -0.7; x += 0.32) box(0.12, 0.12, 2, x, 2.8, 1.15, timber);
  box(4, 0.15, 0.15, -2.65, 2.74, 1.85, timber);
  box(2.6, 0.38, 0.85, -2.6, 0.48, 1.2, fabric);
  box(2.6, 0.5, 0.15, -2.6, 0.82, 0.83, fabric);
  box(1.35, 0.12, 0.65, -2.6, 0.48, 2.35, timber);
  // Pool and its pale coping; a still water surface keeps this a quiet study.
  box(7.3, 0.12, 2.9, 1.2, 0.2, 3.08, plaster);
  box(6.9, 0.13, 2.5, 1.2, 0.27, 3.08, water);
  for (const x of [-0.1, 1.4, 2.9]) {
    box(0.72, 0.18, 1.55, x, 0.33, 1.1, timber);
    box(0.62, 0.11, 1.4, x, 0.48, 1.1, fabric);
  }
  // Entry steps and Mediterranean planting.
  for (let i = 0; i < 4; i++) box(2, 0.1, 0.32, -5.05, -0.05 + i * 0.055, 2.55 - i * 0.32, stone);
  for (const [x, z, scale] of [
    [-5.6, -3.7, 1],
    [5.75, -3.4, 1.15],
    [5.8, 1, 0.8],
    [-5.8, 3.7, 0.7],
  ]) {
    const trunkGeometry = new THREE.CylinderGeometry(0.07, 0.12, 1.5 * scale, 7);
    geometries.add(trunkGeometry);
    const trunk = new THREE.Mesh(trunkGeometry, timber);
    trunk.position.set(x, 0.7 * scale, z);
    trunk.castShadow = true;
    model.add(trunk);
    const crownGeometry = new THREE.IcosahedronGeometry(0.85 * scale, 1);
    geometries.add(crownGeometry);
    const crown = new THREE.Mesh(crownGeometry, foliage);
    crown.scale.set(1, 0.8, 1);
    crown.position.set(x, 1.8 * scale, z);
    crown.castShadow = true;
    model.add(crown);
  }
  const groundGeometry = new THREE.PlaneGeometry(200, 200);
  geometries.add(groundGeometry);
  const ground = new THREE.Mesh(groundGeometry, material("#e7e6e1"));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.64;
  ground.receiveShadow = true;
  scene.add(ground);

  const sky = new THREE.HemisphereLight("#e6f2ff", "#ab8b6b", 2.5);
  const sun = new THREE.DirectionalLight("#fff0d6", 3);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -12;
  sun.shadow.camera.right = 12;
  sun.shadow.camera.top = 12;
  sun.shadow.camera.bottom = -12;
  sun.shadow.normalBias = 0.04;
  scene.add(sky, sun);

  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  let reduced = media.matches;
  let playing = !reduced;
  let visible = true;
  let disposed = false;
  let frame = 0;
  let lastTime = 0;
  let orbitTime = 0;
  let hour = 15;
  let currentHour = hour;
  let view: VillaView = "terrace";
  const position = new THREE.Vector3(17, 12, 20);
  const targetPosition = new THREE.Vector3();
  const lookAt = new THREE.Vector3(0, 1.6, 0);
  const presets: Record<VillaView, [number, number, number]> = {
    terrace: [17, 12, 20],
    garden: [-19, 11, 18],
    aerial: [12, 24, 14],
  };
  function schedule() {
    if (!disposed && visible && !document.hidden && !frame) frame = requestAnimationFrame(render);
  }
  function render(time: number) {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
    lastTime = time;
    if (playing && !reduced) orbitTime += delta;
    const [x, y, z] = presets[view];
    const angle = reduced ? 0 : Math.sin(orbitTime * 0.15) * 0.16;
    const fit = Math.max(1, 1.1 / camera.aspect);
    targetPosition.set(
      (x * Math.cos(angle) - z * Math.sin(angle)) * fit,
      y * fit,
      (z * Math.cos(angle) + x * Math.sin(angle)) * fit,
    );
    const blend = reduced ? 1 : 1 - Math.exp(-delta * 6);
    position.lerp(targetPosition, blend);
    currentHour += (hour - currentHour) * blend;
    camera.position.copy(position);
    camera.lookAt(lookAt);
    const sunAngle = ((currentHour - 7) / 12) * Math.PI;
    sun.position.set(Math.cos(sunAngle) * 16, Math.max(2, Math.sin(sunAngle) * 17), 7);
    const evening = Math.max(0, (currentHour - 15) / 4);
    sun.color.setRGB(1, 0.94 - evening * 0.24, 0.82 - evening * 0.4);
    sun.intensity = 3 - evening;
    sky.intensity = 2.5 - evening * 1.3;
    try {
      renderer.render(scene, camera);
    } catch {
      onFailure();
      return;
    }
    if (
      (playing && !reduced) ||
      position.distanceTo(targetPosition) > 0.01 ||
      Math.abs(hour - currentHour) > 0.01
    )
      schedule();
  }
  function resize() {
    const width = host.clientWidth;
    const height = host.clientHeight;
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    schedule();
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (!visible) {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
    } else schedule();
  });
  intersectionObserver.observe(host);
  const visibilityChange = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    schedule();
  };
  const motionChange = () => {
    reduced = media.matches;
    schedule();
  };
  const contextLost = (event: Event) => {
    event.preventDefault();
    onFailure();
  };
  document.addEventListener("visibilitychange", visibilityChange);
  media.addEventListener("change", motionChange);
  canvas.addEventListener("webglcontextlost", contextLost);
  resize();

  return {
    setView(next) {
      view = next;
      orbitTime = 0;
      schedule();
    },
    setHour(next) {
      hour = next;
      schedule();
    },
    setPlaying(next) {
      playing = next;
      schedule();
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", visibilityChange);
      media.removeEventListener("change", motionChange);
      canvas.removeEventListener("webglcontextlost", contextLost);
      geometries.forEach((value) => value.dispose());
      materials.forEach((value) => value.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    },
  };
}
