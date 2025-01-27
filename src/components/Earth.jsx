import { Html, useTexture } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState, lazy } from "react";
import { AdditiveBlending, DoubleSide, MathUtils, SRGBColorSpace, TextureLoader, Vector3 } from "three";
import { earthDistance } from "../utils/distances";

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


    const meshRef = useRef();
    const cloudsRef = useRef();


    // useFrame(() => {
    //     if (!meshRef.current) {
    //         return;
    //     }

    //     meshRef.current.rotation.y += 0.002;
    //     cloudsRef.current.rotation.y += 0.002;
    // });

    return (
        <group ref={meshRef} rotation-z={MathUtils.degToRad(-23.5)} position={[earthDistance, 0, 0]}>
            <Html>
                <div onClick={() => {
                    if (!meshRef.current) {
                        return;
                    }
                    console.log(Object.values(meshRef.current.position));
                    controls.target = new Vector3(...Object.values(meshRef.current.position));
                    camera.lookAt(Object.values(meshRef.current.position));
                }} className="text-xs m-2 tracking-[0.15em] glow hover:text-primary">EARTH</div>
            </Html>
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

        </group>
    )
}

export default Earth;