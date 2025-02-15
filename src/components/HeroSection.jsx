import { ChevronDown, MoveDown } from "lucide-react";
import Comets from "../assets/comets.png";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

function HeroSection() {
    return (
        <div className="w-full h-[100vh] flex flex-col justify-center items-center">
            <motion.img src={Comets} alt="comets image" className="w-full h-full absolute z-[1] object-cover"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }} />

            <motion.div
                initial={{ y: 100, }}
                animate={{ y: 0, opacity: [0, 1], animationTimingFunction: 'ease-in-out' }}
                transition={{ duration: 0.65, }}
                className="z-[2]">
                <h2 className="text-6xl font-medium bg-gradient-to-r from-primary to-rose-300 p-2 bg-clip-text text-transparent">
                    Solar System In A Creative Way
                </h2>
            </motion.div>
            <motion.div
                initial={{ y: 100, }}
                animate={{ y: 0, opacity: [0, 1], animationTimingFunction: 'ease-in-out' }}
                transition={{ duration: 0.65, delay: 0.2 }}
                className="z-[2]">
                <h4 className="text-2xl font-light text-neutral-200 mt-3 ">
                    Visualize • Compare • Learn
                </h4>
            </motion.div>

            <motion.div
                initial={{ y: 100, }}
                animate={{ y: 0, opacity: [0, 1], animationTimingFunction: 'ease-in-out' }}
                transition={{ duration: 0.65, delay: 0.3 }}
                className="z-[2]">
                <a href="#foo"
                    className="block animate-move-y text-primary bg-gray-300 p-4 rounded-full mt-6 
                bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border-[1px] border-neutral-600">
                    <ChevronDown size={30} className="hover:scale-75 transition-all" />
                </a>
            </motion.div>
        </div>
    )
}

export default HeroSection;