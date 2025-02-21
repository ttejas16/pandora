import { useEffect, useState } from "react"
import { modelContext } from "./modelContext"


function ModelProvider({ children }) {
    const [activeModel, setActiveModel] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        setIsLoading(true);
        // fetch
        setTimeout(() => setIsLoading(false), 3000);
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