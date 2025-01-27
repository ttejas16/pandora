import { OrbitControls, TrackballControls, Stars, Stats } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Earth from "./Earth";
import Sun from "./Sun";
import { useEffect, useRef } from "react";
import { DoubleSide, Vector3 } from "three";
import Mercury from "./Mercury";
import Venus from "./Venus";
// import Stars from "./Stars";

const radius = 500;

function Scene() {
    const { camera,controls } = useThree()

    
    useEffect(()=>{
        camera.position.y = 200;
        // camera.position.x = 200;
        camera.position.z = 300;
    },[]);


    camera.near = -Infinity;
    camera.far = 3500;;

    return (
        <>
            <ambientLight intensity={1} />
            <Stats/>
            <TrackballControls makeDefault rotateSpeed={2} rotation={[Math.PI]} />
            <Sun />
            <Earth />
            <Mercury />
            <Venus />
            <Stars radius={300} count={1000} />
        </>

    )
}

export default Scene;