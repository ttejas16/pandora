import { Link } from "react-router-dom";
import { Atom, CircleAlert, Earth, Eye, EyeOff, Orbit, SunMoon } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react"
import { login } from "../api/auth";


const initialData = {
  email: "",
  password: "",
}

function Login() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState(initialData);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const res = await login({ email:data.email, password:data.password });
    if (!res.success) {
      console.log("something went wrong");
    }
    else {
      console.log(res.msg);
    }

    setLoading(false);
  }

  // console.log(data);
  

  return (
    <>
      <section className="w-full h-screen flex justify-center items-center">
        <div className="flex flex-col items-center bg-neutral-950 border-[1px] border-neutral-900 rounded-lg px-12 py-16 w-[450px]">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col items-center text-sm w-full">
              <p className="text-2xl font-bold">Sign in to Pandora</p>
              <div className="flex mt-1">
                Welcome back! Please sign in to continue
              </div>
            </div>

            <div className="w-full flex flex-col mt-8 gap-y-4">
              <div className="flex flex-col gap-y-2 text-sm w-full">
                <label htmlFor="username">
                  Email
                </label>
                <input
                  required
                  onChange={(e) => {
                    setData({ ...data, email: e.currentTarget.value })
                  }}
                  className="py-2 px-3 w-full
                                    placeholder:text-neutral-400
                                    outline-none bg-neutral-900 border-[1px] border-neutral-700 rounded-md"
                  type="email"
                  autoFocus
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
                      setData({ ...data, password: e.currentTarget.value })
                    }}
                    className="py-2 px-3 w-full
                  placeholder:text-neutral-400
                  outline-none bg-inherit rounded-md"
                    type={showPassword ? "text" : "password"}
                    placeholder="Example@123"
                    name="password" />
                  <button title="Show password" type="button" className="px-3 py-1" onClick={() => setShowPassword(!showPassword)}>
                    {
                      showPassword ?
                        <EyeOff size={15} /> :
                        <Eye size={15} />
                    }
                  </button>
                </div>

              </div>

            </div>
            <button
              type="submit"
              className="mt-8 w-full bg-[#9512c0] font-medium py-2 rounded-md text-sm">
              Login
            </button>
            <div className="flex justify-center gap-3 my-10">
              <Orbit className="hover:rotate-180 duration-200" />
              <Earth className="hover:scale-[1.2] hover:text-sky-400 duration-200" />
              <SunMoon className="hover:-rotate-180 duration-200" />
            </div>
          </form>
          <div className="text-sm text-neutral-400">
            <span>Don't have an account ?</span>
            <Link to={"/signup"} className="mx-1 underline">Sign Up</Link>
          </div>

        </div>
      </section>
    </>
  )
}

export default Login;