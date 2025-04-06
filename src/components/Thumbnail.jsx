import { Image } from "lucide-react";
import { useState } from "react";

function Thumbnail({ url }) {
    const [loaded, setLoaded] = useState(false);
    return (
        <div className="rounded-md flex justify-center items-center w-full h-[150px] bg-primary/10 p-">
            {
                !loaded &&
                <Image className="text-neutral-600" />
            }
            <img
                src={url}
                onLoad={() => setLoaded(true)}
                alt="img"
                className={`w-full h-full object-cover rounded-md ${!loaded ? "hidden" : "block"}`}
            />
        </div>
    )
}

export default Thumbnail;