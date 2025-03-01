import { useEffect, useState } from "react"
import { modelContext } from "./modelContext"


function ModelProvider({ children }) {
    const [activeModel, setActiveModel] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        if (!activeModel) {
            return;
        }
        setIsLoading(false);
    },[activeModel]);

    return (
        <modelContext.Provider value={{
            activeModel, setActiveModel,
            isLoading, setIsLoading
        }}>
            {children}
        </modelContext.Provider>
    )
}

export default ModelProvider;