import { createContext, useContext } from "react";

const modalContext = createContext(null);

function useModalContext(){
    return useContext(modalContext);
}

export {
    modalContext,
    useModalContext
}