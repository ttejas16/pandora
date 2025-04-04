import HeroSection from "./components/HeroSection"
import Navbar from "./components/Navbar"
import { Canvas } from "@react-three/fiber"
import { useProgress } from "@react-three/drei"
import Scene from "./components/Scene"
import { motion, useInView } from "motion/react"
import ModalProvider from "./hooks/ModalProvider"
import InfoModal from "./components/InfoModal"
import Spinner from "./components/Spinner"
import AuthProvider from "./hooks/AuthProvider"
import { useAuthContext } from "./hooks/authContext"
import { useRef } from "react"

function App() {
    const { active, progress } = useProgress();
    const authContext = useAuthContext();
    // console.log(authContext.loading);
    const ref = useRef();

    return (
        <>
            {/* <AuthProvider> */}
                <ModalProvider>
                    <div className="w-full h-screen flex flex-col items-center justify-center">
                        {
                            ((progress < 100) || authContext.loading) ? <Spinner /> :
                                <>
                                    <Navbar />
                                    <HeroSection scrollIntoView={() => {
                                        if (ref.current) {
                                            ref.current.scrollIntoView()
                                        }
                                    }}/>
                                </>
                        }
                    </div>
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 2 }}
                        viewport={{ once: true, amount: "all" }}
                        className="w-full h-screen relative">
                        <InfoModal />
                        <Canvas resize={{ scroll: false }}>
                            <Scene />
                        </Canvas>
                    </motion.div>
                </ModalProvider>
            {/* </AuthProvider> */}
        </>
    )
}

export default App
