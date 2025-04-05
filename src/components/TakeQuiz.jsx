import { useEffect, useState } from "react";
import { getTestQuestions, submitTest } from "../api/test";
import { useLocation, useNavigate } from "react-router-dom";
import SpinnerSmall from "./SpinnerSmall";
import { motion } from "motion/react";
import { useToast } from "../hooks/ToastProvider";

function TakeQuiz() {
    const navigate = useNavigate();
    const location = useLocation();
    const [questions, setQuestions] = useState(null);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState({});
    const [submitLoading, setSubmitLoading] = useState(false);
    const { showToast } = useToast();

    async function fetchQuestions() {
        const { data, error } = await getTestQuestions(location.state.testId);
        if (error) {
            console.log(error);
            return;
        }

        setQuestions(data.questions);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }

    function setAnswer(questionId, answer) {
        setAnswers((previousAnswers) => {
            return { ...previousAnswers, [questionId]: answer }
        })
    }

    async function handleSubmit(e) {
        setSubmitLoading(true);

        const { data, error } = await submitTest(location.state.testId, answers);
        if (error) {
            console.log(error);
            showToast({ title: error, type: "secondary" })
            return;
        }

        setTimeout(() => {
            setSubmitLoading(false);
            // navigate(`/topics/${topic.topicId}`, { replace: true });
        }, 1000);
    }

    useEffect(() => {
        fetchQuestions();
    }, []);

    return (
        <div className="w-full h-screen flex items-center flex-col overflow-y-auto pb-10">

            <div className="bg-neutral-950 w-[40%] border-[1px] border-neutral-700 border-dashed rounded-md px-12 py-8 sticky top-3 my-8">
                <div className=" flex flex-col gap-y-2">
                    <p className="text-2xl text-neutral-300 font-light border-b-[1px] border-neutral-800 pb-2">{location.state.title}</p>
                    <p className="text-neutral-300 text-lg">{location.state.description}</p>
                </div>

                <div className="mt-4 flex justify-between items-end">
                    <div className="flex gap-x-4">
                        <div className="flex gap-x-2 items-center">
                            <div className="w-3 h-3 rounded-full bg-teal-400"></div>
                            <span className="text-xs text-neutral-400 tracking-wide">
                                {
                                    location.state._count.questions > 1 ?
                                        `${location.state._count.questions} Questions` : `${location.state._count.questions} Question`
                                }
                            </span>
                        </div>
                        <span className="text-xs text-neutral-400">
                            Ends At {location.state.endTime ? location.state.endTime.split("T")[0] : "NA"}
                        </span>
                    </div>
                    <div className="flex gap-x-4 items-end">
                        {
                            loading || submitLoading ? <SpinnerSmall className="text-neutral-600 fill-sky-400" /> :
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="bg-primary/70 disabled:bg-primary/30 rounded-md px-8 py-2 text-sm">
                                    Submit
                                </button>
                        }
                    </div>
                </div>
            </div>

            <div className="bg-neutral-950 w-[60%] border-[1px] border-neutral-700 border-dashed 
            rounded-md px-10 py-8 flex flex-col items-center gap-y-8">
                {loading && <SpinnerSmall className="text-neutral-800 fill-sky-400" />}
                {
                    !loading && questions && questions.map((q, index) => {
                        return <Question key={index} question={q} answerText={answers[q.questionId]} setAnswer={setAnswer} />
                    })
                }
            </div>
        </div>
    )
}

function Question({ question, answerText, setAnswer }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full border-b-[1px] border-dashe border-neutral-800">
            <div className="flex gap-x-4 items-center">
                <div className="w-3 h-3 rounded-full bg-teal-400"></div>
                <span className="text-xl">{question.question}</span>
            </div>
            <div className="flex flex-col px-4 py-4 gap-y-4">
                {question.options.map((option, i) => {
                    return <Option
                        key={i}
                        index={i + 1}
                        qid={question.questionId}
                        optionText={option}
                        answerText={answerText}
                        setAnswer={setAnswer}

                    />
                })}
            </div>
        </motion.div>
    )
}

function Option({ optionText, index, answerText, setAnswer, qid }) {
    return (
        <div
            onClick={() => setAnswer(qid, optionText)}
            className={`rounded-md bg-neutral-900 flex cursor-pointer 
            ${answerText && answerText == optionText && "border-[1px] border-lime-400"}`}>
            <div className="px-4 py-2 border-r-[1px] border-neutral-700">
                <span className="text-sm text-neutral-400">{index}</span>
            </div>
            <div className="px-4 py-2">
                <span className="text-sm text-neutral-300">{optionText}</span>
            </div>
        </div>
    )
}
export default TakeQuiz;