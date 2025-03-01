import { BookOpen, BookOpenText, X } from "lucide-react";
import { useModelContext } from "../hooks/modelContext"
import { animated, useSpring } from "@react-spring/web";
import { useEffect } from "react";

function InfoModel() {
    const modelContext = useModelContext();
    // console.log(modelContext);
    
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
    
    if (!modelContext.activeModel) {
        springs.opacity.reset();
        springs.x.reset();
        return null;
    }

    return (
        <animated.div className="absolute top-20 left-6 bg-neutral-900 p-8 rounded-sm w-[25vw] z-10 opacity-[0.98]">
            <div className="flex justify-between items-center">
                {
                    modelContext.isLoading ?
                        <div className="animate-pulse w-full h-8 bg-neutral-700 rounded-sm">

                        </div> :
                        <>
                            <p className="text-2xl tracking-widest font-extralight">
                                {modelContext.activeModel.toUpperCase()}
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
                                modelContext.setActiveModel(null)
                                modelContext.setIsLoading(true);
                            }} className="hover:text-primary">
                                <X />
                            </button>
                        </>
                }
            </div>
            <hr className="w-full my-4 border-neutral-700" />
            {
                modelContext.isLoading ?
                    <div className="animate-pulse w-full h-[30vh] bg-neutral-700 rounded-sm">

                    </div> :
                    <>
                        <p className="font-light text-lg leading-snug">
                            The center of our solar system. 4.5 billion-year-old yellow dwarf star,Without the Sun’s
                            energy,life as we know it could not exist on our Earth.It is source of light for our entire solar system.Its gravity holds
                            the solar system together, keeping everything present in our solar syestem,from the biggest planets to the
                            smallest bits of debris in orbit around it. It is orbited by 8 planets, 5 dwarf planets,tens of
                            thousands of asteroids and over three trillon commets and icy bodies.
                            Sun is a medium-sized star with a radius of about 700,000 kilometers.
                        </p>
                    </>
            }
            {
                modelContext.isLoading ?
                    <div className="animate-pulse w-1/2 my-4 h-8 bg-neutral-700 rounded-sm"></div> :
                    <>
                        <button
                            className="py-3 px-6 hover:bg-[#9512c0] border-[#9512c0] border-[1px] mt-4 rounded-sm flex items-center gap-2 duration-300">
                            <BookOpen strokeWidth={2} />
                            <span>
                                READ MORE
                            </span>
                        </button>
                    </>
            }



        </animated.div>
    )
}

export default InfoModel;