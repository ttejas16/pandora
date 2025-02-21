import { PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react"

function Camera({ position }) {
    const ref = useRef();
    const set = useThree((state) => state.set);
    useEffect(() => {
        set({ camera: ref.current });
    }, []);
    useFrame(() => {
        ref.current.updateWorldMatrix();
    });

    return <PerspectiveCamera
        makeDefault
        args={[75, window.innerWidth / window.innerHeight, 0.1, 1000]}
        ref={ref}
        position={position}
        fov={75}
        near={0.1}
        far={40000} />
}

export default Camera;