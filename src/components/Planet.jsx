import { Html, Line, useTexture } from "@react-three/drei";
import { AdditiveBlending, RingGeometry, SRGBColorSpace, Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { config, useSpring, easings } from "@react-spring/three";
import { useModalContext } from "../hooks/modalContext";
function lookAt(ref, controls) {
  if (!ref.current) {
    return;
  }

  controls.target = new Vector3(...Object.values(ref.current.position))
}

function Planet({ map, atmosphereMap, distanceFromSun, radius, name, accentColor, setFocusedOrbit, setFocusedText, setActiveModal,
  revolutionSpeed, rotationSpeed
 }) {
  const modalContext = useModalContext();
  const ref = useRef(null);
  const textRef = useRef(null);
  const { camera, controls } = useThree();
  const s = useSpring({
    from: {
      position: [0, 0, 0]
    },
    to: {
      position: [0, 0, 0]
    }
  })
  const texture = useTexture(map.url);

  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 8;


  // useEffect(() => {
  //   if (name == 'Sun') {
  //     setFocusedOrbit(ref)
  //   }
  // }, []);

  // useFrame(({ clock }) => {
  //   const t = clock.getElapsedTime();
  //   ref.current.rotation.y += 0.001;
  //   ref.current.position.x = Math.cos(t * rotationSpeed) * distanceFromSun;
  //   ref.current.position.z = Math.sin(t * rotationSpeed) * distanceFromSun;
  // })

  return (
    <>
      {
        distanceFromSun &&
        <Orbit radius={distanceFromSun} accentColor={accentColor} />
      }
      <group ref={ref} position={[distanceFromSun, 0, 0]}>
        <Html ref={textRef}>
          <div
            onClick={(e) => {

              lookAt(ref, controls);
              

              s.position.start({
                from: {
                  position: camera.position.toArray()
                },
                to: {
                  position: [distanceFromSun - 10, 10, 10]
                },
                config: {
                  precision: 0.0001,
                  easing: easings.easeOutSine
                },
                onChange: (r) => {
                  camera.position.set(...r);
                },
                onRest: (e) => {
                  modalContext.setActiveModal(name);
                  setFocusedOrbit(null);
                  setFocusedText(textRef);
                }
              })

            }}
            // style={{ opacity: focus ? 0 : 1 }}   
            className="text-xs m-2 tracking-[0.15em] glow hover:text-primary no-select">
            {name?.toUpperCase()}
          </div>
        </Html>
        <mesh>
          <icosahedronGeometry args={[radius, 20]} />
          <meshStandardMaterial
            map={texture}
            blending={atmosphereMap?.additiveBlending ? AdditiveBlending : undefined}
          />
        </mesh>
        {
          atmosphereMap &&
          <Atmosphere
            url={atmosphereMap.url}
            radius={radius}
            blending={atmosphereMap.additiveBlending}
          />
        }

      </group>
    </>
  )
}

function Atmosphere({ url, blending, radius }) {
  const atmosphere = useTexture(url);

  return (
    <mesh>
      <icosahedronGeometry
        args={[radius, 20]}
      />
      <meshStandardMaterial
        map={atmosphere}
        blending={blending ? AdditiveBlending : undefined}
      />
    </mesh>
  )
}

function Orbit({ radius, accentColor }) {
  const ring = new RingGeometry(radius, radius, 64 * 6);
  const positions = ring.attributes.position.array;

  const points = [];
  for (let i = 0; i < positions.length; i += 3) {
    points.push([positions[i], positions[i + 1], positions[i + 2]]);
  }

  return <Line position={[0, 0, 0]} points={points} rotation={[Math.PI / 2, 0, 0]} color={accentColor} lineWidth={1} />
}


export default Planet;