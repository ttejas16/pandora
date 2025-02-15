import { OrbitControls, TrackballControls, Stars, Stats, ArcballControls, PerspectiveCamera, Line } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Earth from "./Earth";
import Sun from "./Sun";
import { useEffect, useRef, useState } from "react";
import { DoubleSide, EllipseCurve, Float32BufferAttribute, MathUtils, Mesh, Object3D, RingGeometry, Spherical, TorusGeometry, Vector3 } from "three";
import Mercury from "./Mercury";
import Venus from "./Venus";
import Mars from "./Mars";
import Jupiter from "./Jupiter";
import Uranus from "./Uranus";
import Neptune from "./Neptune";
import Saturn from "./Saturn";
import { planetRenderProperties } from "../utils/planetInfo";
import Planet from "./Planet";
import { MeshSurfaceSampler } from "three/examples/jsm/Addons.js";
import Particles from "./Particles";
import { useSpring,a } from "@react-spring/three";
// import Stars from "./Stars";

function Scene() {

    const controlsRef = useRef();

    useThree(({ camera, controls }) => {
        camera.position.y = 5000;
        camera.position.z = 9000;
        camera.position.x = 4000;
        camera.far = 40000;
        if (controls) {
            controls.minDistance = 5;
        }
        
    });

    return (
        <>
            <ambientLight intensity={1} />
            {/* <axesHelper args={[2000]} /> */}
            <PerspectiveCamera makeDefault/>
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
            <Particles />
        </>

    )
}

export default Scene;