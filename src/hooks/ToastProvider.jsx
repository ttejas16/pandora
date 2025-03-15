import { CircleAlert, CircleCheckBig } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { createContext, useContext, useState } from "react";

const ToastContext = createContext(null);

const toastColors = {
    primary: "text-lime-400",
    secondary: "text-yellow-400",
    danger: "text-red-400",
}

const toastIcon = {
    primary: CircleCheckBig,
    secondary: CircleAlert,
    danger: CircleAlert,
}

function ToastProvider({ children }) {
    const [toast, setToast] = useState({ title: null, type: null });

    function showToast(toastObj) {
        // toastObj: { title,type }
        // if already toast exists cancel all next calls
        if (toast.title || toastObj == null) {
            return;
        }

        if (!Object.keys(toastColors).includes(toastObj.type)) {
            throw new Error("Invalid Toast type: ", toastObj.type);
        }

        setToast(toastObj);

        setTimeout(() => {
            setToast({ title: null, type: null });
        }, 2000);
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Toaster title={toast.title} type={toast.type} />
        </ToastContext.Provider>
    )
}

function useToast() {
    return useContext(ToastContext);
}


function Toaster({ title, type }) {

    const Icon = type ? toastIcon[type] : null;

    return (
        <AnimatePresence>
            {
                title &&
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-0 w-full mb-6 flex justify-center">
                    <div className="bg-neutral-950 border-[1px] border-neutral-900 rounded-md px-6 py-2 
                    text-xs flex justify-start items-center gap-x-2">
                        <Icon size={20} className={toastColors[type]} />
                        <span>{title}</span>
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    )
}

export { useToast, ToastProvider };