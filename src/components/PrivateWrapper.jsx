import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/authContext";
import Spinner from "./Spinner";

function PrivateWrapper() {
    const authContext = useAuthContext();

    if (authContext.loading) {
        return (
            <div className="w-full h-screen flex flex-col items-center justify-center">
                <Spinner />
            </div>
        )
    }

    return (
        authContext.user ? <Outlet /> : <Navigate to={"/login"} />
    )
}

export default PrivateWrapper;