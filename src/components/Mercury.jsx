import { useTexture } from "@react-three/drei"
import { mercuryDistance } from "../utils/distances";
import PlanetName from "./PlanetName";
import { useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Vector3 } from "three";

function Mercury() {
    const texture = useTexture("/2k_mercury.jpg");
    const { controls } = useThree();
    const ref = useRef(null);

    function intoView(e) {

        if (!ref.current) {
            return;
        }

        controls.target = new Vector3(...Object(ref.current.position));
    }

    return (
        <group ref={ref} position={[-mercuryDistance, 0, 0]}>
            <PlanetName intoView={intoView} name={"mercury"} />
            <mesh >
                <icosahedronGeometry args={[2, 10]} />
                <meshStandardMaterial map={texture} />
            </mesh>
        </group>
    )
}

export default Mercury;