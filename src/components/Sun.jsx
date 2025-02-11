import { Html, useTexture } from "@react-three/drei";
import { useFrame, useLoader, useThree, } from "@react-three/fiber"
import { Suspense, useRef } from "react";
import { TextureLoader, SRGBColorSpace, DoubleSide, MathUtils, Vector3 } from "three"
import { earthDistance, mercuryDistance, neptuneDistance, venusDistance } from "../utils/distances";
import PlanetName from "./PlanetName";

function Sun() {
    const [sunTexture] = useTexture(['/2k_sun.jpg'])
    const { controls } = useThree();

    sunTexture.colorSpace = SRGBColorSpace;
    sunTexture.anisotropy = 8;

    const ref = useRef();

    function intoView(e) {

        if (!ref.current) {
            return;
        }

        controls.target = new Vector3(...Object(ref.current.position));
    }

    return (
        <Suspense fallback={<>loading..</>}>

            <group>
                <PlanetName intoView={intoView} name={"sun"}/>
                <mesh ref={ref} position={[0, 0, 0]}>
                    <icosahedronGeometry args={[1, 10]} />
                    <meshStandardMaterial
                        map={sunTexture}
                    />
                </mesh>
                
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[mercuryDistance - 1, mercuryDistance, 64 * 6]} />
                    <meshBasicMaterial color={"#727D73"} side={DoubleSide} />
                </mesh>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[venusDistance - 1, venusDistance, 64 * 6]} />
                    <meshBasicMaterial color={"#FFE162"} side={DoubleSide} />
                </mesh>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[neptuneDistance - 5, neptuneDistance, 64 * 6]} />
                    <meshBasicMaterial color={"#FFE162"} side={DoubleSide} />
                </mesh>
            </group>
        </Suspense>
    )
}

export default Sun;