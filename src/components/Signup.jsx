import { Link } from "react-router-dom";
import { Atom, CircleAlert, CircleCheckBig, Earth, Eye, EyeOff, Orbit, SunMoon } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react"
import debounce from "../utils/debounce";
import useDebouncedValue from "../utils/debounce";
import { checkEmailValidity, signUp } from "../api/auth";
import Error from "./ErrorMessage";
import ErrorMessage from "./ErrorMessage";
import SpinnerSmall from "./SpinnerSmall";

const initialformData = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
}

function Signup() {
  const [toastMessage, setToastMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialformData);
  const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false });
  const [errors, setErrors] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrors(null);

    const { data, error } = await signUp(formData);

    if (error) {
      setTimeout(() => {
        setLoading(false);
        setErrors(error);
      }, 1000);
      return;
    }

    setTimeout(() => {
      // show toast here
      setLoading(false);
      setToastMessage("Registered Successfully!");
      setTimeout(() => {
        setToastMessage(null);
      }, 1500);
    }, 1000);
  }


  return (
    <>
      <section className="w-full h-screen flex justify-center items-center">
        <div className="flex flex-col items-center bg-neutral-950 border-[1px] border-neutral-900 rounded-lg px-12 py-16 w-[500px]">

          <form onSubmit={handleSubmit} className="w-full">

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
                  required
                  onChange={(e) => {
                    setFormData({ ...formData, username: e.currentTarget.value })
                  }}
                  className="py-2 px-3 w-full
                                    placeholder:text-neutral-400
                                    outline-none bg-neutral-900 border-[1px] border-neutral-700 rounded-md"
                  type="text"
                  placeholder="Enter a unique username..."
                  name="username" />
              </div>

              <div className="flex flex-col gap-y-2 text-sm w-full">
                <label htmlFor="username">
                  Email
                </label>
                <input
                  required
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.currentTarget.value })
                  }}
                  className="py-2 px-3 w-full
                                    placeholder:text-neutral-400
                                    outline-none bg-neutral-900 border-[1px] border-neutral-700 rounded-md"
                  type="email"
                  placeholder="example@gmail.com"
                  name="email" />
              </div>

              <div className="flex flex-col gap-y-2 text-sm w-full">
                <label htmlFor="password">
                  Password
                </label>
                <div className="flex bg-neutral-900 border-[1px] border-neutral-700 rounded-md">
                  <input
                    required
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.currentTarget.value })
                    }}
                    className="py-2 px-3 w-full
                                    placeholder:text-neutral-400
                                    outline-none bg-neutral-900 rounded-md"
                    type={showPassword.password ? "text" : "password"}
                    placeholder="Example@123"
                    name="password" />
                  <button
                    title="Show password"
                    type="button"
                    className="px-3 py-1"
                    onClick={() => setShowPassword({ ...showPassword, password: !showPassword.password })}>
                    {
                      showPassword.password ?
                        <EyeOff size={15} /> :
                        <Eye size={15} />
                    }
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-y-2 text-sm w-full">
                <label htmlFor="password">
                  Confirm Password
                </label>
                <div className="flex bg-neutral-900 border-[1px] border-neutral-700 rounded-md">

                  <input
                    required
                    onChange={(e) => {
                      setFormData({ ...formData, confirmPassword: e.currentTarget.value })
                    }}
                    className="py-2 px-3 w-full
                  placeholder:text-neutral-400
                  outline-none bg-neutral-900 rounded-md"
                    type={showPassword.confirmPassword ? "text" : "password"}
                    placeholder="Enter password again"
                    name="password" />
                  <button
                    title="Show password"
                    type="button"
                    className="px-3 py-1"
                    onClick={() => setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword })}>
                    {
                      showPassword.confirmPassword ?
                        <EyeOff size={15} /> :
                        <Eye size={15} />
                    }
                  </button>
                </div>
                <ErrorMessage msg={errors} />
              </div>

            </div>

            <button
              // onClick={() => setError(!error)}
              type="submit"
              disabled={loading}
              className="mt-8 w-full bg-[#9512c0] font-medium py-2 rounded-md text-sm disabled:bg-primary/30 flex justify-center">
              {
                loading ? <SpinnerSmall className="text-primary fill-neutral-100" /> : "Create Account"
              }
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
        <Toast show={toastMessage} title={toastMessage} />
      </section>
    </>
  )
}


function Toast({ show, title }) {
  return (
    <AnimatePresence>
      {
        show &&
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity:0 }} 
          className="absolute bottom-0 w-full mb-6 flex justify-center">
          <div className="bg-neutral-950 border-[1px] border-neutral-900 rounded-md px-6 py-2 text-xs flex justify-start items-center gap-x-2">
            <CircleCheckBig size={18} className="text-lime-400"/>
            <span>{title}</span>
          </div>
        </motion.div>
      }
    </AnimatePresence>
  )
}

export default Signup;