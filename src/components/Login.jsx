import { Link, useNavigate } from "react-router-dom";
import { Atom, CircleAlert, Earth, Eye, EyeOff, Orbit, SunMoon } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react"
import { login } from "../api/auth";
import ErrorMessage from "./ErrorMessage";
import { useAuthContext } from "../hooks/authContext";
import Spinner from "./Spinner";
import SpinnerSmall from "./SpinnerSmall";

const initialData = {
  email: "",
  password: "",
}

function Login() {
  const navigate = useNavigate();
  const authContext = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrors(null);

    const { data, error } = await login({ email: formData.email, password: formData.password });
    // console.log(data, error);

    if (error) {
      setTimeout(() => {
        setLoading(false);
        setErrors(error);
      }, 1000);
      return;
    }

    // update user here
    authContext.setUser({ ...data });

    setTimeout(() => {
      setLoading(false);
      navigate("/topics", { replace: true });
    }, 1000);
  }

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
                    setFormData({ ...formData, email: e.currentTarget.value })
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
                      setFormData({ ...formData, password: e.currentTarget.value })
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

                <ErrorMessage msg={errors} />
              </div>
            </div>
            <button
              disabled={loading}
              type="submit"
              className="mt-8 w-full bg-[#9512c0] font-medium py-2 rounded-md text-sm disabled:bg-primary/30 flex justify-center">
              {
                loading ? <SpinnerSmall className="text-primary fill-neutral-100"/> : "Login"
              }
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