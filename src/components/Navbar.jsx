import { motion } from "motion/react";
import { Link } from "react-router-dom";

function Navbar() {

    return (
        <motion.div
            initial={{ y: -100, }}
            animate={{ y: 0, opacity: [0, 1], animationTimingFunction: 'ease-out' }}
            transition={{ duration: 0.3, delay:1.5}} 
            className="w-full fixed top-0 flex justify-center p-3 z-10">
                <div className="flex px-8 py-3 gap-36 items-center 
                bg-gray-300 rounded-full bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border-[1px] border-neutral-600">
                    <div className="text-xl font-medium text-primary">Pandora</div>
                    <div className="flex gap-3">
                        <Link to={"/"} className="py-1 px-2 hover:text-primary transition-all">Home</Link>
                        <button className="py-1 px-2 hover:text-primary transition-all">Learn</button>
                        <Link to={"/topics"} className="py-1 px-2 hover:text-primary transition-all">Topics</Link>
                        <Link to={"/login"} className="py-1 px-2 hover:text-primary transition-all">Login</Link>
                    </div>
                </div>
        </motion.div>
    )
}

export default Navbar;