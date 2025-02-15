import { animated, useSpring, a } from "@react-spring/three";
import { Html, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "motion/react";
import { useState } from "react";
import { BufferGeometry, Float32BufferAttribute, MeshBasicMaterial, MeshStandardMaterial, RingGeometry, Vector3 } from "three";
import { randFloatSpread } from "three/src/math/MathUtils.js";


const ring = new RingGeometry(100, 150, 64 * 6)
const verticesLength = ring.attributes.position.count;
const vertices = [];

for (let i = 0; i < 100; i++) {

    const x = 100 * Math.random();
    const y = 0;
    const z = 100 * Math.random();

    vertices.push(x, y, z);
}


function getRandomPointsOnRing(R, r, count = 10000) {
    const res = [];

    new Array(count).fill(0).map(p => {
        let rand = Math.random();
        let radius = Math.sqrt(R * R * rand + (1 - rand) * r * r);
        const arr = new Vector3().setFromSphericalCoords(radius, Math.PI * 0.5, Math.random() * 2 * Math.PI);
        res.push(arr.x, arr.y, arr.z);
    });

    return res;
}

const arr = getRandomPointsOnRing(6200, 6400);

// const AnimatedMeshBasicMaterial = animated(MeshStandardMaterial);

function Particles() {
    const [hover, setHovered] = useState(false);
    const springs = useSpring({
        opacity: hover ? 0.15 : 0,
        config: { duration: 300 }
    })
    const geometry = new BufferGeometry();

    geometry.setAttribute('position', new Float32BufferAttribute(arr, 3));

    return (
        <group>
            <Html position={[6200, 0, 0]}>
                <div
                    style={{
                        opacity: hover ? 1 : 0
                    }}
                    className="text-xs m-2 tracking-[0.15em] no-select w-max duration-500">
                    Main Asteroid Belt
                </div>
            </Html>
            <mesh
                rotation={[Math.PI / 2, 0, 0]}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}>
                <torusGeometry args={[6300, 200, 16, 200]} />
                <a.meshBasicMaterial color={"#727D73"} transparent={true} opacity={springs.opacity} />
            </mesh>
            <points args={[geometry]}>
                <pointsMaterial size={10} color={"#4C585B"} />
            </points>
        </group>
    );
};


export default Particles;