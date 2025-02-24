import { CalendarDays, Check, ListPlus } from "lucide-react";
import { div } from "motion/react-client";

function AddQuiz() {
    return (
        <div className="w-full h-screen flex flex-col justify-start items-center">
            <div className="rounded-md w-[40%] border-[1px] border-neutral-800 bg-neutral-950 px-8 pt-6 pb-8 my-4 border-dashed">

                <div className="flex justify-between items-end">
                    <div className="flex justify-start flex-col w-1/2">
                        <input
                            className="py-2 px-3 w-[70%]
                        placeholder:text-neutral-400
                        outline-none bg-inherit border-b-[1px] border-primary/60"
                            type="text"
                            placeholder="Quiz Title..."
                        />
                        <input
                            className="py-2 px-3
                        placeholder:text-neutral-400 mt-4
                        outline-none bg-inherit bg-inherit border-b-[1px] border-primary/60"
                            type="text"
                            placeholder="Quiz Description..."
                        />
                    </div>
                    <div className="flex gap-x-4 items-end justify-center">
                        <button className="text-yellow-700">
                            <ListPlus />
                        </button>
                        <button className="text-sky-600">
                            <CalendarDays />
                        </button>
                        <button className="text-lime-300">
                            <Check />
                        </button>
                    </div>
                </div>

            </div>
            <div className="w-[60%] rounded-md border-[1px] border-neutral-800 bg-neutral-950 mt-4 border-dashed">
                {
                    Array.from({ length:10 }).map((_, index) => {
                        return <Question key={index}/>
                    })
                }
            </div>
        </div>
    )
}

function DatePicker() {
    return (

        <div id="date-range-picker" date-rangepicker class="flex items-center">
            <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                </div>
                <input
                    id="datepicker-range-start"
                    name="start"
                    type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                    focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Select date start" />
            </div>
        </div>

    )
}


function Question() {
    return (
        <div className="border-b-[1px] border-dashed border-rose-200 p-6 px-10">
            <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-cyan-400">
                </div>
                <input
                    className="py-2 px-3 w-[70%]
                    placeholder:text-neutral-400
                    outline-none bg-inherit text-lg font-light tracking-wider"
                    type="text"
                    name=""
                    id=""
                    value={"What Would be the gravity of moon?"}
                />
            </div>
            <div className="flex flex-col mx-2 my-4 gap-y-4">
                <div className="flex gap-x-2 items-center">
                    <div className="border-[1px] border-primary rounded-full h-5 w-5 grid place-content-center">
                        <div className="bg-primary rounded-full h-3 w-3"></div>
                    </div>
                    <span>10000g</span>
                </div>
                <div className="flex gap-x-2 items-center">
                    <div className="border-[1px] border-primary rounded-full h-5 w-5 grid place-content-center">
                        <div className="bg-primary rounded-full h-3 w-3"></div>
                    </div>
                    <span>10g</span>
                </div>
                <div className="flex gap-x-2 items-center">
                    <div className="border-[1px] border-primary rounded-full h-5 w-5 grid place-content-center">
                        <div className="bg-primary rounded-full h-3 w-3"></div>
                    </div>
                    <span>1000g</span>
                </div>
                <div className="flex gap-x-2 items-center">
                    <div className="border-[1px] border-primary rounded-full h-5 w-5 grid place-content-center">
                        <div className="bg-primary rounded-full h-3 w-3"></div>
                    </div>
                    <span>1/6 of Earth's G</span>
                </div>
            </div>
        </div>
    )
}

export default AddQuiz;