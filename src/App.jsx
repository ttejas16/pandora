import HeroSection from "./components/HeroSection"
import Navbar from "./components/Navbar"
import { Canvas } from "@react-three/fiber"
import { useProgress } from "@react-three/drei"
import Scene from "./components/Scene"
import { motion, useInView } from "motion/react"
import ModelProvider from "./hooks/ModelProvider"
import InfoModel from "./components/InfoModel"
import Spinner from "./components/Spinner"

function App() {
    const { active, progress } = useProgress();


    return (
        <>
            <ModelProvider>
                <div id="header" className="w-full h-screen flex flex-col items-center justify-center">
                    {
                        progress < 100 ? <Spinner /> :
                            <>
                                <Navbar />
                                <HeroSection />
                            </>
                    }
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    viewport={{ once: true, amount: "all" }}
                    className="w-full h-screen relative">
                    <InfoModel />
                    <Canvas id="foo" resize={{ scroll: false }}>
                        <Scene />
                    </Canvas>
                </motion.div>
            </ModelProvider>
        </>
    )
}

export default App
