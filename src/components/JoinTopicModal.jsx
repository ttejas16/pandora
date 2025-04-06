import { AnimatePresence, motion } from "motion/react";
import { createTopic, getThumbnails, joinTopic } from "../api/user";
import { useToast } from "../hooks/ToastProvider";
import SpinnerSmall from "./SpinnerSmall";
import { Clipboard, Image, RefreshCw, X } from "lucide-react";
import { useEffect, useState } from "react";

function JoinTopicModal({ visible, setVisibility, appendTopic }) {
    const [loading, setLoading] = useState(false);
    const [activeButton, setActiveButton] = useState("New");
    const [topicType, setTopicType] = useState("public");
    const [formData, setFormData] = useState({ title: null, subTitle: null });
    const [resultCode, setResultCode] = useState(null);
    const [topicCode, setTopicCode] = useState(null);
    const [thumbnailIndex, setThumbnailIndex] = useState(0);
    const [thumbnails, setThumbnails] = useState(null);
    // console.log(topicCode);
    const { showToast } = useToast();

    useEffect(() => {
        fetchThumbnails();
    }, []);

    async function fetchThumbnails() {
        const { data, error } = await getThumbnails();
        if (data) {
            setThumbnails(data.thumbnailUrls);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setResultCode(null);

        const { data, error } = await createTopic({
            ...formData,
            thumbnailUrl: thumbnails[thumbnailIndex],
            type: topicType
        });
        if (error) {
            console.log(error);
            return;
        }

        setTimeout(() => {
            setLoading(false);
            appendTopic(data);
            setResultCode(data.topicCode);

        }, 1500);
    }


    async function handleJoinTopic(e) {
        e.preventDefault();
        setLoading(true);
        setResultCode(null);

        const { data, error } = await joinTopic({ topicCode });
        if (error) {
            console.log(error);

            setTimeout(() => {
                setLoading(false);
                showToast({ title: error, type: "secondary" })
            }, 1500);
            return;
        }

        setTimeout(() => {
            setLoading(false);
            appendTopic(data);
            setVisibility();
            setResultCode(null);

        }, 1500);
    }

    return (

        <AnimatePresence>
            {
                visible &&
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, animationTimingFunction: "ease-out" }}
                    exit={{ opacity: 0 }}
                    className="absolute top-0 left-0 w-full h-screen flex justify-center items-center z-2">
                    <div onClick={setVisibility} className="absolute top-0 left-0 w-full h-screen z-2 bg-neutral-950 opacity-[0.7]"></div>

                    {/* actual modal */}
                    <div
                        className="w-full h-[600px] md:w-[700px] md:h-[650px] m-6 bg-neutral-900 z-10 rounded-md p-6 border-[1px] border-neutral-800">

                        <div className="flex justify-between">

                            <div className="w-max flex gap-x-2 p-2 rounded-lg">
                                <button
                                    onClick={() => setActiveButton("New")}
                                    className={`px-3 py-2 rounded-lg text-xs 
                                    ${activeButton == "New" ? "bg-primary/60" : "border-[1px] border-neutral-800"}`}>
                                    New Topic
                                </button>
                                <button
                                    onClick={() => setActiveButton("Join")}
                                    className={`px-3 py-2 rounded-md text-xs 
                                    ${activeButton != "New" ? "bg-primary/60" : "border-[1px] border-neutral-800"}`} >
                                    Join Topic
                                </button>
                            </div>
                            <button onClick={setVisibility}>
                                <X />
                            </button>
                        </div>

                        {
                            activeButton == "New" ?
                                <>
                                    <div className="px-4 py-6">
                                        <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">

                                            <div className="flex flex-col gap-y-2 text-sm w-full">
                                                <label htmlFor="username">
                                                    Topic Title
                                                </label>
                                                <input
                                                    onChange={(e) => setFormData({ ...formData, title: e.currentTarget.value })}
                                                    required
                                                    className="py-2 px-3 text-sm placeholder:text-neutral-400 
                                                    outline-none bg-neutral-900 border-[1px] border-neutral-700 rounded-md"
                                                    type="text"
                                                    name="topicName"
                                                    placeholder="All About Gravity... " />
                                            </div>
                                            <div className="flex flex-col gap-y-2 text-sm w-full">
                                                <label htmlFor="username">
                                                    Topic Subtitle
                                                </label>
                                                <input
                                                    onChange={(e) => setFormData({ ...formData, subTitle: e.currentTarget.value })}
                                                    required
                                                    className="py-2 px-3 text-sm placeholder:text-neutral-400
                                                    outline-none bg-neutral-900 border-[1px] border-neutral-700 rounded-md"
                                                    type="text"
                                                    name="topicSubtitle"
                                                    placeholder="Learn Everything about gravity... " />
                                            </div>

                                            <div className="">
                                                <label htmlFor="imageUrl" className="text-sm">Thumbnail</label>
                                                <input type="text" className="hidden" name="imageUrl" />
                                                <div className="relative rounded-md flex justify-center items-center w-full h-[150px] bg-primary/10 mt-1">
                                                    {
                                                        thumbnails ?
                                                            <img
                                                                src={thumbnails[thumbnailIndex]} alt="thumbnail_img"
                                                                className="w-full h-full object-cover rounded-md" />
                                                            :
                                                            <Image className="text-neutral-600 " />
                                                    }
                                                    <button
                                                        onClick={e => {
                                                            if (thumbnails) {
                                                                setThumbnailIndex((thumbnailIndex + 1) % thumbnails.length);
                                                            }
                                                        }}
                                                        type="button"
                                                        className="hover:rotate-90 duration-200 absolute -bottom-2 -right-2 
                                                            rounded-full border-[1px] border-neutral-800 bg-neutral-900 p-2">
                                                        <RefreshCw size={18} />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setTopicType("public")}
                                                    className={`text-xs px-3 py-2 rounded-l-md border-[1px] 
                                                    ${topicType == "public" ? "text-sky-300 border-sky-400" : "border-neutral-700"} `}>
                                                    Public
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setTopicType("private")}
                                                    className={`text-xs px-3 py-2 rounded-r-md border-[1px] 
                                                    ${topicType == "private" ? "text-yellow-200 border-yellow-600" : "border-neutral-700"} `}>
                                                    Private
                                                </button>
                                            </div>

                                            <button 
                                                disabled={loading} 
                                                type="submit" 
                                                className="bg-primary/60 rounded-md text-xs px-6 py-2 w-max align-end disabled:bg-primary/30">
                                                {loading ? <SpinnerSmall className="w-3 text-neutral-500 fill-neutral-200" /> : "Create Topic"}
                                            </button>
                                            {
                                                resultCode &&
                                                <div className="text-sm flex items-center">
                                                    <span>
                                                        Topic Code
                                                    </span>
                                                    <span
                                                        onClick={e => {
                                                            navigator.clipboard.writeText(e.currentTarget.textContent)
                                                            e.currentTarget.classList.add("text-lime-500");

                                                            setTimeout(() => {
                                                                e.target.classList.remove("text-lime-500");
                                                                console.log(e.target.classList);
                                                            }, 1000)
                                                        }}
                                                        className="mx-2 py-1 px-3 bg-neutral-700 rounded-md flex gap-x-2 cursor-pointer">
                                                        {resultCode}
                                                        <Clipboard size={18} />
                                                    </span>
                                                </div>
                                            }

                                        </form>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="px-4 py-6 flex justify-center">

                                        <form 
                                            onSubmit={handleJoinTopic} 
                                            className="mt-40 w-full sm:w-1/2 flex h-full flex-col text-sm md:text-normal 
                                            justify-center items-center gap-y-3">
                                            <label 
                                                htmlFor="topicCode" 
                                                className="text-lg font-light text-neutral-300">
                                                Use A Topic Code
                                            </label>
                                            <input
                                                onChange={e => setTopicCode(e.currentTarget.value)}
                                                required
                                                className="py-2 px-3 w-full placeholder:text-neutral-400
                                                outline-none bg-neutral-900 border-[1px] border-neutral-700 rounded-md"
                                                type="text"
                                                name="topicCode"
                                                placeholder="Enter code here" />
                                            <button 
                                                disabled={loading} 
                                                type="submit" 
                                                className="bg-primary/60 disabled:bg-primary/30 px-14 py-3 w-full 
                                                rounded-md text-sm flex justify-center">
                                                {loading ? <SpinnerSmall className="text-neutral-500 fill-neutral-200" /> : "Join Topic"}
                                            </button>
                                        </form>
                                    </div>
                                </>
                        }
                    </div>

                </motion.div>
            }
        </AnimatePresence>
    )
}

export default JoinTopicModal;