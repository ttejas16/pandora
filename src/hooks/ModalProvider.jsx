import { useEffect, useState } from "react"
import { modalContext } from "./modalContext"


function ModalProvider({ children }) {
    const [activeModal, setActiveModal] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        if (!activeModal) {
            return;
        }
        setIsLoading(false);
    },[activeModal]);

    return (
        <modalContext.Provider value={{
            activeModal, setActiveModal,
            isLoading, setIsLoading
        }}>
            {children}
        </modalContext.Provider>
    )
}

export default ModalProvider;