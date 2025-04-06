import { isRouteErrorResponse, useRouteError } from "react-router-dom";

function Error() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <div className="h-screen flex justify-center items-center flex-col gap-y-2">
                <span className="text-lg text-neutral-200">
                    {error.status} {error.statusText}
                </span>
                <span className="text-sm text-neutral-400">
                    {
                        error.status == 404 &&
                        "The page you're looking for doesn't exist!!"
                    }
                </span>
            </div>
        )
    }

    return (
        <div className="h-screen flex justify-center items-center flex-col gap-y-2">
            <span className="text-lg text-neutral-200">
                A client side application error has occured.
            </span>
            <span className="text-sm text-neutral-400">
                See console for more info.
            </span>
        </div>
    )
}

export default Error;