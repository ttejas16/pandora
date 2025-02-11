import { useTexture } from "@react-three/drei";
import { useRef } from "react";
import PlanetName from "./PlanetName";
import { marsDistance, uranusDistance } from "../utils/distances";
import { useThree } from "@react-three/fiber";
import { Vector3 } from "three";

function Uranus() {
    const ref = useRef();
    const [texture] = useTexture(["/2k_uranus.jpg"])
    const { controls } = useThree();

    function intoView(e) {

        if (!ref.current) {
            return;
        }

        controls.target = new Vector3(...Object(ref.current.position));
    }

    return (
        <group ref={ref} position={[uranusDistance, 0, 0]}>
            <PlanetName intoView={intoView} name={"uranus"} />
            <mesh>
                <icosahedronGeometry args={[2, 10]} />
                <meshStandardMaterial args={[2, 10]} map={texture} />
            </mesh>
        </group>
    )
}


export default Uranus;