import { useLocation } from "react-router-dom";
import { getAnalytics } from "../api/user";
import { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { Activity, Hash, Users } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend);


const dummyData = [
    { x: 0, y: 2 },
    { x: 1, y: 5 },
    { x: 2, y: 8 },
    { x: 3, y: 12 },
    { x: 4, y: 15 },
    { x: 5, y: 20 },
    { x: 6, y: 18 },
    { x: 7, y: 10 },
    { x: 8, y: 6 },
    { x: 9, y: 3 },
];

const data = {
    labels: Array.from({ length: 10 }).map((_, i) => i + ""),
    datasets: [{
        label: "Number of Users",
        data: dummyData,
        borderWidth: 0,
        backgroundColor: '#0891b2',
        borderColor: '#0891b2',
        borderRadius: 3
    }],
}

const options = {
    plugins: {
        title: {
            display: true,
            text: 'Marks Distribution',
            padding: {
                top: 10,
                bottom: 30
            },
            // align: "start",
            font: {
                size: 18
            },
            color:"#a3a3a3"
        }
    },
    scales: {
        x: {
            grid:{
                color: "#52525230"
            },
            title: {
              display: true,
              text: 'Marks out of 10',
              color:"#a3a3a3"
            }
          },
          y: {
            grid:{
                color: "#52525230"
            },
            title: {
              display: true,
              text: 'Number of Users',
              color:"#a3a3a3"
            }
          },
          
    },
}

function Analytics() {
    const location = useLocation();
    console.log(location.state);


    async function fetchAnalytics() {
        const { data, error } = await getAnalytics(location.state.testId);
        if (error) {
            console.log(error);
            return;
        }

        console.log(data);
    }

    useEffect(() => {
        fetchAnalytics();
    }, []);

    return (
        <div className="px-20 py-16 w-full h-screen flex justify-center items-center">
            <div className="w-full h-full flex flex-col items-start border-[1px] border-neutral-900 rounded-md">
                <div className="space-y-3 px-10 py-8">
                    <p className="text-4xl">Test Title</p>
                    <p className="text-xl text-neutral-400">Test Description</p>
                </div>
                <div className="flex gap-x-2 px-8">
                    <div className="bg-neutral-950 px-8 py-2 text-lg rounded-md border-[1px] border-neutral-800 gap-x-2 flex items-center">
                        <Users size={18} className="text-sky-400" />
                        <span>
                            Total Submissions:
                        </span>
                        <span className="font-bold">
                            10
                        </span>
                    </div>
                    <div className="bg-neutral-950 px-8 py-2 text-lg rounded-md border-[1px] border-neutral-800 gap-x-2 flex items-center">
                        <Hash size={18} className="text-lime-400" />
                        <span>
                            Maximum Marks:
                        </span>
                        <span className="font-bold">
                            15
                        </span>
                    </div>
                    <div className="bg-neutral-950 px-8 py-2 text-lg rounded-md border-[1px] border-neutral-800 gap-x-2 flex items-center">
                        <Activity size={18} className="text-amber-400" />
                        <span>
                            Average:
                        </span>
                        <span className="font-bold">
                            7.86
                        </span>
                    </div>
                </div>
                <div className="flex h-full w-full px-8 py-8">
                    <div className="w-1/2 bg-neutral-950 border-[1px] border-neutral-900 rounded-md h-full p-6 flex items-end">
                        <Bar data={data} options={options} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analytics;