import { joinTopic } from "../api/user";
import { useToast } from "../hooks/ToastProvider";
import SpinnerSmall from "./SpinnerSmall";
import { useState } from "react";
import Thumbnail from "./Thumbnail";

function SearchTopicCard({ topic }) {
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);

    async function handleClick(e) {
        setLoading(true);

        const { data, error } = await joinTopic({ topicCode: topic.topicCode });
        if (error) {
            console.log(error);
            setTimeout(() => {
                showToast({ title: error, type: "secondary" });
                setLoading(false);
            }, 1000);
            return;
        }

        setTimeout(() => {
            showToast({ title: "Topic Joined!", type: "primary" });
            setLoading(false);
        }, 1000);
    }

    return (
        <div className="rounded-md bg-neutral-950 p-4">
            <div className="rounded-t-md w-full flex flex-col bg-neutral-950 gap-y-1 pl-2 pt-2">
                <p className="text-2xl">{topic.topicName}</p>
                <p className="text-sm text-neutral-300">{topic.topicSubtitle}</p>
            </div>

            <div className="py-3">
                <Thumbnail url={topic.thumbnailUrl} />
            </div>

            <div className="flex justify-between items-center gap-y-2">
                <button
                    disabled={loading}
                    onClick={handleClick}
                    className="border-[1px] border-neutral-800 px-6 py-2 text-center rounded-md text-sm">
                    {loading ? <SpinnerSmall className="text-neutral-600 fill-sky-400" /> : "Join Topic"}
                </button>
                {
                    <div className="flex items-center gap-x-2">
                        {
                            topic.isPublic ?
                                <div className="rounded-full bg-sky-400 size-[10px]"></div> :
                                <div className="rounded-full bg-yellow-400 size-[10px]"></div>
                        }
                        <span className="pr-2">{topic.isPublic ? "Public" : "Private"}</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default SearchTopicCard;