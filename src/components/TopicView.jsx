import { BookMarked, Image, NotebookPen, Pencil, Plus, SwatchBook, Trash2, Users } from "lucide-react";
import { motion } from "motion/react";
import { Link, useParams } from "react-router-dom";

function TopicView() {
    const { id } = useParams();

    return (
        <div className="w-full h-screen flex justify-center py-3">

            <div className="w-[70%] h-full border-[1px] border-neutral-800 rounded-md flex gap-x-4">
                <div className="w-[350px] bg-neutral-950 h-full rounded-l-md border-r-[1px] border-neutral-800 overflow-y-auto">
                    <div className="px-8 py-4 flex gap-x-2 text-neutral-400 w-full justify-center items-center border-b-[1px] border-neutral-800">
                        <Users />
                        <div>Participants</div>
                    </div>
                    <div className="flex flex-col items-center justify-start">

                        {
                            Array.from({ length: 20 }).map((_, index) => {
                                return (
                                    <div key={index} className="flex gap-x-2 justify-center items-center text-sm border-b-[1px] border-neutral-900 w-full py-3">
                                        <div className="h-10 w-10 text-xs rounded-full bg-neutral-800 grid place-content-center">SW</div>
                                        <div className="text-sm">Splinter Wolf</div>
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
                                    <BookMarked className="text-primary" /> Topic Title
                                </div>
                                <div className="text-lg mt-2 text-neutral-400">Topic Subtitle</div>
                            </div>
                            <div className="flex items-center gap-x-2 mt-3">
                                <div className="rounded-full bg-sky-400 size-[12px]"></div>
                                <span className="pr-2 text-sm text-neutral-300">Public Topic</span>
                            </div>
                        </div>
                        <div className="flex py-4 w-full">
                            <div className="rounded-md flex justify-center items-center w-[40%] h-[150px] bg-primary/10">
                                <Image className="text-neutral-600 " />
                            </div>
                            <div className="w-[60%] flex justify-end items-end px-6">
                                <Link
                                    to={`/topics/${id}/add`}
                                    className="text-sm flex justify-center items-center gap-x-1 px-3 py-2 border-[1px] border-neutral-800 text-neutral-500 rounded-md">
                                    <Plus size={15} className="text-primary"/>
                                    <div>
                                        Create Quiz
                                    </div>
                                </Link>
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