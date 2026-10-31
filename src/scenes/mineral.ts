import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
/** A real Blender-authored scene. Render only on scroll/resize while visible. */
export async function mountMineral(host: HTMLElement, base: string) {
  if (
    !matchMedia("(min-width:768px)").matches ||
    matchMedia("(prefers-reduced-motion:reduce)").matches
  )
    return;
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "low-power",
    });
  } catch {
    return;
  }
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#eeeee5");
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 70);
  camera.position.set(6, 5.8, 9);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.88;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const env = pmrem.fromScene(room, 0.04);
  scene.environment = env.texture;
  room.dispose();
  pmrem.dispose();
  const key = new THREE.DirectionalLight(0xfff3dc, 2);
  key.position.set(-4, 8, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -5;
  key.shadow.camera.right = 5;
  key.shadow.camera.top = 5;
  key.shadow.camera.bottom = -5;
  key.shadow.bias = -0.0005;
  key.shadow.radius = 4;
  key.shadow.normalBias = 0.02;
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xd8e4dc, 0.7);
  fill.position.set(5, 4, -5);
  scene.add(fill);
  scene.add(new THREE.AmbientLight(0xffffff, 0.25));
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.ShadowMaterial({ color: 0x20382b, opacity: 0.09 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.15;
  floor.receiveShadow = true;
  scene.add(floor);
  const canvas = renderer.domElement;
  canvas.className = "mineral-canvas";
  canvas.setAttribute("aria-hidden", "true");
  const technology = host.classList.contains("technology-art");
  const evolvingMaterials: {
    material: THREE.MeshStandardMaterial;
    roughness: number;
    transmission?: number;
  }[] = [];
  let disposed = false,
    visible = false,
    pending = false;
  const moving: { node: THREE.Object3D; y: number; level: number }[] = [];
  const render = () => {
    if (
      disposed ||
      !visible ||
      pending ||
      document.hidden ||
      document.body.style.overflow === "hidden"
    )
      return;
    pending = true;
    requestAnimationFrame(() => {
      pending = false;
      if (disposed || !visible) return;
      const rect = (
        host.closest(".signature-v2") || host
      ).getBoundingClientRect();
      const p = Math.max(
        0,
        Math.min(1, (innerHeight - rect.top) / (innerHeight + rect.height)),
      );
      moving.forEach(
        (m) =>
          (m.node.position.y =
            m.y +
            (m.level - (technology ? 1.5 : 4)) *
              (technology ? 0.3 : 0.085) *
              Math.sin(p * Math.PI)),
      );
      const angle = 0.35 + p * 0.9;
      camera.position.set(
        Math.sin(angle) * (technology ? 9 : 8),
        3.9 + p * 1.2,
        Math.cos(angle) * (technology ? 9 : 8),
      );
      camera.lookAt(0, technology ? 1.3 : 0.85, 0);
      evolvingMaterials.forEach(({ material, roughness, transmission }) => {
        material.roughness = THREE.MathUtils.lerp(
          Math.min(0.6, roughness + 0.18),
          roughness,
          p,
        );
        if (
          transmission !== undefined &&
          material instanceof THREE.MeshPhysicalMaterial
        )
          material.transmission = transmission * (0.45 + 0.55 * p);
      });
      key.position.x = -5 + p * 5;
      renderer.render(scene, camera);
      canvas.classList.add("is-rendered");
      host.classList.add("webgl-active");
      host.querySelector("video")?.pause();
    });
  };
  const resize = () => {
    if (disposed) return;
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    render();
  };
  const motionPreference = matchMedia("(prefers-reduced-motion:reduce)");
  const preferenceChange = () => {
    if (motionPreference.matches) cleanup();
  };
  const cleanup = () => {
    if (disposed) return;
    disposed = true;
    motionPreference.removeEventListener("change", preferenceChange);
    window.removeEventListener("scroll", render);
    observer.disconnect();
    resizeObserver.disconnect();
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.geometry.dispose();
        (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) =>
          m.dispose(),
        );
      }
    });
    env.dispose();
    renderer.dispose();
    canvas.remove();
    host.classList.remove("webgl-active");
  };
  motionPreference.addEventListener("change", preferenceChange);
  const observer = new IntersectionObserver(
    (entries) => {
      visible = entries[0].isIntersecting;
      if (visible) render();
    },
    { rootMargin: "50px" },
  );
  observer.observe(host);
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  canvas.addEventListener(
    "webglcontextlost",
    () => {
      canvas.classList.remove("is-rendered");
      cleanup();
    },
    { once: true },
  );
  try {
    const gltf = await new GLTFLoader().loadAsync(
      base + "media/" + (technology ? "strata.glb" : "context-loom.glb"),
    );
    if (disposed) return;
    gltf.scene.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        const materials = Array.isArray(node.material)
          ? node.material
          : [node.material];
        materials.forEach((m) => {
          if (m instanceof THREE.MeshStandardMaterial) {
            m.envMapIntensity = 0.6;
            m.roughness = Math.max(0.2, m.roughness);
            evolvingMaterials.push({
              material: m,
              roughness: m.roughness,
              transmission:
                m instanceof THREE.MeshPhysicalMaterial
                  ? m.transmission
                  : undefined,
            });
          }
        });
      }
      if (typeof node.userData.level === "number")
        moving.push({ node, y: node.position.y, level: node.userData.level });
    });
    scene.add(gltf.scene);
    host.append(canvas);
    resize();
    window.addEventListener("scroll", render, { passive: true });
    window.addEventListener("pagehide", cleanup, { once: true });
  } catch {
    cleanup();
  }
  return cleanup;
}
