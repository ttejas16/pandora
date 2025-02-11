import { useTexture } from "@react-three/drei";
import { useRef } from "react";
import PlanetName from "./PlanetName";
import { jupiterDistance } from "../utils/distances";
import { useThree } from "@react-three/fiber";
import { Vector3 } from "three";

function Jupiter() {
    const ref = useRef();
    const [texture] = useTexture(["/2k_jupiter.jpg"])
    const { controls } = useThree();

    function intoView(e) {

        if (!ref.current) {
            return;
        }
        
        controls.target = new Vector3(...Object(ref.current.position));
    }

    return (
        <group ref={ref} position={[jupiterDistance, 0, 0]}>
            <PlanetName intoView={intoView} name={"jupiter"} />
            <mesh>
                <icosahedronGeometry args={[4, 10]} />
                <meshStandardMaterial args={[4, 10]} map={texture}/>
            </mesh>
        </group>
    )
}


export default Jupiter;