import { Html, Line, useTexture } from "@react-three/drei";
import { AdditiveBlending, RingGeometry, SRGBColorSpace, Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { config, useSpring, easings } from "@react-spring/three";
import { useModalContext } from "../hooks/modalContext";
import { DoubleSide } from "three/src/constants.js";
function lookAt(ref, controls) {
  if (!ref.current) {
    return;
  }

  controls.target = new Vector3(...Object.values(ref.current.position))
}

function Planet({ map, atmosphereMap, distanceFromSun, radius, name, accentColor, setFocusedOrbit, setFocusedText, setFocusedPlanet, setActiveModal,
  revolutionSpeed, rotationSpeed, initialPosition, ring
}) {
  const modalContext = useModalContext();
  const ref = useRef(null);
  const textRef = useRef(null);
  const orbitRef = useRef(null);
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

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.y += 0.001;
    // ref.current.position.x = Math.cos(t * rotationSpeed) * distanceFromSun;
    // ref.current.position.z = Math.sin(t * rotationSpeed) * distanceFromSun;
  })

  return (
    <>
      {
        distanceFromSun &&
        <Orbit ref={orbitRef} radius={distanceFromSun} accentColor={accentColor} />
      }
      <group ref={ref} position={initialPosition}>
        <Html ref={textRef} className="transition-opacity duration-150">
          <div
            onClick={(e) => {

              lookAt(ref, controls);

              const objectPosition = new Vector3(); // Your object's current world position
              ref.current.getWorldPosition(objectPosition); // Get the object's world position

              const fromPosition = camera.position.clone();

              const direction = new Vector3().subVectors(objectPosition, fromPosition).normalize();

              const unitsToward = 10;
              const nearPoint = new Vector3().copy(objectPosition).addScaledVector(direction, -unitsToward);

              s.position.start({
                from: {
                  position: camera.position.toArray()
                },
                to: {
                  // position: [distanceFromSun - 10, 10, 10]
                  position: [nearPoint.x, nearPoint.y, nearPoint.z]
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
                  if (distanceFromSun) {
                    setFocusedOrbit(orbitRef);
                    setFocusedPlanet(ref);
                  }
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
        {
          ring && 
          <TexturedRing url={ring.url}/>
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

const Orbit = forwardRef(function ({ radius, accentColor }, ref) {
  const ring = new RingGeometry(radius, radius, 64 * 6);
  const positions = ring.attributes.position.array;

  const points = [];
  for (let i = 0; i < positions.length; i += 3) {
    points.push([positions[i], positions[i + 1], positions[i + 2]]);
  }

  return <Line ref={ref} position={[0, 0, 0]} points={points} rotation={[Math.PI / 2, 0, 0]} color={accentColor} lineWidth={1} />
})

function TexturedRing({ url }) {

  const [ring] = useTexture([url]);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    var pos = ref.current.attributes.position;
    var v3 = new Vector3();
    for (let i = 0; i < pos.count; i++) {
      v3.fromBufferAttribute(pos, i);
      ref.current.attributes.uv.setXY(i, v3.length() < 4 ? 0 : 1, 1);
    }

  }, []);

  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry ref={ref} args={[3, 5, 32 * 3]} />
      <meshStandardMaterial side={DoubleSide} map={ring} />
    </mesh>
  )

}
export default Planet;