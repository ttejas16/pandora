import { useEffect, useState } from "react"
import { authContext } from "./authContext"
import { getUser, logout } from "../api/auth";

function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    // console.log(user);


    async function fetchUser() {
        const { data, error } = await getUser();

        if (error) {
            console.log(error);
        }
        else {
            setUser(data);
        }

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }

    async function logoutUser() {
        setLoading(true);

        const { error } = await logout();
        if (error) {
            console.log(error);
            setLoading(false);
            return;
        }

        setTimeout(() => {
            setUser(null);
            setLoading(false);
        }, 1000);
    }

    useEffect(() => {
        // fetch user here
        fetchUser();
    }, []);

    return (
        <authContext.Provider value={{ user, setUser, loading, setLoading, logoutUser }}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider;