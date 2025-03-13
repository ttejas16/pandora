import { LogOut, User } from "lucide-react";
import { useAuthContext } from "../hooks/authContext";

function ProfileMenu() {
    const authContext = useAuthContext();

    return (
        <div className="absolute bottom-[-160px] right-0 bg-neutral-900 
        border-[1px] border-neutral-800
        rounded-md text-xs text-neutral-300 flex flex-col h-[150px] w-[150px]">
            <span className="flex items-center justify-start gap-x-2 px-4 py-3 border-b-[1px] border-neutral-700">
                <User size={15} className="text-sky-400" />
                {authContext.user.username}
            </span>
            <button onClick={(e) => authContext.logoutUser()} className="flex items-center justify-start gap-x-2 px-4 py-3 border-b-[1px] border-neutral-700">
                <LogOut size={15} className="text-sky-400" />
                Logout
            </button>
        </div>
    )
}

export default ProfileMenu;