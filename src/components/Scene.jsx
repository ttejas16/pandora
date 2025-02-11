import { OrbitControls, TrackballControls, Stars, Stats, ArcballControls, PerspectiveCamera, Line } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Earth from "./Earth";
import Sun from "./Sun";
import { useEffect, useRef, useState } from "react";
import { DoubleSide, EllipseCurve, MathUtils, Object3D, RingGeometry, Spherical, TorusGeometry, Vector3 } from "three";
import Mercury from "./Mercury";
import Venus from "./Venus";
import Mars from "./Mars";
import Jupiter from "./Jupiter";
import Uranus from "./Uranus";
import Neptune from "./Neptune";
import Saturn from "./Saturn";
import { planetRenderProperties } from "../utils/planetInfo";
import Planet from "./Planet";
// import Stars from "./Stars";

const radius = 500;

function Scene() {

    const controlsRef = useRef();

    useThree(({ camera, controls }) => {
        camera.position.y = 200;
        camera.position.z = 300;
        camera.position.x = -200;
        camera.far = 40000;
        camera.rotation.y = Math.PI / 2;
    });

    const curve = new EllipseCurve(0, 0, 10, 10, 0, 2 * Math.PI, false, 0);
    return (
        <>
            <ambientLight intensity={1} />
            {/* <axesHelper args={[2000]} /> */}
            <PerspectiveCamera makeDefault rotation={[40, 0, 0]} />
            <TrackballControls ref={controlsRef} makeDefault rotateSpeed={2} />
            {/* <Sun />
            <Earth />
            <Mercury />
            <Venus />
            <Mars/>
            <Jupiter/>
            <Saturn/>
            <Uranus/>
            <Neptune/> */}
            {
                planetRenderProperties.map((info, index) => {
                    return <Planet 
                                key={index}
                                map={info.map}
                                atmosphereMap={info.atmosphereMap}
                                radius={info.radius}
                                distanceFromSun={info.distanceFromSun}
                                name={info.name}
                                accentColor={info.accentColor}
                            />
                })
            }
            <Stars radius={8000} count={1000} depth={100} factor={80} />

            {/* <LineFromGeometry/> */}
            {/* <mesh ref={ref} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}></mesh> */}

        </>

    )
}



function LineFromGeometry() {
    // Create a geometry and extract its vertices
    const geometry = new TorusGeometry(2, 0.05, 16, 64);

    const g = new RingGeometry(100, 101, 64 * 6)

    const positions = g.attributes.position.array;

    // Convert positions into Vector3 points
    const points = [];
    for (let i = 0; i < positions.length; i += 3) {
        points.push(new Vector3(positions[i], positions[i + 1], positions[i + 2]));
    }

    return <Line points={points} color="white" lineWidth={2} />;
}

export default Scene;