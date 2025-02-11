import { Html, Line, useTexture } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState, lazy } from "react";
import { AdditiveBlending, DoubleSide, MathUtils, SRGBColorSpace, TextureLoader, Vector3 } from "three";
import { earthDistance } from "../utils/distances";
import PlanetName from "./PlanetName";
import { Line2 } from "three/examples/jsm/lines/webgpu/Line2.js";
import { LineGeometry, LineMaterial } from "three/examples/jsm/Addons.js";

const positionFromSunX = 143;

function Earth() {
    const { camera, controls } = useThree();
    const [earthTexture, earthCloudsTexture] = useTexture([
        '/2k_earth.jpg',
        '/2k_earth_clouds.jpg',
    ])

    // useEffect(() => {
    earthTexture.colorSpace = SRGBColorSpace;
    earthTexture.anisotropy = 8;

    earthCloudsTexture.colorSpace = SRGBColorSpace;
    earthCloudsTexture.anisotropy = 8;
    // }, []);


    const ref = useRef();
    const cloudsRef = useRef();


    function intoView(e) {

        if (!ref.current) {
            return;
        }

        controls.target = new Vector3(...Object(ref.current.position));
    }

    return (
        <group ref={ref} position={[earthDistance, 0, 0]}>
            <PlanetName intoView={intoView} name={"Earth"} />
            <mesh>
                <icosahedronGeometry args={[1, 10]} />
                <meshStandardMaterial
                    map={earthTexture} />
            </mesh>
            <mesh>
                <icosahedronGeometry args={[1, 10]} />
                <meshStandardMaterial
                    map={earthCloudsTexture} blending={AdditiveBlending} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[-earthDistance, 0, 0]}>
                {/* <ringGeometry args={[earthDistance - 1, earthDistance, 64 * 6]} /> */}
                <torusGeometry args={[earthDistance - 1, 0.2, 30, 64 * 6]} />

                <meshBasicMaterial fog={false} color={"#577BC1"} side={DoubleSide} />
            </mesh>
        </group>
    )
}

export default Earth;