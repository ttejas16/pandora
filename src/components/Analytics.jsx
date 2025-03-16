import { useLocation } from "react-router-dom";
import { getAnalytics } from "../api/user";
import { useEffect, useState } from "react";
import { Activity, Hash, Users } from "lucide-react";
import MarkDistributionChart from "./MarkDistributionChart";
import { getInitials } from "../utils/getInitials";

const initialMetaData = {
    totalSubmissions: 0,
    testAverage: 0,
    maxMarks: 0
}

function Analytics() {
    const [markDistribution, setMarkDistribution] = useState([]); // [{ x:0, y:0 }, ...]
    const [userRankings, setUserRankings] = useState([]); // [{ userName:"", email:"", score:0 }, ...]
    const [metaData, setMetaData] = useState(initialMetaData);
    const location = useLocation();

    async function fetchAnalytics() {
        const { data, error } = await getAnalytics(location.state.testId);
        if (error) {
            console.log(error);
            return;
        }

        setMarkDistribution(data.markDistribution);
        setMetaData(p => {
            return {
                ...p,
                totalSubmissions: data.submissionCount,
                testAverage: data.testAvg,
                maxMarks: data.maxMarks
            }
        });
        setUserRankings(Object.values(data.userScoreMap))
    }

    console.log(userRankings);
    
    useEffect(() => {
        fetchAnalytics();
    }, []);

    return (
        <div className="px-20 py-16 w-full h-screen flex justify-center items-center">
            <div className="w-full h-full flex flex-col items-start border-[1px] border-neutral-900 rounded-md">
                <div className="space-y-3 px-10 py-8">
                    <p className="text-4xl">{location.state.title}</p>
                    <p className="text-xl text-neutral-400">{location.state.description}</p>
                </div>
                <div className="flex gap-x-2 px-8">
                    <div className="bg-neutral-950 px-8 py-2 text-lg rounded-md border-[1px] border-neutral-800 gap-x-2 flex items-center">
                        <Users size={18} className="text-sky-400" />
                        <span>
                            Total Submissions:
                        </span>
                        <span className="font-bold">
                            {metaData.totalSubmissions}
                        </span>
                    </div>
                    <div className="bg-neutral-950 px-8 py-2 text-lg rounded-md border-[1px] border-neutral-800 gap-x-2 flex items-center">
                        <Hash size={18} className="text-lime-400" />
                        <span>
                            Maximum Marks:
                        </span>
                        <span className="font-bold">
                            {metaData.maxMarks}
                        </span>
                    </div>
                    <div className="bg-neutral-950 px-8 py-2 text-lg rounded-md border-[1px] border-neutral-800 gap-x-2 flex items-center">
                        <Activity size={18} className="text-amber-400" />
                        <span>
                            Average:
                        </span>
                        <span className="font-bold">
                            {metaData.testAverage}
                        </span>
                    </div>
                </div>
                <div className="flex h-full w-full px-8 py-8 gap-x-8 overflow-y-auto">
                    <div className="w-[70%] bg-neutral-950 border-[1px] border-neutral-900 rounded-md h-full p-6 flex items-end">
                        <MarkDistributionChart
                            xLabel={`Marks out of ${metaData.maxMarks}`}
                            yLabel={`Number of users`}
                            chartData={markDistribution}
                        />
                    </div>
                    <div className="w-[30%] border-[1px] border-neutral-900 rounded-md px-6 py-4 gap-y-4 flex flex-col">
                        <div className="flex gap-x-2 items-center">
                            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                            <p className="text-lg font-semibold">Rankings</p>
                        </div>
                        <div className="flex flex-col items-start gap-y-6 overflow-y-auto">
                            {
                                userRankings.map((user, i) => <UserCard key={i} user={user} />)
                            }
                            {
                                userRankings.length == 0 && 
                                    <div className="text-sm text-neutral-300 self-center mt-[50%]">
                                        Nothing at the moment...
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


function UserCard({ user }) {
    return (
        <div className="flex justify-between items-center px-3 w-full">
            <div className="flex items-center gap-x-3">
                <div className="text-xs border-[1px] border-neutral-800 flex justify-center items-center w-10 h-10 rounded-full">
                    {getInitials(user.userName)}
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold text-sm">{user.userName}</span>
                    <span className="text-xs">{user.email}</span>
                </div>
            </div>
            <div className="px-4 py-2 text-sm rounded-md border-[1px] border-amber-900">
                Score: {user.score}
            </div>
        </div>
    )
}

export default Analytics;