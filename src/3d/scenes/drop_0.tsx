import React, { FC, Suspense, useEffect, useImperativeHandle, useMemo } from "react";
import * as THREE from "three";

import ModelSkate, {
  defaultSkateModelAnimation,
  ModelMetadataProps,
  SkateRefs,
  useSkateRefsLoader,
} from "../models/skate";
import LoaderScene from "../utils/loaderScene";
import { useFrame, useThree } from "@react-three/fiber";
import { useSceneStore } from "../hooks";

import {
  PerspectiveCamera,
  CameraControls,
  MeshTransmissionMaterial,
  ContactShadows,
  Environment,
  useProgress,
  Html,
} from "@react-three/drei";

export type sceneRef = ReturnType<typeof sceneFunctions>;
export type sceneRefType = React.MutableRefObject<sceneRef>;
const sceneFunctions = (
  refs: SkateRefs,
  camera: React.MutableRefObject<CameraControls>,
  props: ModelMetadataProps
) => ({
  ...refs,
  ...defaultSkateModelAnimation(refs, props),
  reset3DView() {
    camera.current?.setPosition(0, 40, -65, true);
  },
});

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html>
      <span className="canvas-load"></span>
      <p
        style={{
          fontSize: 14,
          color: "black",
          fontWeight: 800,
        }}
      >
        {progress.toFixed(2)}%
      </p>
    </Html>
  );
};

const DropSceneLoader: FC<ModelMetadataProps & { sceneRef: sceneRefType }> = React.memo(
  (props, ref) => {
    return (
      <LoaderScene>
        <Suspense fallback={<Loader />}>
          <DropScene {...props} />
        </Suspense>
      </LoaderScene>
    );
  }
);

const DropScene: FC<ModelMetadataProps & { sceneRef: sceneRefType }> = React.memo((props) => {
  const cameraControls = React.useRef<CameraControls>(null!);
  const refCam = React.useRef(null!);
  const { setLoaded } = useSceneStore();

  const refs = useSkateRefsLoader();
  useImperativeHandle(props.sceneRef, () => sceneFunctions(refs, cameraControls, props));

  const [rEuler, rQuaternion] = useMemo(() => [new THREE.Euler(), new THREE.Quaternion()], []);
  const { mouse, clock } = useThree();

  useFrame((state, delta) => {
    const t = clock.getElapsedTime();
    const ref = refs.groupRef.current as any;

    ref.rotation.z = (1 + Math.sin(t / 0.5)) / 90;
    ref.position.y = (1 + Math.sin(t / 0.6)) / 0.75;

    rEuler.set((-mouse.y * Math.PI) / 15, (mouse.x * Math.PI) / 15, 0);
    ref.quaternion.slerp(rQuaternion.setFromEuler(rEuler), 0.05);
  });

  useEffect(() => {
    (refCam.current as any).lookAt(0, 40, 0);
    setLoaded(true);
  }, []);

  return (
    <>
      <PerspectiveCamera ref={refCam} makeDefault position={[0, 40, 145]} fov={40} />
      <spotLight intensity={0.05} angle={0.15} penumbra={1} position={[300, 300, 300]} castShadow />
      <ambientLight intensity={0.95} />

      <group position={[0, 40, 0]}>
        <ModelSkate refs={refs} three={{ group: {} }} {...props} />
      </group>

      <ContactShadows
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0.25, -2.5, -0.5]}
        opacity={1}
        width={10}
        height={10}
        blur={1.5}
        far={15}
      />

      {/* <mesh {...props} castShadow receiveShadow>
        <icosahedronGeometry args={[10, 10]} />
      </mesh> */}

      {/* <ContactShadows scale={25} position={[0, -10, 0]} blur={5} opacity={1} /> */}
    </>
  );
});

export default DropSceneLoader;
