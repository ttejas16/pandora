import { Html, Line, useTexture } from "@react-three/drei";
import { AdditiveBlending, RingGeometry, SRGBColorSpace, Vector3 } from "three";
import { useThree } from "@react-three/fiber";
import { useRef } from "react";

function lookAt(ref, controls) {
    if (!ref.current) {
        return;
    }

    controls.target = new Vector3(...Object.values(ref.current.position))
}

function Planet({ map, atmosphereMap, distanceFromSun, radius, name, accentColor }) {

    const ref = useRef(null);
    const { controls } = useThree();
    const texture = useTexture(map.url);

    texture.colorSpace = SRGBColorSpace;
    texture.anisotropy = 8;

    return (
        <group ref={ref} position={[distanceFromSun, 0, 0]}>
            <Html>
                <div
                    onClick={(e) => lookAt(ref, controls)}
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