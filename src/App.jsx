import { Suspense, useEffect, useRef, useState } from "react"
import Cursor from "./components/Cursor"
import HeroSection from "./components/HeroSection"
import InitialLoader from "./components/InitialLoader"
import Navbar from "./components/Navbar"
import { getRandomNumFrom } from "./utils/random"
import { Canvas, useFrame, useLoader, } from "@react-three/fiber"
import { Mesh, TextureLoader, MathUtils, AdditiveBlending, SRGBColorSpace, LoadingManager, AxesHelper } from "three"
import { motion } from "motion/react"
import { OrbitControls } from "@react-three/drei"

function Earth() {

    const earthTexture = useLoader(TextureLoader, "/earth_8k.jpg");
    const earthCloudsTexture = useLoader(TextureLoader, "/earth_clouds.jpg");

    earthTexture.colorSpace = SRGBColorSpace;
    earthTexture.anisotropy = 8;

    earthCloudsTexture.colorSpace = SRGBColorSpace;
    earthCloudsTexture.anisotropy = 8;

    const meshRef = useRef();
    const cloudsRef = useRef();

    useFrame(() => {
        if (!meshRef.current) {
            return;
        }

        meshRef.current.rotation.y += 0.002;
        cloudsRef.current.rotation.y += 0.002;
    });

    return (
        <Suspense fallback={<>loading..</>}>

            <group rotation-z={MathUtils.degToRad(-23.5)} position={[4, 0, 0]}>
                <mesh ref={meshRef} >
                    <icosahedronGeometry args={[1, 10]} />
                    <meshStandardMaterial map={earthTexture} />
                </mesh>
                <mesh ref={cloudsRef}>
                    <icosahedronGeometry args={[1, 10]} />
                    <meshStandardMaterial map={earthCloudsTexture} blending={AdditiveBlending} bumpScale={1.5} />
                </mesh>
            </group>
        </Suspense>

    )
}

function Sun() {

    const sunTexture = useLoader(TextureLoader, "/8k_sun.jpg");
    sunTexture.colorSpace = SRGBColorSpace;
    sunTexture.anisotropy = 8;

    const meshRef = useRef();

    useFrame(() => {
        if (!meshRef.current) {
            return;
        }

        meshRef.current.rotation.y += 0.002;
    });

    return (
        <Suspense fallback={<>loading..</>}>

            <group>
                <mesh ref={meshRef} position={[-4, 0, 0]}>
                    <icosahedronGeometry args={[1, 10]} />
                    <meshStandardMaterial
                        map={sunTexture}
                        color={"yellow"}
                        emissive={"yellow"}
                        emissiveIntensity={2}
                        roughness={0.5}
                        metalness={0.1}
                    />
                </mesh>
                <pointLight position={[-4, 0, 0]} args={[0xffffff, 100, 100]} />
                <pointLight
                    position={[0, 0, 0]}
                    intensity={1.5}  // Brightness of the sun's light
                    color="yellow"
                    decay={2} // Decay of the light as distance increases
                />
            </group>
        </Suspense>
    )
}
function App() {
    const [loader, setLoader] = useState({ isLoading: true, percentage: 0 });


    useEffect(() => {
        let id;
        console.log("here");

        if (!loader.isLoading) {
            return () => clearTimeout(id);
        }

        if (loader.percentage >= 100) {
            id = setTimeout(() => {

                setLoader((l) => {
                    return {
                        isLoading: false,
                        percentage: l.percentage
                    }
                });

            }, 2000);

            return () => { clearTimeout(id) };
        }

        id = setTimeout(() => {

            const r = getRandomNumFrom([10, 15, 20]);
            const inc = Math.min(r, 100 - loader.percentage);

            setLoader((l) => {
                return {
                    isLoading: l.isLoading,
                    percentage: l.percentage + inc
                }
            });

        }, 1000);

        return () => {
            clearTimeout(id);
        }

    }, [loader]);

    return (
        <InitialLoader loader={loader}>
            <div className="w-full flex flex-col items-center justify-center">
                <Cursor />
                <Navbar />
                <HeroSection />
                <motion.div className="w-full h-screen" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
                    <Canvas>
                        <OrbitControls />
                        <ambientLight intensity={0.2} />
                        {/* <directionalLight color={"white"} position={[-2, 1, 3]} intensity={2} /> */}
                        <Earth />
                        <Sun />
                        <primitive object={new AxesHelper(10)} />
                    </Canvas>
                </motion.div>
            </div>
        </InitialLoader>
    )
}

export default App
