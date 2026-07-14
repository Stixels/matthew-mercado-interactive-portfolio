"use client";

import { useMemo, useRef } from "react";
import type { MutableRefObject, RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type SignalRigProps = {
  timeline: MutableRefObject<number>;
  pointer: MutableRefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
};

type GroupRef = RefObject<THREE.Group | null>;
type MeshRef = RefObject<THREE.Mesh | null>;
type SceneNode = "browser" | "service" | "ai" | "integration";
type SceneState = {
  camera: readonly [number, number, number];
  emphasis: Record<SceneNode, number>;
};

const ORANGE = "#ff5c35";
const INK = "#171a1c";
const GRAPHITE = "#2a3033";
const SILVER = "#aeb7b6";
const PAPER = "#eef1eb";
const COBALT = "#2448d8";
const BLUE_LIGHT = "#9eafff";

const NODE_POSITIONS: Record<SceneNode, readonly [number, number, number]> = {
  browser: [-0.85, 2.05, 0.58],
  service: [-0.85, 0.12, 0.58],
  ai: [1.2, 0.12, 0.58],
  integration: [-0.85, -1.72, 0.58],
};

const NODE_SCALES: Record<SceneNode, number> = {
  browser: 0.44,
  service: 0.42,
  ai: 0.5,
  integration: 0.47,
};

const SCENE_STATES = [
  {
    camera: [0, 0.18, 13.6],
    emphasis: { browser: 1, service: 1, ai: 1, integration: 1 },
  },
  {
    camera: [-0.55, 2.02, 9.7],
    emphasis: { browser: 1.08, service: 0.56, ai: 0.5, integration: 0.46 },
  },
  {
    camera: [-0.68, 0.98, 10.8],
    emphasis: { browser: 0.82, service: 1.13, ai: 0.56, integration: 0.5 },
  },
  {
    camera: [0.28, 0.18, 10.3],
    emphasis: { browser: 0.58, service: 0.78, ai: 1.14, integration: 0.54 },
  },
  {
    camera: [0, 0, 13.2],
    emphasis: { browser: 0.96, service: 1, ai: 0.98, integration: 1.12 },
  },
] as const satisfies readonly SceneState[];

function phase(value: number, start: number, end: number) {
  return THREE.MathUtils.smoothstep(value, start, end);
}

function Connection({
  from,
  to,
  color = ORANGE,
  radius = 0.026,
}: {
  from: [number, number, number];
  to: [number, number, number];
  color?: string;
  radius?: number;
}) {
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(...from),
        new THREE.Vector3(...to),
      ]),
    [from, to],
  );

  return (
    <mesh>
      <tubeGeometry args={[curve, 12, radius, 8, false]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
}

function BrowserApplication({ browserRef }: { browserRef: GroupRef }) {
  const activityCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.55, -0.3, 0.2),
        new THREE.Vector3(-0.05, 0.05, 0.2),
        new THREE.Vector3(0.42, -0.08, 0.2),
        new THREE.Vector3(0.92, 0.5, 0.2),
        new THREE.Vector3(1.65, 0.34, 0.2),
      ]),
    [],
  );

  return (
    <group ref={browserRef} position={[0, 0, 1.45]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[5.8, 3.65, 0.18]} />
        <meshStandardMaterial color={INK} metalness={0.22} roughness={0.42} />
      </mesh>

      <mesh position={[0, -0.05, 0.125]}>
        <boxGeometry args={[5.52, 3.27, 0.08]} />
        <meshStandardMaterial color={PAPER} roughness={0.74} />
      </mesh>

      <mesh position={[0, 1.54, 0.185]}>
        <boxGeometry args={[5.52, 0.36, 0.08]} />
        <meshStandardMaterial color="#202527" roughness={0.48} />
      </mesh>

      {[-2.42, -2.2, -1.98].map((x, index) => (
        <mesh key={x} position={[x, 1.54, 0.25]}>
          <sphereGeometry args={[0.055, 14, 14]} />
          <meshBasicMaterial color={index === 0 ? ORANGE : "#687174"} />
        </mesh>
      ))}

      <mesh position={[0.35, 1.54, 0.245]}>
        <boxGeometry args={[2.75, 0.1, 0.035]} />
        <meshStandardMaterial color="#495154" roughness={0.55} />
      </mesh>

      <mesh position={[-2.08, -0.05, 0.205]}>
        <boxGeometry args={[1.07, 3.04, 0.055]} />
        <meshStandardMaterial color="#dce1db" roughness={0.78} />
      </mesh>

      <mesh position={[-2.08, 0.98, 0.245]}>
        <boxGeometry args={[0.66, 0.11, 0.026]} />
        <meshBasicMaterial color={INK} />
      </mesh>

      {[0.55, 0.19, -0.17, -0.53].map((y, index) => (
        <group key={y} position={[-2.08, y, 0.245]}>
          <mesh position={[-0.31, 0, 0]}>
            <boxGeometry args={[0.1, 0.1, 0.025]} />
            <meshBasicMaterial color={index === 1 ? ORANGE : "#7a8383"} />
          </mesh>
          <mesh position={[0.1, 0, 0]}>
            <boxGeometry args={[0.48, 0.065, 0.025]} />
            <meshBasicMaterial color={index === 1 ? INK : "#9da5a3"} />
          </mesh>
        </group>
      ))}

      <mesh position={[-0.55, 0.98, 0.245]}>
        <boxGeometry args={[1.55, 0.13, 0.028]} />
        <meshBasicMaterial color={INK} />
      </mesh>
      <mesh position={[1.86, 0.98, 0.245]}>
        <boxGeometry args={[0.72, 0.28, 0.03]} />
        <meshBasicMaterial color={ORANGE} toneMapped={false} />
      </mesh>

      {[-0.6, 0.45, 1.5].map((x, index) => (
        <group key={x} position={[x, 0.42, 0.245]}>
          <mesh>
            <boxGeometry args={[0.86, 0.48, 0.025]} />
            <meshStandardMaterial
              color={index === 1 ? "#d8def6" : "#e1e5df"}
              roughness={0.76}
            />
          </mesh>
          <mesh position={[-0.21, 0.11, 0.02]}>
            <boxGeometry args={[0.26, 0.05, 0.02]} />
            <meshBasicMaterial color="#7d8585" />
          </mesh>
          <mesh position={[-0.1, -0.08, 0.02]}>
            <boxGeometry args={[0.48, 0.09, 0.02]} />
            <meshBasicMaterial color={index === 1 ? COBALT : INK} />
          </mesh>
        </group>
      ))}

      <mesh position={[0.55, -0.42, 0.245]}>
        <boxGeometry args={[3.55, 0.82, 0.025]} />
        <meshStandardMaterial color="#e1e5df" roughness={0.8} />
      </mesh>
      <mesh position={[0.55, -0.42, 0.285]}>
        <tubeGeometry args={[activityCurve, 42, 0.025, 8, false]} />
        <meshBasicMaterial color={COBALT} toneMapped={false} />
      </mesh>

      {[-0.98, -1.27].map((y, row) =>
        [-0.63, 0.35, 1.34].map((x, column) => (
          <mesh key={`${row}-${column}`} position={[x, y, 0.245]}>
            <boxGeometry args={[column === 2 ? 0.7 : 0.62, 0.06, 0.022]} />
            <meshBasicMaterial color={column === 0 ? "#777f7f" : "#b1b8b5"} />
          </mesh>
        )),
      )}
    </group>
  );
}

function ServiceLayer({ serviceRef }: { serviceRef: GroupRef }) {
  return (
    <group ref={serviceRef} position={[0.12, 0.08, 0.45]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[5.15, 3.15, 0.2]} />
        <meshStandardMaterial
          color="#252b2e"
          metalness={0.3}
          roughness={0.48}
        />
      </mesh>

      <mesh position={[0, 1.28, 0.15]}>
        <boxGeometry args={[4.72, 0.13, 0.045]} />
        <meshBasicMaterial color={ORANGE} toneMapped={false} />
      </mesh>

      {[-1.55, -0.3, 0.95].map((x, index) => (
        <group key={x} position={[x, 0.22, 0.18]}>
          <mesh castShadow>
            <boxGeometry args={[0.9, 1.45, 0.26]} />
            <meshStandardMaterial
              color={index === 1 ? COBALT : "#3b4346"}
              metalness={0.18}
              roughness={0.45}
            />
          </mesh>
          {[0.42, 0.12, -0.18, -0.48].map((y, row) => (
            <group key={y} position={[0, y, 0.15]}>
              <mesh position={[-0.27, 0, 0]}>
                <sphereGeometry args={[0.045, 12, 12]} />
                <meshBasicMaterial
                  color={row === index ? ORANGE : BLUE_LIGHT}
                />
              </mesh>
              <mesh position={[0.12, 0, 0]}>
                <boxGeometry args={[0.5, 0.045, 0.025]} />
                <meshBasicMaterial
                  color={index === 1 ? "#bec9ff" : "#788284"}
                />
              </mesh>
            </group>
          ))}
        </group>
      ))}

      <group position={[1.9, 0.3, 0.2]}>
        {[-0.36, 0, 0.36].map((y, index) => (
          <mesh key={y} position={[0, y, index * 0.015]}>
            <cylinderGeometry args={[0.48, 0.48, 0.26, 32]} />
            <meshStandardMaterial
              color={index === 1 ? SILVER : "#d3d9d5"}
              metalness={0.42}
              roughness={0.38}
            />
          </mesh>
        ))}
      </group>

      <Connection from={[-1.1, 0.22, 0.35]} to={[-0.76, 0.22, 0.35]} />
      <Connection from={[0.17, 0.22, 0.35]} to={[0.49, 0.22, 0.35]} />
      <Connection from={[1.41, 0.22, 0.35]} to={[1.72, 0.22, 0.35]} />

      <mesh position={[0, -1.12, 0.17]}>
        <boxGeometry args={[4.72, 0.1, 0.04]} />
        <meshBasicMaterial color="#596265" />
      </mesh>
      {[-2.1, -1.72, 1.72, 2.1].map((x, index) => (
        <mesh key={x} position={[x, -1.12, 0.23]}>
          <sphereGeometry args={[0.065, 14, 14]} />
          <meshBasicMaterial color={index === 2 ? ORANGE : "#8b9594"} />
        </mesh>
      ))}
    </group>
  );
}

function AIEngine({ aiRef }: { aiRef: GroupRef }) {
  const nodes = [
    [-0.7, 0.72],
    [0.03, 0.92],
    [0.72, 0.52],
    [-0.82, -0.16],
    [0.78, -0.28],
    [-0.34, -0.82],
    [0.42, -0.84],
  ] as const;

  return (
    <group ref={aiRef} position={[0.15, 0, -0.45]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[3.15, 2.85, 0.28]} />
        <meshStandardMaterial color={COBALT} metalness={0.12} roughness={0.4} />
      </mesh>

      <mesh position={[0, 1.12, 0.2]}>
        <boxGeometry args={[2.7, 0.1, 0.04]} />
        <meshBasicMaterial color="#b8c4ff" />
      </mesh>

      {nodes.map(([x, y], index) => (
        <group key={`${x}-${y}`}>
          <Connection
            from={[0, 0, 0.22]}
            to={[x, y, 0.22]}
            color={index % 3 === 0 ? ORANGE : BLUE_LIGHT}
            radius={0.018}
          />
          <mesh position={[x, y, 0.25]}>
            <sphereGeometry args={[index % 2 === 0 ? 0.105 : 0.075, 18, 18]} />
            <meshBasicMaterial color={index % 3 === 0 ? ORANGE : PAPER} />
          </mesh>
        </group>
      ))}

      <mesh position={[0, 0, 0.3]} castShadow>
        <icosahedronGeometry args={[0.35, 1]} />
        <meshStandardMaterial
          color={ORANGE}
          emissive={ORANGE}
          emissiveIntensity={0.32}
          roughness={0.34}
        />
      </mesh>
    </group>
  );
}

function IntegrationLayer({ integrationRef }: { integrationRef: GroupRef }) {
  return (
    <group ref={integrationRef} position={[0.25, 0, -1.25]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.25, 1.25, 0.24]} />
        <meshStandardMaterial color={INK} metalness={0.24} roughness={0.45} />
      </mesh>
      <mesh position={[0, 0, 0.19]}>
        <sphereGeometry args={[0.22, 22, 22]} />
        <meshBasicMaterial color={ORANGE} toneMapped={false} />
      </mesh>

      <Connection from={[0.62, 0.35, 0]} to={[1.35, 1.08, 0]} />
      <Connection from={[0.62, 0, 0]} to={[1.55, 0, 0]} />
      <Connection from={[0.62, -0.35, 0]} to={[1.35, -1.08, 0]} />

      <group position={[1.78, 1.25, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.95, 1.42, 0.2]} />
          <meshStandardMaterial color={PAPER} roughness={0.65} />
        </mesh>
        <mesh position={[0, 0.22, 0.14]}>
          <boxGeometry args={[0.66, 0.62, 0.04]} />
          <meshBasicMaterial color="#d8deda" />
        </mesh>
        <mesh position={[0, -0.45, 0.14]}>
          <boxGeometry args={[0.34, 0.07, 0.03]} />
          <meshBasicMaterial color={COBALT} />
        </mesh>
      </group>

      <group position={[2.04, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.45, 0.96, 0.2]} />
          <meshStandardMaterial color="#dfe4df" roughness={0.68} />
        </mesh>
        <mesh position={[0, 0.15, 0.14]}>
          <boxGeometry args={[1.02, 0.12, 0.035]} />
          <meshBasicMaterial color={INK} />
        </mesh>
        {[-0.32, 0, 0.32].map((x, index) => (
          <mesh key={x} position={[x, -0.2, 0.14]}>
            <sphereGeometry args={[0.08, 14, 14]} />
            <meshBasicMaterial color={index === 1 ? ORANGE : "#737d7d"} />
          </mesh>
        ))}
      </group>

      <group position={[1.78, -1.25, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.28, 0.95, 0.24]} />
          <meshStandardMaterial
            color={GRAPHITE}
            metalness={0.25}
            roughness={0.46}
          />
        </mesh>
        <mesh position={[-0.33, 0, 0.18]}>
          <boxGeometry args={[0.28, 0.42, 0.08]} />
          <meshBasicMaterial color={ORANGE} />
        </mesh>
        <mesh position={[0.3, 0.16, 0.18]}>
          <boxGeometry args={[0.4, 0.06, 0.04]} />
          <meshBasicMaterial color={SILVER} />
        </mesh>
        <mesh position={[0.3, -0.16, 0.18]}>
          <boxGeometry args={[0.4, 0.06, 0.04]} />
          <meshBasicMaterial color={SILVER} />
        </mesh>
      </group>
    </group>
  );
}

function SystemConnections({
  mainCurve,
  aiCurve,
  flowRef,
}: {
  mainCurve: THREE.CatmullRomCurve3;
  aiCurve: THREE.CatmullRomCurve3;
  flowRef: MeshRef;
}) {
  return (
    <group>
      <mesh>
        <tubeGeometry args={[mainCurve, 36, 0.026, 8, false]} />
        <meshBasicMaterial
          color={ORANGE}
          opacity={0.56}
          transparent
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh>
        <tubeGeometry args={[aiCurve, 20, 0.026, 8, false]} />
        <meshBasicMaterial
          color={COBALT}
          opacity={0.5}
          transparent
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={flowRef}>
        <sphereGeometry args={[0.09, 18, 18]} />
        <meshBasicMaterial color={ORANGE} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Rig({ timeline, pointer, reducedMotion }: SignalRigProps) {
  const rigRef = useRef<THREE.Group>(null);
  const browserRef = useRef<THREE.Group>(null);
  const serviceRef = useRef<THREE.Group>(null);
  const aiRef = useRef<THREE.Group>(null);
  const integrationRef = useRef<THREE.Group>(null);
  const flowRef = useRef<THREE.Mesh>(null);
  const mainCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.85, 1.23, 0.34),
        new THREE.Vector3(-0.85, 0.82, 0.34),
        new THREE.Vector3(-0.85, 0.12, 0.34),
        new THREE.Vector3(-0.85, -0.56, 0.34),
        new THREE.Vector3(-0.85, -1.4, 0.34),
      ]),
    [],
  );
  const aiCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.24, 0.12, 0.34),
        new THREE.Vector3(0.4, 0.34, 0.34),
        new THREE.Vector3(0.56, 0.12, 0.34),
      ]),
    [],
  );

  useFrame((state) => {
    if (
      !rigRef.current ||
      !browserRef.current ||
      !serviceRef.current ||
      !aiRef.current ||
      !integrationRef.current ||
      !flowRef.current
    ) {
      return;
    }

    const targetTimeline = reducedMotion
      ? Math.round(timeline.current)
      : timeline.current;
    const p = THREE.MathUtils.clamp(targetTimeline, 0, SCENE_STATES.length - 1);
    const sceneIndex = Math.min(Math.floor(p), SCENE_STATES.length - 1);
    const nextSceneIndex = Math.min(sceneIndex + 1, SCENE_STATES.length - 1);
    const sceneProgress = phase(p - sceneIndex, 0.12, 0.88);
    const currentScene = SCENE_STATES[sceneIndex];
    const nextScene = SCENE_STATES[nextSceneIndex];
    const pageWidth =
      state.gl.domElement.ownerDocument.documentElement.clientWidth;
    const compactCameraZOffset =
      pageWidth <= 640 ? 1.8 : pageWidth <= 1100 ? 0.9 : 0;
    const compactCameraYOffset =
      pageWidth <= 640 ? 0.9 : pageWidth <= 1100 ? 0.65 : 0;
    const cameraX = THREE.MathUtils.lerp(
      currentScene.camera[0],
      nextScene.camera[0],
      sceneProgress,
    );
    const cameraY = THREE.MathUtils.lerp(
      currentScene.camera[1],
      nextScene.camera[1],
      sceneProgress,
    );
    const cameraZ =
      THREE.MathUtils.lerp(
        currentScene.camera[2],
        nextScene.camera[2],
        sceneProgress,
      ) + compactCameraZOffset;
    state.camera.position.set(cameraX, cameraY + compactCameraYOffset, cameraZ);
    state.camera.lookAt(cameraX, cameraY + compactCameraYOffset, 0);

    rigRef.current.position.set(0, pageWidth <= 1100 ? -0.08 : 0, 0);
    rigRef.current.scale.setScalar(pageWidth <= 640 ? 0.92 : 1);
    rigRef.current.rotation.x = -0.045 + pointer.current.y * 0.02;
    rigRef.current.rotation.y = -0.11 + pointer.current.x * 0.035;
    rigRef.current.rotation.z = THREE.MathUtils.lerp(-0.012, 0.008, p / 4);

    const nodes: Record<SceneNode, THREE.Group> = {
      browser: browserRef.current,
      service: serviceRef.current,
      ai: aiRef.current,
      integration: integrationRef.current,
    };

    (Object.keys(nodes) as SceneNode[]).forEach((node) => {
      const emphasis = THREE.MathUtils.lerp(
        currentScene.emphasis[node],
        nextScene.emphasis[node],
        sceneProgress,
      );
      nodes[node].position.set(...NODE_POSITIONS[node]);
      nodes[node].scale.setScalar(NODE_SCALES[node] * emphasis);
    });
    aiRef.current.rotation.z = 0.025;

    const cycle = reducedMotion ? 0.5 : (state.clock.elapsedTime * 0.26) % 1;
    const activeScene = Math.round(p);
    const flowPoint =
      activeScene === 3
        ? aiCurve.getPointAt(cycle)
        : activeScene === 2
          ? mainCurve.getPointAt(cycle * 0.46)
          : activeScene === 4
            ? mainCurve.getPointAt(0.48 + cycle * 0.52)
            : mainCurve.getPointAt(cycle);
    flowRef.current.position.copy(flowPoint);
    flowRef.current.scale.setScalar(
      reducedMotion ? 1 : 0.9 + Math.sin(state.clock.elapsedTime * 5) * 0.18,
    );
  });

  return (
    <group ref={rigRef}>
      <SystemConnections
        mainCurve={mainCurve}
        aiCurve={aiCurve}
        flowRef={flowRef}
      />
      <BrowserApplication browserRef={browserRef} />
      <ServiceLayer serviceRef={serviceRef} />
      <AIEngine aiRef={aiRef} />
      <IntegrationLayer integrationRef={integrationRef} />
    </group>
  );
}

export default function SignalRig(props: SignalRigProps) {
  return (
    <Canvas
      tabIndex={-1}
      camera={{ position: [0, 0.25, 13.5], fov: 35, near: 0.1, far: 100 }}
      dpr={[1, 1.45]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      shadows="basic"
    >
      <ambientLight intensity={1.7} />
      <directionalLight
        castShadow
        position={[4, 6, 8]}
        intensity={3.7}
        color="#fffaf1"
      />
      <directionalLight position={[-5, 2, 5]} intensity={1.8} color="#bdc9ff" />
      <pointLight
        position={[3, -2, 6]}
        intensity={8}
        color={ORANGE}
        distance={9}
      />
      <Rig {...props} />
    </Canvas>
  );
}
