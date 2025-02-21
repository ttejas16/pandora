import { Link } from "react-router-dom";
import { Atom, CircleAlert, Earth, Orbit, SunMoon } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react"

function Signup() {
  const [error, setError] = useState(false);

  return (
    <>
      <section className="w-full h-screen flex justify-center items-center">
        <div className="flex flex-col items-center bg-neutral-950 border-[1px] border-neutral-900 rounded-lg px-12 py-16 w-[500px]">
          
          <form className="w-full">
            
            <div className="flex flex-col items-center text-sm w-full">
              <p className="text-2xl font-bold">Create an account</p>
              <div className="flex mt-1">
                Please fill in the details to continue
              </div>
            </div>

            <div className="w-full flex flex-col mt-8 gap-y-4">
              
              <div className="flex flex-col gap-y-2 text-sm w-full">
                <label htmlFor="username">
                  Username
                </label>
                <input
                  className="py-2 px-3 w-full
                                    placeholder:text-neutral-400
                                    outline-none bg-neutral-900 border-[1px] border-neutral-700 rounded-md"
                  type="text"
                  placeholder="Enter a unique username..."
                  name="username" />
                {
                  error &&
                  <motion.div
                    initial={{ height: "0px", opacity: 0 }}
                    animate={{ height: "auto", animationTimingFunction: "ease-in-out", opacity: 1 }} className="flex gap-x-1 text-red-500 font-light tracking-wide">
                    <CircleAlert size={20} strokeWidth={2} />
                    <span>Invalid credentials!</span>
                  </motion.div>
                }
              </div>
              
              <div className="flex flex-col gap-y-2 text-sm w-full">
                <label htmlFor="username">
                  Email
                </label>
                <input
                  className="py-2 px-3 w-full
                                    placeholder:text-neutral-400
                                    outline-none bg-neutral-900 border-[1px] border-neutral-700 rounded-md"
                  type="email"
                  placeholder="example@gmail.com"
                  name="email" />
                {
                  error &&
                  <motion.div
                    initial={{ height: "0px", opacity: 0 }}
                    animate={{ height: "auto", animationTimingFunction: "ease-in-out", opacity: 1 }} className="flex gap-x-1 text-red-500 font-light tracking-wide">
                    <CircleAlert size={20} strokeWidth={2} />
                    <span>Invalid credentials!</span>
                  </motion.div>
                }
              </div>
              
              <div className="flex flex-col gap-y-2 text-sm w-full">
                <label htmlFor="password">
                  Password
                </label>
                <input
                  className="py-2 px-3 w-full
                                    placeholder:text-neutral-400
                                    outline-none bg-neutral-900 border-[1px] border-neutral-700 rounded-md"
                  type="password"
                  placeholder="Example@123"
                  name="password" />
                {
                  error &&
                  <motion.div
                    initial={{ height: "0px", opacity: 0 }}
                    animate={{ height: "auto", opacity: 1, animationTimingFunction: "ease-in-out" }} className="flex gap-x-1 text-red-500 font-light tracking-wide">
                    <CircleAlert size={20} strokeWidth={2} />
                    <span>Invalid credentials!</span>
                  </motion.div>
                }
              </div>
              
              <div className="flex flex-col gap-y-2 text-sm w-full">
                <label htmlFor="password">
                  Confirm Password
                </label>
                <input
                  className="py-2 px-3 w-full
                                    placeholder:text-neutral-400
                                    outline-none bg-neutral-900 border-[1px] border-neutral-700 rounded-md"
                  type="password"
                  placeholder="Enter password again"
                  name="password" />
                {
                  error &&
                  <motion.div
                    initial={{ height: "0px", opacity: 0 }}
                    animate={{ height: "auto", opacity: 1, animationTimingFunction: "ease-in-out" }} className="flex gap-x-1 text-red-500 font-light tracking-wide">
                    <CircleAlert size={20} strokeWidth={2} />
                    <span>Invalid credentials!</span>
                  </motion.div>
                }
              </div>

            </div>
            
            <button
              onClick={() => setError(!error)}
              type="button"
              className="mt-8 w-full bg-[#9512c0] font-medium py-2 rounded-md text-sm">
              Create Account
            </button>
            
            <div className="flex justify-center gap-3 my-8">
              <Orbit className="hover:rotate-180 duration-200" />
              <Earth className="hover:scale-[1.2] hover:text-sky-400 duration-200" />
              <SunMoon className="hover:-rotate-180 duration-200" />
            </div>
          </form>

          <div className="text-sm text-neutral-400">
            <span>Already have an account ?</span>
            <Link to={"/login"} className="mx-1 underline">Login</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Signup;