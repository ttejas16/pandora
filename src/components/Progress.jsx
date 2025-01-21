import { motion } from "motion/react"
function Progress({ loading }){
    // console.log(loading);
    
    return(
        <div className="block">
            <p className={`p-2 text-lg ${loading < 100 ? "text-slate-200" : "text-primary"}`}>{loading}%</p>
            <div className="relative bg-neutral-700 w-[400px] h-[20px]">
                <motion.div 
                    initial={{ width:0 }}
                    animate={{ width:`${loading}%`}}
                    className="absolute h-full bg-primary">
                    
                </motion.div>
            </div>
        
        </div>
    )
}

export default Progress;