import { Suspense, useEffect, useRef, useState, lazy } from "react"
import Cursor from "./components/Cursor"
import HeroSection from "./components/HeroSection"
import InitialLoader from "./components/InitialLoader"
import Navbar from "./components/Navbar"
import { getRandomNumFrom } from "./utils/random"
import { Canvas } from "@react-three/fiber"
import Earth from "./components/Earth"
import Sun from "./components/Sun"
import { OrbitControls } from "@react-three/drei"
import { PerspectiveCamera } from "three"
import Scene from "./components/Scene"
import { motion, useInView } from "motion/react"

function App() {
    const [loader, setLoader] = useState({ isLoading: true, percentage: 0 });

    const ref = useRef(null);
    const isInView = useInView(ref, { amount: "some", once: false });

    useEffect(() => {
        console.log("element is in view" + isInView);

    }, [isInView]);

    useEffect(() => {
        let id;

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
        <>
            <InitialLoader loader={loader}>
                <div className="w-full flex flex-col items-center justify-center">
                    <Cursor />
                    <Navbar />
                    <HeroSection />
                </div>
                <motion.div
                    className="w-full h-screen">
                    <Canvas id="foo" resize={{ scroll: false }}>
                        <Scene />
                    </Canvas>
                </motion.div>
            </InitialLoader>
        </>
    )
}

export default App
