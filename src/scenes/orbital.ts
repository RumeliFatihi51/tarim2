import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { orbitalCopy } from "../content/orbital";
/** Original, detailed spacecraft geometry. Camera motion follows native scroll in both
 * directions; a slow idle arc makes its depth apparent without a scroll instruction. */
export async function mountOrbit(host: HTMLElement, base: string) {
  if (
    host.querySelector("canvas") ||
    matchMedia("(prefers-reduced-motion:reduce)").matches
  )
    return;
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "low-power",
    });
  } catch {
    return;
  }
  let disposed = false,
    visible = false,
    menuOpen = false,
    sleeping = false,
    paused = false,
    raf = 0,
    clock = 0,
    previous = 0;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#14222f");
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 150);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.4));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.append(renderer.domElement);
  const pmrem = new THREE.PMREMGenerator(renderer),
    room = new RoomEnvironment(),
    env = pmrem.fromScene(room, 0.04);
  scene.environment = env.texture;
  room.dispose();
  pmrem.dispose();
  scene.add(new THREE.HemisphereLight("#99b6cd", "#182c21", 0.6));
  const sun = new THREE.DirectionalLight("#ffedcc", 3.4);
  sun.position.set(-5, 10, 6);
  scene.add(sun);
  const fill = new THREE.DirectionalLight("#90b8f7", 1.1);
  fill.position.set(5, 3, 4);
  scene.add(fill);
  const rim = new THREE.DirectionalLight("#c4defe", 3);
  rim.position.set(-3, 6, -5);
  scene.add(rim);
  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder),
    textures = new THREE.TextureLoader();
  const toggle = host.querySelector<HTMLButtonElement>(".scene-toggle")!,
    filmToggle = host.querySelector<HTMLButtonElement>(".film-toggle");
  const media = matchMedia("(prefers-reduced-motion:reduce)");
  let model: THREE.Object3D | undefined,
    earth: THREE.Mesh | undefined,
    atmosphere: THREE.Mesh | undefined;
  const close = host.dataset.orbit === "close";
  let p = 0,
    goal = 0;
  const signal = () => document.dispatchEvent(new Event("agromax-scene"));
  const resize = () => {
    const w = host.clientWidth,
      h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const progress = () => {
    const section =
      host.closest<HTMLElement>(".home-hero,.technology-hero") || host;
    const r = section.getBoundingClientRect();
    goal = THREE.MathUtils.clamp(
      (80 - r.top) / Math.max(1, r.height * 0.8),
      0,
      1,
    );
  };
  const frame = (now: number) => {
    raf = 0;
    if (
      disposed ||
      !visible ||
      menuOpen ||
      sleeping ||
      paused ||
      document.hidden
    )
      return;
    if (previous && now - previous < 32) {
      raf = requestAnimationFrame(frame);
      return;
    }
    const dt = previous ? Math.min((now - previous) / 1000, 0.06) : 0;
    previous = now;
    clock += dt;
    progress();
    p = THREE.MathUtils.damp(p, goal, 7, dt || 0.016);
    const arc = Math.sin(clock * 0.32) * 0.36;
    camera.position.set(
      (close ? 3.1 : 4.5) - p * 4.6 + arc,
      (close ? 3.7 : 5.2) - p * 1.4,
      (close ? 8.6 : 9.7) + p * 0.9,
    );
    camera.lookAt(0, 0.35 + p * 0.3, 0.2);
    if (model) {
      model.rotation.y = p * 0.25 + Math.sin(clock * 0.32) * 0.045;
      model.position.y = Math.sin(clock * 0.32) * 0.035;
    }
    sun.position.x = -5 + p * 3;
    renderer.render(scene, camera);
    if (!host.classList.contains("webgl-active")) {
      host.classList.add("webgl-active");
      toggle.hidden = false;
      if (filmToggle) filmToggle.hidden = true;
      signal();
    }
    raf = requestAnimationFrame(frame);
  };
  const sync = () => {
    if (disposed) return;
    if (visible && !menuOpen && !sleeping && !paused && !document.hidden) {
      previous = 0;
      if (!raf) raf = requestAnimationFrame(frame);
    } else if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };
  const onToggle = () => {
    paused = !paused;
    toggle.setAttribute("aria-pressed", String(paused));
    toggle.setAttribute(
      "aria-label",
      paused ? orbitalCopy.labels.scenePlay : orbitalCopy.labels.scenePause,
    );
    toggle.innerHTML = `<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">${paused ? '<path d="m5 3 8 5-8 5z"/>' : '<path d="M4 3h3v10H4zm5 0h3v10H9z"/>'}</svg>`;
    sync();
  };
  const onMenu = (e: Event) => {
    menuOpen = (e as CustomEvent<boolean>).detail;
    sync();
  };
  const onPageHide = (e: PageTransitionEvent) => {
    if (e.persisted) {
      sleeping = true;
      sync();
    } else dispose();
  };
  const onPageShow = (e: PageTransitionEvent) => {
    if (e.persisted) {
      sleeping = false;
      sync();
    }
  };
  const onLost = (e: Event) => {
    e.preventDefault();
    dispose();
  };
  const obs = new IntersectionObserver(
    (es) => {
      visible = es[0].isIntersecting;
      sync();
    },
    { threshold: 0 },
  );
  const ro = new ResizeObserver(resize);
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(raf);
    obs.disconnect();
    ro.disconnect();
    toggle.removeEventListener("click", onToggle);
    document.removeEventListener("agromax-menu", onMenu);
    document.removeEventListener("visibilitychange", sync);
    media.removeEventListener("change", onPreference);
    window.removeEventListener("pagehide", onPageHide);
    window.removeEventListener("pageshow", onPageShow);
    renderer.domElement.removeEventListener("webglcontextlost", onLost);
    host.classList.remove("webgl-active");
    toggle.hidden = true;
    if (filmToggle) filmToggle.hidden = false;
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.geometry.dispose();
        const ms = Array.isArray(o.material) ? o.material : [o.material];
        ms.forEach((m) => {
          Object.values(m).forEach((v) => {
            if (v instanceof THREE.Texture) v.dispose();
          });
          m.dispose();
        });
      }
    });
    env.dispose();
    renderer.dispose();
    renderer.domElement.remove();
    signal();
  };
  const onPreference = () => {
    if (media.matches) dispose();
  };
  window.addEventListener("pagehide", onPageHide);
  window.addEventListener("pageshow", onPageShow);
  document.addEventListener("agromax-menu", onMenu);
  document.addEventListener("visibilitychange", sync);
  media.addEventListener("change", onPreference);
  renderer.domElement.addEventListener("webglcontextlost", onLost);
  toggle.addEventListener("click", onToggle);
  try {
    const [gltf, map] = await Promise.all([
      loader.loadAsync(base + "media/observation-satellite.glb"),
      textures.loadAsync(base + "media/earth-color.webp"),
    ]);
    if (disposed) {
      map.dispose();
      gltf.scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) =>
            m.dispose(),
          );
        }
      });
      return;
    }
    model = gltf.scene;
    scene.add(model);
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);
    earth = new THREE.Mesh(
      new THREE.SphereGeometry(8.8, 96, 64),
      new THREE.MeshStandardMaterial({
        map,
        roughness: 0.91,
        metalness: 0,
        envMapIntensity: 0.14,
        color: "#b7d3f5",
      }),
    );
    earth.position.set(0, -6.6, -4.7);
    earth.rotation.set(-0.49, 2.35, 0.08);
    scene.add(earth);
    atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(8.85, 64, 48),
      new THREE.ShaderMaterial({
        vertexShader:
          "varying vec3 n;varying vec3 v;void main(){vec4 p=modelViewMatrix*vec4(position,1.0);n=normalize(normalMatrix*normal);v=normalize(-p.xyz);gl_Position=projectionMatrix*p;}",
        fragmentShader:
          "varying vec3 n;varying vec3 v;void main(){float f=pow(1.0-max(dot(normalize(n),normalize(v)),0.0),4.5);gl_FragColor=vec4(0.24,0.53,0.95,f*0.5);}",
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    atmosphere.position.copy(earth.position);
    scene.add(atmosphere);
    resize();
    progress();
    p = goal;
    obs.observe(host);
    ro.observe(host);
    host.dataset.production = "webgl";
  } catch {
    dispose();
  }
  // Return cleanup for preference and page lifecycle management.
  return dispose;
}
