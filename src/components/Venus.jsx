import { useTexture } from "@react-three/drei";
import { venusDistance } from "../utils/distances";
import { AdditiveBlending, Vector3 } from "three";
import PlanetName from "./PlanetName";
import { useRef } from "react";
import { useThree } from "@react-three/fiber";

function Venus() {
    const [surface, atmosphere] = useTexture(["/2k_venus_surface.jpg", "2k_venus_atmosphere.jpg"]);
    const ref = useRef(null);
    const { controls } = useThree();

    function intoView(e) {

        if (!ref.current) {
            return;
        }

        controls.target = new Vector3(...Object(ref.current.position));
    }

    return (
        <group ref={ref} position={[venusDistance, 0, 0]}>
            <PlanetName intoView={intoView} name={"venus"} />
            <mesh>
                <icosahedronGeometry args={[2, 10]} />
                <meshStandardMaterial args={[2, 10]} map={surface} />
            </mesh>
            <mesh>
                <icosahedronGeometry args={[2, 10]} />
                <meshStandardMaterial args={[5, 10]} map={atmosphere} />

            </mesh>
        </group>
    )
}

export default Venus;