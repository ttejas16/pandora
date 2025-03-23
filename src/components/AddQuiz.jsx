import { CalendarDays, Check, CheckCheck, ListPlus, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { div } from "motion/react-client";
import { useCallback, useEffect, useRef, useState } from "react";
import { createTest } from "../api/user";
import { useLocation, useNavigate } from "react-router-dom";
import SpinnerSmall from "./SpinnerSmall";
import DatePicker from "./DatePicker";
import DatePickerButton from "./DatePicker";
import { useToast } from "../hooks/ToastProvider";

const emptyQuestion = { question: null, options: [null, null, null, null], correctOption: null };

const initialQuestions = [
    { question: null, options: [null, null, null, null], correctOption: null },
    { question: null, options: [null, null, null, null], correctOption: null },
]

function AddQuiz() {
    const { showToast } = useToast()
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [testData, setTestData] = useState({ title: null, description: null, date: null });
    const [questions, setQuestions] = useState(initialQuestions);

    const updateQuestion = useCallback((questionIndex, newQuestion) => {
        setQuestions(p => {
            return p.map((q, index) => {
                if (index == questionIndex) {
                    return { ...q, question: newQuestion }
                }

                return q;
            })
        })
    }, [questions]);

    const updateOption = useCallback((questionIndex, optionIndex, newOption) => {
        setQuestions(p => {
            return p.map((q, index) => {
                if (index == questionIndex) {
                    const newMappedOptions = q.options.map((o, oIndex) => {
                        if (oIndex == optionIndex) {
                            return newOption;
                        }
                        return o;
                    })

                    return { ...q, options: newMappedOptions }
                }

                return q;
            })
        })
    }, [questions]);

    const setCorrectOption = useCallback((questionIndex, correctOption) => {
        setQuestions(p => {
            return p.map((q, index) => {
                if (index == questionIndex) {
                    return { ...q, correctOption: correctOption }
                }

                return q;
            })
        })
    }, [questions]);

    const addQuestion = useCallback(() => {
        setQuestions(p => {
            return [...p, structuredClone(emptyQuestion)]
        })
    }, [questions]);

    const deleteQuestion = useCallback((questionIndex) => {
        setQuestions(questions.filter((_, index) => questionIndex != index));
    }, [questions]);

    async function handleSubmit(e) {
        e.preventDefault();
        if (questions.length == 0) {
            showToast({ title: "Please enter atleast one question!", type: "secondary" });
            return;
        }

        setLoading(true);
        const { error } = await createTest(location.state.topicId, testData.title, testData.date, testData.description, questions);
        if (error) {
            console.log(error);
            return;
        }

        setTimeout(() => {
            setLoading(false);
            navigate(`/topics/${location.state.topicId}`, { replace: true, state: location.state });
        }, 1000);

    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="w-full h-screen flex flex-col justify-start items-center pb-36 overflow-y-auto">
                <div className="rounded-md w-[40%] border-[1px] border-neutral-800 bg-neutral-950 px-8 pt-6 pb-8 my-4 border-dashed sticky top-3 z-10">

                    <div className="flex justify-between items-end">
                        <div className="flex justify-start flex-col w-1/2">
                            <input
                                required
                                className="py-2 px-3 w-[70%]
                        placeholder:text-neutral-400
                        outline-none bg-inherit border-b-[1px] border-primary/60"
                                type="text"
                                placeholder="Quiz Title..."
                                onChange={e => setTestData({ ...testData, title: e.currentTarget.value })}
                            />
                            <input
                                required
                                className="py-2 px-3
                                placeholder:text-neutral-400 mt-4
                                outline-none bg-inherit bg-inherit border-b-[1px] border-primary/60"
                                type="text"
                                placeholder="Quiz Description..."
                                onChange={e => setTestData({ ...testData, description: e.currentTarget.value })}
                            />
                        </div>
                        <div className="flex gap-x-4 items-end justify-center">
                            <button onClick={(e) => addQuestion()} type="button" className="text-yellow-700">
                                <ListPlus />
                            </button>
                            <DatePickerButton
                                onDateChange={(date) => {    
                                    setTestData(p => {
                                        return { ...p, date: date == "" ? null : date }
                                    })
                                }}
                                currentDate={testData.date}
                            />
                            {/* <button type="button" className="text-sky-600">
                                <CalendarDays />
                            </button> */}
                            {
                                loading ? <SpinnerSmall className="text-neutral-700 fill-neutral-400" /> :
                                    <button type="submit" className="text-lime-300">
                                        <Check />
                                    </button>
                            }
                        </div>
                    </div>

                </div>
                <div className="w-[60%] rounded-md border-[1px] border-neutral-800 bg-neutral-950 mt-4 border-dashed">
                    {
                        questions.map((question, index) => {
                            return (

                                <Question
                                    {...question}
                                    key={index}
                                    intId={index}
                                    updateQuestion={updateQuestion}
                                    updateOption={updateOption}
                                    setCorrectOption={setCorrectOption}
                                    deleteQuestion={deleteQuestion}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </form>
    )
}

function Question({ question, options, correctOption, intId, updateQuestion, updateOption, setCorrectOption, deleteQuestion }) {
    // const [exit, setExit] = useState(false);

    const ref = useRef(null);
    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView();
        }
    }, [])

    return (
        <motion.div
            ref={ref}
            initial={{ x: -20, opacity: 0, animationTimingFunction: "ease-out" }}
            animate={{ x: 0, opacity: 1, animationTimingFunction: "ease-out" }}
            className={`border-b-[1px] border-dashed border-rose-200 p-6 px-10 relative`}>
            <button
                type="button"
                onClick={e => deleteQuestion(intId)}
                title="Remove Question"
                className="text-neutral-500 absolute right-4 top-4">
                <X size={15} />
            </button>
            <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-cyan-400">
                </div>
                <input
                    className="py-2 px-3 w-full
                    placeholder:text-neutral-400
                    outline-none bg-inherit text-lg font-light tracking-wider"
                    type="text"
                    name=""
                    id=""
                    required
                    placeholder="Enter question here..."
                    value={question ?? ""}
                    onChange={e => updateQuestion(intId, e.currentTarget.value)}
                />
            </div>
            <div className="flex flex-col mx-2 my-4 gap-y-4">
                {
                    options.map((option, optionIndex) => {
                        return (

                            <div key={optionIndex}
                                className={`flex gap-x-2 items-center px-3 py-1 
                                rounded-md border-lime-300 ${(correctOption && (correctOption == option)) ? "border-[1px]" : ""}`}>
                                {/* <div className="border-[1px] border-primary rounded-full h-6 w-6 flex justify-center items-center"> */}
                                {
                                    (correctOption && (correctOption == option)) ?
                                        <div className="bg-lime-500 rounded-full h-3 w-3"></div> :
                                        <div className="bg-rose-600 rounded-full h-3 w-3"></div>
                                }
                                {/* </div> */}
                                <input
                                    className="py-1 px-3 w-full
                                    placeholder:text-neutral-400
                                    outline-none bg-inherit text-sm font-light tracking-wider"
                                    type="text"
                                    name=""
                                    id=""
                                    required
                                    placeholder={`Option ${optionIndex + 1}`}
                                    value={option ?? ""}
                                    onChange={e => updateOption(intId, optionIndex, e.currentTarget.value)}
                                />
                                <button
                                    tabIndex={-1}
                                    onClick={(e) => {
                                        if (!option) {
                                            return;
                                        }

                                        setCorrectOption(intId, option)
                                    }}
                                    type="button"
                                    title="Mark Correct Option"
                                    className="text-lime-300">
                                    <CheckCheck size={18} />
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        </motion.div>

    )
}

export default AddQuiz;