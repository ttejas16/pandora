import { BookMarked, Image, NotebookPen, Pencil, Plus, SwatchBook, Trash2, Users } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getTopicUsers } from "../api/user";

function TopicView() {
    const { id } = useParams();
    const location = useLocation();
    const [topic, setTopic] = useState(location.state);
    const [topicUsers, setTopicUsers] = useState([]);

    async function fetchTopicUsers() {
        const { data, error } = await getTopicUsers(topic.topicId);
        if (error) {
            console.log(error);
            return;
        }

        setTopicUsers(data.users);
    }

    useEffect(() => {
        fetchTopicUsers();
    }, []);

    return (
        <div className="w-full h-screen flex justify-center py-3">

            <div className="w-[70%] h-full border-[1px] border-neutral-800 rounded-md flex gap-x-4">
                <div className="w-[350px] bg-neutral-950 h-full rounded-l-md border-r-[1px] border-neutral-800 overflow-y-auto">
                    <div className="px-8 py-4 flex gap-x-2 text-neutral-400 w-full justify-start items-center border-b-[1px] border-neutral-800">
                        <Users />
                        <div>Participants</div>
                    </div>
                    <div className="flex flex-col items-center justify-start">

                        {
                            topicUsers.map((user) => {
                                return (
                                    <div key={user.userId} className="flex gap-x-2 justify-start items-center text-sm border-b-[1px] border-neutral-900 w-full py-3 px-6">
                                        <div className="h-10 w-10 text-xs rounded-full bg-neutral-800 grid place-content-center">
                                            {user.username.split(" ").filter(w => w).map(w => w[0]).join("")}
                                        </div>
                                        <div className="text-sm">{user.username}</div>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>

                <div className="w-full h-full p-4 ">
                    <div className="border-b-[1px] border-neutral-800 h-[30%]">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="text-2xl flex items-center gap-x-2">
                                    <BookMarked className="text-primary" />{topic.topicName}
                                </div>
                                <div className="text-lg mt-2 text-neutral-400">{topic.topicSubtitle}</div>
                            </div>
                            <div className="flex items-center gap-x-2 mt-3">
                                {
                                    topic.isPublic ?
                                        <div className="rounded-full bg-sky-400 size-[12px]"></div> :
                                        <div className="rounded-full bg-yellow-400 size-[12px]"></div>
                                }
                                <span className="pr-2 text-sm text-neutral-300">{topic.isPublic ? "Public" : "Private"}</span>
                            </div>
                        </div>
                        <div className="flex py-4 w-full">
                            <div className="rounded-md flex justify-center items-center w-[40%] h-[150px] bg-primary/10">
                                <img src={"https://img.freepik.com/free-photo/galaxy-nature-aesthetic-background-starry-sky-mountain-remixed-media_53876-126761.jpg?t=st=1740856833~exp=1740860433~hmac=75e46630dc1412eeb97a9e4f105eb7c66003c323e34fc04e99cf1ab48093660d&w=1060"} alt="img" className="w-full h-full object-cover rounded-md" />
                            </div>
                            <div className="w-[60%] flex justify-end items-end px-6">
                                {
                                    topic.isOwner &&
                                    <Link
                                        to={`/topics/${topic.topicId}/add`}
                                        className="text-sm flex justify-center items-center gap-x-1 px-3 py-2 border-[1px] border-neutral-800 text-neutral-500 rounded-md">
                                        <Plus size={15} className="text-primary" />
                                        <div>
                                            Create Quiz
                                        </div>
                                    </Link>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 overflow-y-auto h-[70%] pr-3 py-3 gap-3">
                        {Array.from({ length: 10 }).map((_, index) => {
                            return <QuizCard key={index} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}


function QuizCard() {
    return (
        <div className="flex">
            <div className="w-full border-[1px] border-neutral-900 bg-neutral-950 rounded-md p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-xl font-semibold">Quiz Name</div>
                        <div className="text-sm text-neutral-300">Quiz Description</div>
                    </div>
                    <div className="flex gap-x-2 items-center">
                        <div className="rounded-full bg-rose-900 size-[10px]"></div>
                        <span className="text-neutral-300 text-sm">10 Questions</span>
                    </div>
                </div>
                <div className="mt-3 text-xs text-neutral-400">
                    Ends At 12-12-2024
                </div>
                <div className="flex justify-between items-end">
                    <button className="px-6 py-2 mt-8 bg-primary/60 rounded-md text-sm">
                        Take Quiz
                    </button>
                    <button className="rounded-md flex gap-x-1 text-xs justify-center items-center">
                        <Trash2 size={18} strokeWidth={2} />
                        {/* Delete Quiz */}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TopicView;