function Error() {
    return (
        <div className="h-screen flex justify-center 
        text-neutral-100 text-xl
        items-center flex-col gap-y-2">
            <span className="text-2xl text-amber-400">
                404
            </span>
            <span>
                The page you're looking for doesn't exist!!
            </span>
        </div>
    )
}

export default Error;