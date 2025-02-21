import { createContext, useContext } from "react";

const modelContext = createContext(null);

function useModelContext(){
    return useContext(modelContext);
}

export {
    modelContext,
    useModelContext
}