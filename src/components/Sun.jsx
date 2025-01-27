import { Html, useTexture } from "@react-three/drei";
import { useFrame, useLoader, useThree, } from "@react-three/fiber"
import { Suspense, useRef } from "react";
import { TextureLoader, SRGBColorSpace, DoubleSide, MathUtils, Vector3 } from "three"
import { earthDistance, mercuryDistance, venusDistance } from "../utils/distances";

function Sun() {
    const [sunTexture] = useTexture(['/2k_sun.jpg'])
    const { controls } = useThree();

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
                <Html>
                    <div onClick={()=>{
                        if(!meshRef.current){
                            return;
                        }

                        controls.target = new Vector3(...Object(meshRef.current.position));

                    }} 
                    className="text-xs m-2 tracking-[0.15em] glow hover:text-primary">SUN</div>
                </Html>
                <mesh ref={meshRef} position={[0, 0, 0]}>
                    <icosahedronGeometry args={[1, 10]} />
                    <meshStandardMaterial
                        map={sunTexture}
                    />
                </mesh>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[earthDistance - 1, earthDistance, 64 * 6]} />
                    <meshBasicMaterial color={"#577BC1"} side={DoubleSide} />
                </mesh>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[mercuryDistance - 1, mercuryDistance, 64 * 6]} />
                    <meshBasicMaterial color={"#727D73"} side={DoubleSide} />
                </mesh>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[venusDistance - 1, venusDistance, 64 * 6]} />
                    <meshBasicMaterial color={"#FFE162"} side={DoubleSide} />
                </mesh>
            </group>
        </Suspense>
    )
}

export default Sun;