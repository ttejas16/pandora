import { useTexture } from "@react-three/drei";
import { useFrame, useLoader, } from "@react-three/fiber"
import { Suspense, useRef } from "react";
import { TextureLoader, SRGBColorSpace } from "three"

function Sun() {
    const [sunTexture] = useTexture(['/2k_sun.jpg'])

    sunTexture.colorSpace = SRGBColorSpace;
    sunTexture.anisotropy = 8;

    const meshRef = useRef();

    // useFrame(() => {
    //     if (!meshRef.current) {
    //         return;
    //     }

    //     meshRef.current.rotation.y += 0.002;
    // });

    return (
        <Suspense fallback={<>loading..</>}>

            <group>
                <mesh ref={meshRef} position={[0, 0, 0]}>
                    <icosahedronGeometry args={[1, 10]} />
                    <meshStandardMaterial
                        map={sunTexture}
                    />
                </mesh>
            </group>
        </Suspense>
    )
}

export default Sun;