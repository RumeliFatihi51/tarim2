import * as T from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
/** A shared physical coordinate system, deterministic forward/reverse camera track. */
export async function mountWorld(host: HTMLElement, base: string) {
  const hero = host.dataset.world === "hero";
  const reduced = matchMedia("(prefers-reduced-motion:reduce)");
  if (reduced.matches) return;
  let r: T.WebGLRenderer;
  try {
    r = new T.WebGLRenderer({
      alpha: true,
      antialias: true,
      logarithmicDepthBuffer: true,
      powerPreference: "low-power",
    });
  } catch {
    return;
  }
  let dead = false,
    visible = false,
    blocked = false,
    raf = 0,
    previous = 0,
    phase = 0;
  const scene = new T.Scene();
  scene.background = new T.Color("#d8ddd0");
  const fog = new T.FogExp2("#d8ddd0", 0.002);
  scene.fog = fog;
  r.setPixelRatio(Math.min(devicePixelRatio, 1.35));
  r.toneMapping = T.ACESFilmicToneMapping;
  r.toneMappingExposure = 1.12;
  r.domElement.setAttribute("aria-hidden", "true");
  host.prepend(r.domElement);
  const camera = new T.PerspectiveCamera(48, 1, 0.03, 100000);
  scene.add(new T.HemisphereLight("#e9eff6", "#494b28", 2));
  const sun = new T.DirectionalLight("#ffe5a0", 3.4);
  sun.position.set(-30, 45, -25);
  scene.add(sun);
  const tex = new T.TextureLoader();
  const groundMap = await tex
    .loadAsync(base + "media/agriculture.webp")
    .catch(() => null);
  if (dead) {
    groundMap?.dispose();
    return;
  }
  if (groundMap) groundMap.colorSpace = T.SRGBColorSpace;
  const geometry = new T.PlaneGeometry(2000, 2000, 128, 128);
  geometry.rotateX(-Math.PI / 2);
  const a = geometry.attributes.position;
  for (let i = 0; i < a.count; i++)
    a.setY(i, 5 * Math.sin(a.getX(i) / 90) * Math.sin(a.getZ(i) / 100));
  geometry.computeVertexNormals();
  const groundMaterial = new T.MeshStandardMaterial({
    map: groundMap,
    roughness: 0.98,
    color: "#c4cba8",
  });
  let revealShader: any;
  groundMaterial.onBeforeCompile = (s) => {
    s.uniforms.observation = { value: 0 };
    s.vertexShader = "varying vec3 landPosition;\n" + s.vertexShader;
    s.vertexShader = s.vertexShader.replace(
      "#include <begin_vertex>",
      "#include <begin_vertex>\nlandPosition=(modelMatrix*vec4(transformed,1.)).xyz;",
    );
    s.fragmentShader =
      "uniform float observation;varying vec3 landPosition;\n" +
      s.fragmentShader;
    s.fragmentShader = s.fragmentShader.replace(
      "#include <map_fragment>",
      `#include <map_fragment>\n#ifdef USE_MAP\nfloat soil=1.-smoothstep(7.,35.,distance(cameraPosition,landPosition));float grain=fract(sin(dot(floor(landPosition.xz*120.),vec2(12.9898,78.233)))*43758.5453);diffuseColor.rgb=mix(diffuseColor.rgb,mix(vec3(.13,.095,.05),vec3(.29,.23,.13),grain),soil);float cell=sin(vMapUv.x*90.0)*sin(vMapUv.y*72.0);vec3 botanical=mix(vec3(.16,.26,.10),vec3(.65,.64,.26),smoothstep(-.5,.5,cell));diffuseColor.rgb=mix(diffuseColor.rgb,botanical,observation*.25);float edge=step(.996,fract(vMapUv.x*14.0))+step(.996,fract(vMapUv.y*11.0));diffuseColor.rgb+=vec3(.25,.3,.14)*edge*observation;\n#endif`,
    );
    revealShader = s;
  };
  const ground = new T.Mesh(geometry, groundMaterial);
  scene.add(ground);
  // Instanced authored crop mesh: real leaf curvature, stems and grain, not billboard particles.
  const crops = new T.Group();
  scene.add(crops);
  try {
    const gltf = await new GLTFLoader().loadAsync(base + "media/crop.glb");
    if (dead) return;
    gltf.scene.updateMatrixWorld(true);
    gltf.scene.traverse((o) => {
      if (o instanceof T.Mesh) {
        o.geometry.computeVertexNormals();
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        mats.forEach((m) => {
          m.side = T.DoubleSide;
          if (m instanceof T.MeshStandardMaterial) {
            m.roughness = 0.82;
            m.metalness = 0;
            if (m.name.includes("chlorophyll")) {
              m.color.set("#647b2c");
              m.emissive.set("#172109");
              m.emissiveIntensity = 0.25;
            }
          }
        });
        const count = hero ? 9 : 169;
        const inst = new T.InstancedMesh(o.geometry, o.material, count);
        const m = new T.Matrix4();
        let k = 0;
        for (let x = hero ? -1 : -6; x <= (hero ? 1 : 6); x++)
          for (let z = hero ? -1 : -6; z <= (hero ? 1 : 6); z++) {
            m.makeTranslation(
              hero ? 6 + x * 1.5 : x * 0.56,
              0,
              hero ? -2 + z * 1.8 : z * 0.7,
            );
            if (hero) m.scale(new T.Vector3(2.1, 2.1, 2.1));
            m.multiply(
              new T.Matrix4().makeRotationY(Math.sin(x * 17 + z * 31) * 0.35),
            );
            m.multiply(o.matrixWorld);
            inst.setMatrixAt(k++, m);
          }
        inst.instanceMatrix.needsUpdate = true;
        crops.add(inst);
      }
    });
  } catch {
    geometry.dispose();
    groundMaterial.dispose();
    groundMap?.dispose();
    r.dispose();
    r.domElement.remove();
    return;
  }
  const earthMap = await tex
    .loadAsync(base + "media/earth-color.webp")
    .catch(() => null);
  if (dead) {
    earthMap?.dispose();
    return;
  }
  if (earthMap) earthMap.colorSpace = T.SRGBColorSpace;
  const earth = new T.Mesh(
    new T.SphereGeometry(6300, 96, 64),
    new T.MeshStandardMaterial({ map: earthMap, roughness: 1 }),
  );
  earth.position.y = -6350;
  scene.add(earth);
  const atmosphere = new T.Mesh(
    new T.SphereGeometry(6360, 64, 48),
    new T.ShaderMaterial({
      vertexShader:
        "varying vec3 n;varying vec3 v;void main(){vec4 p=modelViewMatrix*vec4(position,1.);n=normalize(normalMatrix*normal);v=normalize(-p.xyz);gl_Position=projectionMatrix*p;}",
      fragmentShader:
        "varying vec3 n;varying vec3 v;void main(){float a=pow(1.-max(dot(normalize(n),normalize(v)),0.),4.);gl_FragColor=vec4(.48,.67,.89,a*.45);}",
      transparent: true,
      depthWrite: false,
      blending: T.AdditiveBlending,
    }),
  );
  atmosphere.position.copy(earth.position);
  scene.add(atmosphere);
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(250,247,232,.6)");
  g.addColorStop(1, "rgba(250,247,232,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const cloudTex = new T.CanvasTexture(c);
  const clouds = new T.Group();
  scene.add(clouds);
  for (let i = 0; i < 24; i++) {
    const cloud = new T.Sprite(
      new T.SpriteMaterial({
        map: cloudTex,
        transparent: true,
        opacity: 0.65,
        depthWrite: false,
      }),
    );
    cloud.position.set(
      Math.sin(i * 13) * 360,
      250 + (i % 5) * 110,
      Math.cos(i * 9) * 450,
    );
    cloud.scale.set(220 + (i % 3) * 100, 100 + (i % 4) * 30, 1);
    clouds.add(cloud);
  }
  const poses = [
    [0, 8000, 14000],
    [0, 1500, 1200],
    [100, 140, 180],
    [35, 90, 110],
    [0.75, 1.15, 2.3],
    [18, 12, 45],
  ];
  const aims = [
    [0, -6350, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 1.05, 0],
    [0, 1.5, -20],
  ];
  const pointer = new T.Vector2();
  let pointerTarget = new T.Vector2();
  const resize = () => {
    r.setSize(host.clientWidth, host.clientHeight, false);
    camera.aspect = host.clientWidth / host.clientHeight;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  const frame = (now: number) => {
    raf = 0;
    if (dead || !visible || blocked || document.hidden) return;
    if (previous && now - previous < 33) {
      raf = requestAnimationFrame(frame);
      return;
    }
    const dt = previous ? Math.min((now - previous) / 1000, 0.1) : 0.016;
    previous = now;
    if (hero) {
      pointer.lerp(pointerTarget, 0.04);
      camera.position.set(5 + pointer.x * 0.6, 3.7 + pointer.y * 0.2, 11);
      camera.lookAt(0, 1, -10);
      scene.background = null;
      ground.visible = false;
      fog.density = 0;
      earth.visible = atmosphere.visible = clouds.visible = false;
    } else {
      const section = host.closest<HTMLElement>(".journey")!;
      const b = section.getBoundingClientRect();
      phase = T.MathUtils.clamp(-b.top / (b.height - innerHeight), 0, 1);
      const q = phase * 5,
        i = Math.min(4, Math.floor(q)),
        t = q - i,
        u = t * t * (3 - 2 * t);
      camera.position
        .fromArray(poses[i])
        .lerp(new T.Vector3().fromArray(poses[i + 1]), u);
      camera.lookAt(
        new T.Vector3()
          .fromArray(aims[i])
          .lerp(new T.Vector3().fromArray(aims[i + 1]), u),
      );
      fog.density =
        phase < 0.16 ? 0 : T.MathUtils.smoothstep(phase, 0.16, 0.4) * 0.002;
      scene.background = new T.Color("#091725").lerp(
        new T.Color("#d8ddd0"),
        T.MathUtils.smoothstep(phase, 0.12, 0.34),
      );
      earth.visible = atmosphere.visible = phase < 0.42;
      ground.visible = phase > 0.28;
      crops.visible = phase > 0.71 && phase < 0.87;
      clouds.visible = phase > 0.12 && phase < 0.46;
      if (revealShader)
        revealShader.uniforms.observation.value = Math.max(
          0,
          1 - Math.abs(phase - 0.62) / 0.13,
        );
      host.dataset.phase = String(Math.min(5, Math.floor(phase * 6)));
    }
    r.render(scene, camera);
    host.classList.add("world-ready");
    if (hero && pointer.distanceTo(pointerTarget) > 0.002)
      raf = requestAnimationFrame(frame);
  };
  const sync = () => {
    if (visible && !blocked && !document.hidden && !dead) {
      previous = 0;
      if (!raf) raf = requestAnimationFrame(frame);
    } else {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };
  const obs = new IntersectionObserver((e) => {
    visible = e[0].isIntersecting;
    sync();
  });
  obs.observe(host);
  const menu = (e: Event) => {
    blocked = (e as CustomEvent).detail;
    sync();
  };
  const move = (e: PointerEvent) => {
    pointerTarget.set(
      (e.clientX / innerWidth - 0.5) * 2,
      (e.clientY / innerHeight - 0.5) * 2,
    );
    sync();
  };
  const dispose = () => {
    if (dead) return;
    dead = true;
    cancelAnimationFrame(raf);
    obs.disconnect();
    ro.disconnect();
    document.removeEventListener("visibilitychange", sync);
    removeEventListener("scroll", sync);
    document.removeEventListener("agromax-menu", menu);
    host.removeEventListener("pointermove", move);
    reduced.removeEventListener("change", dispose);
    scene.traverse((o) => {
      if (o instanceof T.Mesh) {
        o.geometry.dispose();
        (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) =>
          m.dispose(),
        );
      }
    });
    groundMap?.dispose();
    earthMap?.dispose();
    cloudTex.dispose();
    r.dispose();
    r.domElement.removeEventListener("webglcontextlost", lost);
    r.domElement.remove();
    host.classList.remove("world-ready");
  };
  const lost = (e: Event) => {
    e.preventDefault();
    dispose();
    host.dispatchEvent(new Event("world-fallback"));
  };
  r.domElement.addEventListener("webglcontextlost", lost);
  document.addEventListener("visibilitychange", sync);
  if (!hero) addEventListener("scroll", sync, { passive: true });
  document.addEventListener("agromax-menu", menu);
  host.addEventListener("pointermove", move);
  reduced.addEventListener("change", dispose);
  resize();
  return dispose;
}
