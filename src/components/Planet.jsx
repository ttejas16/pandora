import { Html, Line, useTexture } from "@react-three/drei";
import { AdditiveBlending, RingGeometry, SRGBColorSpace, Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import TWEEN from "@tweenjs/tween.js";
import { config, useSpring,easings } from "@react-spring/three";

function lookAt(ref, controls) {
    if (!ref.current) {
        return;
    }

    controls.target = new Vector3(...Object.values(ref.current.position))
}

function compareTwo(v1, target) {
    return (
        v1.x <= target.x && v1.y <= target.y && v1.z <= target.z
    )
}

function zoomAt(target, camera) {
    const vector = {
        dx: target.x - camera.position.x,
        dy: target.y - camera.position.y,
        dz: target.z - camera.position.z,
    }

    const v = new Vector3(vector.dx, vector.dy, vector.dz);
    v.normalize()
    const stopPoint = {
        x: target.x - (v.x * 50),
        y: target.y - (v.y * 50),
        z: target.z - (v.z * 50),
    }

    v.multiplyScalar(50);


    // console.log(stopPoint);

    const id = setInterval(() => {

        if (compareTwo(camera.position, stopPoint)) {
            clearInterval(id);
            return;
        }

        camera.position.x += v.x;
        camera.position.y += v.y;
        camera.position.z += v.z;

        // camera.position.add(v);

    }, 10);
}

function Planet({ map, atmosphereMap, distanceFromSun, radius, name, accentColor }) {

    const ref = useRef(null);
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

    return (
        <group ref={ref} position={[distanceFromSun, 0, 0]}>
            <Html>
                <div
                    onClick={(e) => {
                        lookAt(ref, controls);
                        // zoomAt(controls.target, camera);
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
                            }
                        })

                    }}
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
                distanceFromSun &&
                <Orbit radius={distanceFromSun} accentColor={accentColor} />
            }
        </group>
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

    return <Line position={[-radius, 0, 0]} points={points} rotation={[Math.PI / 2, 0, 0]} color={accentColor} lineWidth={1} />
}


export default Planet;