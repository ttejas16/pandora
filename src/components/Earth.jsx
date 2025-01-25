import { useTexture } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState, lazy } from "react";
import { AdditiveBlending, MathUtils, SRGBColorSpace, TextureLoader } from "three";

function Earth() {
    
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
        <group rotation-z={MathUtils.degToRad(-23.5)} position={[4, 0, 0]}>
            <mesh ref={meshRef} >
                <icosahedronGeometry args={[1, 10]} />
                <meshStandardMaterial
                    map={earthTexture} />
            </mesh>
            <mesh ref={cloudsRef}>
                <icosahedronGeometry args={[1, 10]} />
                <meshStandardMaterial map={earthCloudsTexture} blending={AdditiveBlending} bumpScale={1.5} />
            </mesh>
        </group>
    )
}

export default Earth;