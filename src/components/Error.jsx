import { CircleAlert } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

function Error({ msg }) {
    return (
        <AnimatePresence>
            {
                msg &&
                <motion.div
                    exit={{ height:"0px", opacity:0 }}
                    initial={{ height: "0px", opacity: 0 }}
                    animate={{ height: "auto", animationTimingFunction: "ease-in-out", opacity: 1 }}
                    className="flex gap-x-1 text-red-500 font-light tracking-wide">
                    <CircleAlert size={20} strokeWidth={2} />
                    <span>Invalid credentials!</span>
                </motion.div>
            }
        </AnimatePresence>
    )
}

export default Error;