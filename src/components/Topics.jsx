import { Check, Clipboard, Image, Plus, RefreshCw, Search, User, X } from "lucide-react";
import Navbar from "./Navbar";
import ManOnMoon from "../assets/ManOnMoon.svg"
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/authContext";
import { createTopic, getTopics, joinTopic } from "../api/user";
import SpinnerSmall from "./SpinnerSmall";
import ProfileMenu from "./ProfileMenu";

function Topics() {
  const [topics, setTopics] = useState([]);
  const [filter, setFilter] = useState({ created: true, joined: true })
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showProfileContext, setShowProfileContext] = useState(false);
  const authContext = useAuthContext();


  function appendTopic(topic = {}) {
    setTopics(p => [...p, topic]);
  }

  async function fetchTopics() {
    const { data, error } = await getTopics();
    if (error) {
      console.log(error);
      return;
    }

    setTopics([...data])
  }

  useEffect(() => {
    // console.log("fetching");

    fetchTopics();

    return () => {
      // console.log("reset");
      setTopics((p) => []);
    }
  }, []);

  // console.log(topics);


  return (
    <>
      {/* <Navbar/> */}
      <div className="w-full h-screen flex flex-col">

        {/* Topbar */}
        <div className="w-full flex justify-between items-center border-b-[1px] border-neutral-900">
          <Link to={"/"} className="text-2xl font-medium text-primary ml-12">Pandora</Link>
          <div className="flex gap-x-4 p-6">
            <button onClick={(e) => setShowJoinModal(!showJoinModal)} className="border-[1px] text-primary border-neutral-800 flex justify-center items-center w-12 h-12 rounded-full">
              <Plus size={20} strokeWidth={3} />
            </button>
            <button className="border-[1px] border-neutral-800 flex justify-center items-center w-12 h-12 rounded-full">
              <Search size={18} />
            </button>
            <button
              onClick={(e) => setShowProfileContext(!showProfileContext)}
              title={authContext.user.username}
              className="border-[1px] border-neutral-800 flex justify-center items-center w-12 h-12 rounded-full relative">
              <span className="font-semibold">
                {authContext.user.username.split(" ").filter(w => w).map(w => w[0].toUpperCase()).join("")}
              </span>
              {showProfileContext && <ProfileMenu />}
            </button>
          </div>
        </div>

        <div className="px-12 py-4 flex gap-x-4">
          <div onClick={() => setFilter({ ...filter, created: !filter.created })} className="flex gap-x-2 items-center">
            <button className="border-[1px] border-neutral-600 rounded-sm w-5 h-5">
              {
                filter.created ?
                  <Check strokeWidth={3} className="w-full h-full p-[2px] bg-primary" /> : null
              }
            </button>
            <span className="text-sm no-select">Created</span>
          </div>
          <div onClick={() => setFilter({ ...filter, joined: !filter.joined })} className="flex gap-x-2 items-center">
            <button className="border-[1px] border-neutral-600 rounded-sm w-5 h-5">
              {
                filter.joined ?
                  <Check strokeWidth={3} className="w-full h-full p-[2px] bg-primary" /> : null
              }
            </button>
            <span className="text-sm no-select">Joined</span>
          </div>

        </div>

        {/* Grid */}
        <div className="w-full grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-8 px-12 overflow-y-auto">
          {
            topics.map((topic) => {
              return <TopicCard key={topic.topicId} topic={topic} />
            })
          }
        </div>
      </div>
      <JoinTopicModal
        appendTopic={appendTopic}
        visible={showJoinModal}
        setVisibility={() => setShowJoinModal((p) => !p)} />

    </>
  )
}


function TopicCard({ topic }) {

  return (
    <div className="rounded-md bg-neutral-950 p-4">
      <div className="rounded-t-md w-full flex flex-col bg-neutral-950 gap-y-1 pl-2 pt-2">
        <p className="text-2xl">{topic.topicName}</p>
        <p className="text-sm text-neutral-300">{topic.topicSubtitle}</p>
      </div>

      <div className="py-3">

        <div className="rounded-md flex justify-center items-center w-full h-[150px] bg-primary/10 p-">
          {/* <Image className="text-neutral-600 " /> */}
          <img src={"https://img.freepik.com/free-photo/galaxy-nature-aesthetic-background-starry-sky-mountain-remixed-media_53876-126761.jpg?t=st=1740856833~exp=1740860433~hmac=75e46630dc1412eeb97a9e4f105eb7c66003c323e34fc04e99cf1ab48093660d&w=1060"} alt="img" className="w-full h-full object-cover rounded-md" />
        </div>
      </div>

      <div className="flex justify-between items-center gap-y-2">
        <Link state={topic} to={`/topics/${topic.topicId}`}
          className="border-[1px] border-neutral-800 px-6 py-2 text-center rounded-md text-sm">
          View
        </Link>
        {
          <div className="flex items-center gap-x-2">
            {
              topic.isPublic ?
                <div className="rounded-full bg-sky-400 size-[10px]"></div> :
                <div className="rounded-full bg-yellow-400 size-[10px]"></div>
            }
            <span className="pr-2">{topic.isPublic ? "Public" : "Private"}</span>
          </div>
        }
      </div>
    </div>
  )
}

function JoinTopicModal({ visible, setVisibility, appendTopic }) {
  const [loading, setLoading] = useState(false);
  const [activeButton, setActiveButton] = useState("New");
  const [topicType, setTopicType] = useState("public");
  const [formData, setFormData] = useState({ title: null, subTitle: null, url: "temporary" });
  const [resultCode, setResultCode] = useState(null);
  const [topicCode, setTopicCode] = useState(null);
  // console.log(topicCode);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResultCode(null);

    const { data, error } = await createTopic({ ...formData, type: topicType });
    if (error) {
      console.log(error);
      return;
    }

    setTimeout(() => {
      setLoading(false);
      appendTopic(data);
      setResultCode(data.topicCode);

    }, 1500);
  }


  async function handleJoinTopic(e) {
    e.preventDefault();
    setLoading(true);
    setResultCode(null);

    const { data, error } = await joinTopic({ topicCode });
    if (error) {
      console.log(error);
      return;
    }

    setTimeout(() => {
      setLoading(false);
      appendTopic(data);
      setVisibility();
      setResultCode(null);

    }, 1500);
  }

  return (

    <AnimatePresence>
      {
        visible &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, animationTimingFunction: "ease-out" }}
          exit={{ opacity: 0 }}
          className="absolute top-0 left-0 w-full h-screen flex justify-center items-center z-2">
          <div onClick={setVisibility} className="absolute top-0 left-0 w-full h-screen z-2 bg-neutral-950 opacity-[0.7]"></div>

          {/* actual modal */}
          <div
            className="w-full h-[600px] md:w-[700px] md:h-[650px] m-6 bg-neutral-900 z-10 rounded-md p-6 border-[1px] border-neutral-800">

            <div className="flex justify-between">

              <div className="w-max flex gap-x-2 p-2 rounded-lg">
                <button
                  onClick={() => setActiveButton("New")}
                  className={`px-3 py-2 rounded-lg text-xs ${activeButton == "New" ? "bg-primary/60" : "border-[1px] border-neutral-800"}`}>
                  New Topic
                </button>
                <button
                  onClick={() => setActiveButton("Join")}
                  className={`px-3 py-2 rounded-md text-xs ${activeButton != "New" ? "bg-primary/60" : "border-[1px] border-neutral-800"}`} >
                  Join Topic
                </button>
              </div>
              <button onClick={setVisibility}>
                <X />
              </button>
            </div>

            {
              activeButton == "New" ?
                <>
                  <div className="px-4 py-6">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">

                      <div className="flex flex-col gap-y-2 text-sm w-full">
                        <label htmlFor="username">
                          Topic Title
                        </label>
                        <input
                          onChange={(e) => setFormData({ ...formData, title: e.currentTarget.value })}
                          required
                          className="py-2 px-3
                    text-sm
                   placeholder:text-neutral-400
                   outline-none bg-neutral-900 border-[1px] border-neutral-700 rounded-md"
                          type="text"
                          name="topicName"
                          placeholder="All About Gravity... " />
                      </div>
                      <div className="flex flex-col gap-y-2 text-sm w-full">
                        <label htmlFor="username">
                          Topic Subtitle
                        </label>
                        <input
                          onChange={(e) => setFormData({ ...formData, subTitle: e.currentTarget.value })}
                          required
                          className="py-2 px-3
                    text-sm
                   placeholder:text-neutral-400
                   outline-none bg-neutral-900 border-[1px] border-neutral-700 rounded-md"
                          type="text"
                          name="topicSubtitle"
                          placeholder="Learn Everything about gravity... " />
                      </div>

                      <div className="">
                        <label htmlFor="imageUrl" className="text-sm">Thumbnail</label>
                        <input type="text" className="hidden" name="imageUrl" />
                        <div className="relative rounded-md flex justify-center items-center w-full h-[150px] bg-primary/10 mt-1">
                          <Image className="text-neutral-600 " />
                          <button type="button" className="hover:rotate-90 duration-200 absolute -bottom-2 -right-2 rounded-full border-[1px] border-neutral-800 bg-neutral-900 p-2">
                            <RefreshCw size={18} />
                          </button>
                        </div>
                      </div>

                      <div className="mt-2">
                        <button
                          type="button"
                          onClick={() => setTopicType("public")}
                          className={`text-xs px-3 py-2 rounded-l-md border-[1px] 
                      ${topicType == "public" ? "text-sky-300 border-sky-400" : "border-neutral-700"} `}>
                          Public
                        </button>
                        <button
                          type="button"
                          onClick={() => setTopicType("private")}
                          className={`text-xs px-3 py-2 rounded-r-md border-[1px] 
                    ${topicType == "private" ? "text-yellow-200 border-yellow-600" : "border-neutral-700"} `}>
                          Private
                        </button>
                      </div>

                      <button disabled={loading} type="submit" className="bg-primary/60 rounded-md text-xs px-6 py-2 w-max align-end disabled:bg-primary/30">
                        {loading ? <SpinnerSmall className="w-3 text-neutral-500 fill-neutral-200" /> : "Create Topic"}
                      </button>
                      {
                        resultCode &&
                        <div className="text-sm flex items-center">
                          <span>
                            Topic Code
                          </span>
                          <span
                            onClick={e => {
                              navigator.clipboard.writeText(e.currentTarget.textContent)
                              e.currentTarget.classList.add("text-lime-500");

                              setTimeout(() => {

                                e.target.classList.remove("text-lime-500");
                                console.log(e.target.classList);

                              }, 1000)
                            }}
                            className="mx-2 py-1 px-3 bg-neutral-700 rounded-md flex gap-x-2 cursor-pointer">
                            {resultCode}
                            <Clipboard size={18} />
                          </span>
                        </div>
                      }

                    </form>
                  </div>
                </>
                :
                <>
                  <div className="px-4 py-6 flex justify-center">

                    <form onSubmit={handleJoinTopic} className="mt-40 w-full sm:w-1/2 flex h-full flex-col text-sm md:text-normal justify-center items-center gap-y-3">
                      <label htmlFor="topicCode" className="text-lg font-light text-neutral-300">
                        Use A Topic Code
                      </label>
                      <input
                        onChange={e => setTopicCode(e.currentTarget.value)}
                        required
                        className="py-2 px-3 w-full
                          placeholder:text-neutral-400
                          outline-none bg-neutral-900 border-[1px] border-neutral-700 rounded-md"
                        type="text"
                        name="topicCode"
                        placeholder="Enter code here" />
                      <button disabled={loading} type="submit" className="bg-primary/60 disabled:bg-primary/30 px-14 py-3 w-full rounded-md text-sm flex justify-center">
                        {loading ? <SpinnerSmall className="text-neutral-500 fill-neutral-200" /> : "Join Topic"}
                      </button>
                    </form>
                  </div>
                </>
            }
          </div>

        </motion.div>
      }
    </AnimatePresence>
  )
}

export default Topics;