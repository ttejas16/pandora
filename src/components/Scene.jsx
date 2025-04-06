import { OrbitControls, TrackballControls, Stars } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";

import { planetRenderProperties } from "../utils/planetInfo";
import Planet from "./Planet";
import { MeshSurfaceSampler } from "three/examples/jsm/Addons.js";
import Particles from "./Particles";
import { useSpring, a } from "@react-spring/three";
import Camera from "./Camera";
import { Vector3 } from "three";

function Scene() {


    const [activeModel, setActiveModel] = useState(null);

    const focusedText = useRef(null);
    const focusedOrbit = useRef(null);
    const focusedPlanet = useRef(null);
    const { camera, controls } = useThree();

    function setFocsedPlanet(ref) {
        if (!ref) {
            return;
        }

        focusedPlanet.current = ref.current;
    }

    function setFocusedOrbit(ref) {
        if (!ref) {
            return;
        }

        if (focusedOrbit.current) {
            focusedOrbit.current.visible = true;
        }

        focusedOrbit.current = ref.current;
        focusedOrbit.current.visible = false;
    }

    function setFocusedText(ref) {
        if (!ref) {
            return;
        }

        if (focusedText.current) {
            focusedText.current.style.opacity = 1;
        }

        focusedText.current = ref.current;
        focusedText.current.style.opacity = 0;
    }

    useFrame(() => {
        if (focusedPlanet.current && camera && controls) {
            // controls.target.lerp(focusedPlanet.current.position, 0.1);
            const targetPos = focusedPlanet.current.position.clone();

            // Offset behind and above the target (e.g., camera 10 units back and 5 units up)
            const desiredPos = targetPos.clone().add(new Vector3(0, 5, 10));
            
            // controls.target.lerp(desiredPos, 0.1);
            camera.position.lerp(desiredPos, 0.1); // Smooth transition
            camera.lookAt(targetPos);
        }
    })

    return (
        <>
            <ambientLight intensity={1} />
            <Camera position={[4000, 5000, 9000]} />
            {/* <axesHelper args={[2000]} /> */}
            <TrackballControls onStart={() => {
                if (focusedPlanet.current) {
                    focusedPlanet.current = null;
                }

                if (!focusedText.current || !controls) {
                    return;
                }

                const distance = camera.position.distanceTo(controls.target);
                if (distance < 100) {
                    focusedText.current.style.opacity = 0;
                }
                else {
                    focusedText.current.style.opacity = 1;
                }

                if (focusedOrbit.current && distance < 100) {
                    focusedOrbit.current.visible = false;
                }
                else if (focusedOrbit.current) {
                    focusedOrbit.current.visible = true;
                }

            }} makeDefault rotateSpeed={2} minDistance={5} />
            {
                planetRenderProperties.map((info, index) => {
                    return <Planet
                        setActiveModel={setActiveModel}
                        setFocusedPlanet={setFocsedPlanet}
                        setFocusedOrbit={setFocusedOrbit}
                        setFocusedText={setFocusedText}
                        key={index}
                        map={info.map}
                        atmosphereMap={info.atmosphereMap}
                        radius={info.radius}
                        distanceFromSun={info.distanceFromSun}
                        name={info.name}
                        accentColor={info.accentColor}
                        revolutionSpeed={info.revolutionSpeed}
                        rotationSpeed={info.rotationSpeed}
                        initialPosition={info.initialPosition}
                    />
                })
            }
            <Stars radius={8000} count={1000} depth={100} factor={80} />
            <Particles />
        </>

    )
}

export default Scene;