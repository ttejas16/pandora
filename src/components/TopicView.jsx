import { BookMarked, ChartBar, ChartColumn, ChartColumnBig, ChartLine, ChartNoAxesCombined, Copy, Image, NotebookPen, Pencil, Plus, SwatchBook, Trash2, Users } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getTopicUsers } from "../api/user";
import { deleteTest, getTests } from "../api/test"; 
import SpinnerSmall from "./SpinnerSmall";

function TopicView() {
    const { id } = useParams();
    const location = useLocation();
    const [topic, setTopic] = useState(location.state);
    const [topicUsers, setTopicUsers] = useState([]);
    const [testLoading, setTestLoading] = useState(true);
    const [topicTests, setTopicTests] = useState([]);

    async function fetchTopicUsers() {
        const { data, error } = await getTopicUsers(topic.topicId);
        if (error) {
            console.log(error);
            return;
        }

        setTopicUsers(data.users);
    }

    async function fetchTopicTests() {
        const { data, error } = await getTests(topic.topicId);
        if (error) {
            console.log(error);
            return;
        }

        setTopicTests(data.tests);
        setTimeout(() => {
            setTestLoading(false);
        }, 1000);
    }

    async function handleDelete(testId) {
        setTestLoading(true);
        const { data, error } = await deleteTest(testId);
        if (error) {
            console.log(error);
            return;
        }

        setTopicTests(p => p.filter(t => t.testId != data.deletedTestId));
        setTimeout(() => {
            setTestLoading(false);
        }, 1000);
    }

    useEffect(() => {
        fetchTopicUsers();
        fetchTopicTests();
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
                                            {user.username.split(" ").filter(w => w).map(w => w[0].toUpperCase()).join("")}
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
                                <img src={topic.thumbnailUrl} alt="img" className="w-full h-full object-cover rounded-md" />
                            </div>
                            <div className="w-[60%] flex justify-end items-end px-6 gap-x-4">
                                <div
                                    onClick={async (e) => {
                                        const current = e.currentTarget;
                                        current.classList.add("border-sky-600");
                                        await navigator.clipboard.writeText(current.textContent);
                                        setTimeout(() => {
                                            current.classList.remove("border-sky-600");
                                        }, 1000);
                                    }}
                                    title="Copy Topic Code"
                                    className="text-sm text-neutral-400 flex gap-x-2 items-center 
                                    cursor-pointer border-[1px] rounded-md border-neutral-800 px-3 py-2">
                                    <Copy size={15} className="text-sky-600" />
                                    <span>
                                        {topic.topicCode}
                                    </span>
                                </div>
                                {
                                    topic.isOwner &&
                                    <Link
                                        to={`/topics/${topic.topicId}/add`}
                                        state={topic}
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
                    <div className="grid grid-cols-2 overflow-y-auto h-[70%] pr-3 py-3 gap-3 place-content-start">
                        {
                            testLoading &&
                            <div className="flex col-span-3 justify-center items-center mt-[25%]">
                                <SpinnerSmall className="text-neutral-700 fill-neutral-400" />
                            </div>
                        }
                        {
                            !testLoading && topicTests.length == 0 &&
                            <div className="flex col-span-3 justify-center items-center text-sm text-neutral-400 mt-[25%]">
                                Nothing has been posted yet!
                            </div>
                        }
                        {
                            !testLoading && topicTests.map((test, index) => {
                                return <QuizCard
                                    key={index}
                                    test={test}
                                    topicId={topic.topicId}
                                    handleDelete={handleDelete}
                                    isOwner={topic.isOwner}
                                />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


function QuizCard({ test, topicId, handleDelete, isOwner }) {
    return (
        <div className="flex h-max">
            <div className="w-full border-[1px] border-neutral-900 bg-neutral-950 rounded-md p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-xl font-semibold">{test.title}</div>
                        <div className="text-sm text-neutral-300">{test.description}</div>
                    </div>
                    <div className="flex gap-x-2 items-center">
                        <div className="rounded-full bg-rose-900 size-[10px]"></div>
                        <span className="text-neutral-300 text-sm">
                            {
                                test._count.questions > 1 ?
                                    `${test._count.questions} Questions` : `${test._count.questions} Question`
                            }
                        </span>
                    </div>
                </div>
                <div className="mt-3 text-xs text-neutral-400">
                    Ends At {test.endTime ? test.endTime.split("T")[0] : "NA"}
                </div>
                <div className="flex items-end">
                    {
                        !isOwner ? (
                            test.Submissions.length == 0 ?
                                <Link
                                    to={`/topics/${topicId}/t/${test.testId}`}
                                    state={test}
                                    className="px-6 py-2 bg-primary/60 rounded-md text-sm mt-8">
                                    Take Quiz
                                </Link> :
                                <span className="px-6 py-2 border-[1px] border-neutral-800 text-neutral-300 rounded-md text-sm mt-8">
                                    Submitted!
                                </span>
                        ) :
                            <div className="mt-8 ml-auto gap-x-4 flex">
                                <Link to={`/topics/${topicId}/analytics`} state={test}>
                                    <ChartColumn className="text-teal-500" size={18} strokeWidth={2} />
                                </Link>
                                <button onClick={e => handleDelete(test.testId)} className="rounded-md flex gap-x-1 text-xs justify-center items-center">
                                    <Trash2 size={18} strokeWidth={2} />
                                </button>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default TopicView;