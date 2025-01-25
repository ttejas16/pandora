import { OrbitControls, TrackballControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Earth from "./Earth";
import Sun from "./Sun";
import { useEffect, useRef } from "react";
import { DoubleSide, Vector3 } from "three";

function Scene() {
    const { camera } = useThree()
    camera.position.z = 100;

    return (
        <>
            <ambientLight intensity={1} />
            <TrackballControls rotateSpeed={2}/>
            <Earth />
            {/* <Sun /> */}
            <mesh>
                <ringGeometry args={[3.95, 4, 64]} />
                <meshBasicMaterial color={"hotpink"}/>
            </mesh>
            <mesh>
                <ringGeometry args={[40, 41, 64]} />
                <meshBasicMaterial color={"hotpink"} side={DoubleSide}/>
            </mesh>
        </>

    )
}

export default Scene;