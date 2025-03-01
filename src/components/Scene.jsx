import { OrbitControls, TrackballControls, Stars } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";

import { planetRenderProperties } from "../utils/planetInfo";
import Planet from "./Planet";
import { MeshSurfaceSampler } from "three/examples/jsm/Addons.js";
import Particles from "./Particles";
import { useSpring, a } from "@react-spring/three";
import Camera from "./Camera";

function Scene() {
    

    const [activeModel, setActiveModel] = useState(null);

    const focusedOrbit = useRef(null);
    const { camera, controls } = useThree();
    function setFocusedOrbit(ref) {
        if (!ref) {
        }

        return;
        focusedOrbit.current.visible = true;
        focusedOrbit.current = ref.current;
    }


    // useFrame(() => {
    //     if (!focusedOrbit.current) {
    //     }
    //     return;

    //     if (camera.position.x < 100 || camera.position.y < 100 || camera.position.z < 100) {
    //         focusedOrbit.current.visible = false;
    //     }
    //     else {
    //         focusedOrbit.current.visible = true;
    //     }
    // })

    return (
        <>
                <ambientLight intensity={1} />
                <Camera position={[4000, 5000, 9000]} />
                {/* <axesHelper args={[2000]} /> */}
                <TrackballControls onStart={() => {
                    console.log("zoom");
                    
                }} makeDefault rotateSpeed={2} minDistance={5} />
                {
                    planetRenderProperties.map((info, index) => {
                        return <Planet
                            setActiveModel={setActiveModel}
                            setFocusedOrbit={setFocusedOrbit}
                            key={index}
                            map={info.map}
                            atmosphereMap={info.atmosphereMap}
                            radius={info.radius}
                            distanceFromSun={info.distanceFromSun}
                            name={info.name}
                            accentColor={info.accentColor}
                            revolutionSpeed={info.revolutionSpeed}
                            rotationSpeed={info.rotationSpeed}
                        />
                    })
                }

                {/* <Foo/> */}
                <Stars radius={8000} count={1000} depth={100} factor={80} />
                <Particles />
        </>

    )
}

export default Scene;