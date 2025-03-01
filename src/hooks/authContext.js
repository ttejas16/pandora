import { createContext, useContext } from "react";

const authContext = createContext(null);

function useAuthContext(){
    return useContext(authContext);
}

export {
    authContext,
    useAuthContext
}
