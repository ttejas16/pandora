import { Check, Plus, Search, Squirrel } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/authContext";
import { getTopics, searchTopics } from "../api/user";
import SpinnerSmall from "./SpinnerSmall";
import ProfileMenu from "./ProfileMenu";
import TopicCard from "./TopicCard";
import JoinTopicModal from "./JoinTopicModal";
import SearchTopicCard from "./SearchTopicCard";

function Topics() {
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

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

  async function handleSearch() {
    const { data, error } = await searchTopics(searchQuery);
    if (error) {
      console.log(error);
      return;
    }

    setSearchResults([...data.searchResults]);
    setSearchLoading(false);
  }

  useEffect(() => {
    // console.log("fetching");

    fetchTopics();

    return () => {
      // console.log("reset");
      setTopics((p) => []);
    }
  }, []);

  useEffect(() => {
    if (!searchActive) {
      setSearchQuery("");
    }

  }, [searchActive, searchQuery]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      return;
    }

    setSearchLoading(true);
    const id = setTimeout(() => {
      handleSearch();
    }, 1500);

    return () => {
      clearTimeout(id);
    }

  }, [searchQuery])


  return (
    <>
      {/* <Navbar/> */}
      <div className="w-full h-screen flex flex-col overflow-x-hidden">

        {/* Topbar */}
        <div className="w-full flex justify-between items-center border-b-[1px] border-neutral-900">
          <Link to={"/"} className="text-2xl font-medium text-primary ml-12">Pandora</Link>
          <div className="flex gap-x-4 p-6">
            <button onClick={(e) => setShowJoinModal(!showJoinModal)} className="border-[1px] text-primary border-neutral-800 flex justify-center items-center w-12 h-12 rounded-full">
              <Plus size={20} strokeWidth={3} />
            </button>
            <div className="flex gap-x-2 items-center border-[1px] border-neutral-800 rounded-full bg-neutral-900">

              <AnimatePresence>
                {searchActive &&
                  <motion.div
                    initial={{ width: "40px" }}  // initial small width (icon only)
                    animate={{ width: searchActive ? "240px" : "40px" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="ml-6">
                    <motion.input
                      onChange={e => setSearchQuery(e.currentTarget.value)}
                      type="search"
                      autoFocus
                      placeholder="Search Topic By Title... "
                      className="py-2 text-sm placeholder:text-neutral-400
                    outline-none bg-inherit w-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>}
              </AnimatePresence>

              <button onClick={e => setSearchActive(!searchActive)}
                className="flex justify-center items-center w-12 h-12">
                <Search size={18} />
              </button>
            </div>
            <div
              onClick={(e) => setShowProfileContext(!showProfileContext)}
              title={authContext.user.username}
              className="border-[1px] border-neutral-800 flex justify-center 
              cursor-pointer items-center w-12 h-12 rounded-full relative">
              <span className="font-semibold">
                {authContext.user.username.split(" ").filter(w => w).map(w => w[0].toUpperCase()).join("")}
              </span>
              {showProfileContext && <ProfileMenu />}
            </div>
          </div>
        </div>
        {
          !searchQuery.trim() &&
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
        }

        {/* Grid */}
        <div className="w-full grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-8 px-12 overflow-y-auto">
          {
            !searchQuery.trim() && topics.filter(t => {
              if (filter.created && filter.joined) {
                return true;
              }

              if (filter.created) {
                return t.isOwner;
              }

              if (filter.joined) {
                return !t.isOwner;
              }

              return false;

            }).map((topic) => {
              return <TopicCard key={topic.topicId} topic={topic} />
            })
          }
          {
            !searchQuery.trim() && topics.length == 0 &&
            <div className="col-span-full row-span-full flex justify-center items-center mt-[15%] gap-x-4 text-neutral-300">
              <Squirrel size={60} strokeWidth={1} />
              <span>
                Nothing at the moment...
              </span>
            </div>
          }
          {
            searchQuery.trim() && searchLoading &&
            <div className="col-span-full row-span-full flex justify-center">
              <SpinnerSmall className="w-3 text-neutral-600 fill-blue-400" />
            </div>
          }
          {
            (searchQuery.trim() && !searchLoading) && (
              searchResults.length > 0 ?
                searchResults.map((topic, index) => {
                  return <SearchTopicCard key={topic.topicId} topic={topic} appendTopic={appendTopic} />
                }) :
                <div className="col-span-full flex justify-center items-center gap-x-4 text-neutral-300 mt-4">
                  <Squirrel size={60} strokeWidth={1} />
                  <span className="text-lg font-light">Nothing matches '{searchQuery}' ...</span>
                </div>
            )
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

export default Topics;