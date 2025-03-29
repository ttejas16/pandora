import { BookOpen, BookOpenText, X } from "lucide-react";
import { useModalContext } from "../hooks/modalContext"
import { animated, useSpring } from "@react-spring/web";
import { useEffect } from "react";
import infoMap from "../utils/planetDetails";
import { Link } from "react-router-dom";

function InfoModal() {
    const modalContext = useModalContext();
    // console.log(modalContext.activeModal);
    
    const [springs, api] = useSpring(() => ({
        from: {
            x: -50,
            opacity: 0
        },
        to: {
            x: 0,
            opacity: 1
        },
    }))
    
    if (!modalContext.activeModal) {
        springs.opacity.reset();
        springs.x.reset();
        return null;
    }
 
    return (
        <animated.div className="absolute top-20 left-6 bg-neutral-900 p-8 rounded-sm w-[25vw] z-10 opacity-[0.98]">
            <div className="flex justify-between items-center">
                {
                    modalContext.isLoading ?
                        <div className="animate-pulse w-full h-8 bg-neutral-700 rounded-sm">

                        </div> :
                        <>
                            <p className="text-2xl tracking-widest font-extralight">
                                {modalContext.activeModal.toUpperCase()}
                            </p>
                            <button onClick={(e) => {

                                // api({
                                //     from: {
                                //         x: 0,
                                //         opacity: 1
                                //     },
                                //     to: {
                                //         x: -200,
                                //         opacity: 0
                                //     },
                                //     onRest: () => {
                                //     }
                                // })
                                modalContext.setActiveModal(null)
                                modalContext.setIsLoading(true);
                            }} className="hover:text-primary">
                                <X />
                            </button>
                        </>
                }
            </div>
            <hr className="w-full my-4 border-neutral-700" />
            {
                modalContext.isLoading ?
                    <div className="animate-pulse w-full h-[30vh] bg-neutral-700 rounded-sm">

                    </div> :
                    <>
                        <p className="font-light text-lg leading-snug">
                            {infoMap[modalContext.activeModal]["basic description"]}
                        </p>
                    </>
            }
            {
                modalContext.isLoading ?
                    <div className="animate-pulse w-1/2 my-4 h-8 bg-neutral-700 rounded-sm"></div> :
                    <>
                        <Link
                            to={`/info/${modalContext.activeModal}`}
                            className="py-3 px-6 hover:bg-[#9512c0] border-[#9512c0] border-[1px]
                            w-max mt-4 rounded-sm flex items-center gap-2 duration-300">
                            <BookOpen strokeWidth={2} />
                            <span>
                                READ MORE
                            </span>
                        </Link>
                    </>
            }



        </animated.div>
    )
}

export default InfoModal;