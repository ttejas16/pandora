import Progress from "./Progress";
import Spinner from "./Spinner";
import { AnimatePresence, motion } from "motion/react";

function InitialLoader({ loader, children }) {
    return (
        <AnimatePresence>
            {
                loader.isLoading ?
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        key="spinner" 
                        className="w-full h-screen flex justify-center items-center">
                        <Progress loading={loader.percentage} />
                    </motion.div> :
                    <>
                        {children}
                    </>
            }
        </AnimatePresence>
    )
}

export default InitialLoader;