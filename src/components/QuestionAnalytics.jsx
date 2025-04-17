import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { Bar, Chart } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
const dummyData = [
    // { x: 0, y: 1 },
    { x: "Option 1", y: 5 },
    { x: 2, y: 8 },
    { x: 3, y: 12 },
    { x: 4, y: 15 },
];

const d = Array.from({ length: 4 }).map((_, i) => { return { x: (i + 1) * 10, y: i + 1 } })

const colors = {
    correctOptionBarColor: "#84fc0399",
    correctOptionBorderColor: "#84fc03",
    defaultBarColor: '#2dd4bf99',
    defaultBorderColor: '#5eead4'
};

const defaultDataset = {
    label: "",
    data: dummyData.map(o => { return { x: o.y, y: o.x } }),
    borderWidth: 1,
    backgroundColor: '#2dd4bf99',
    borderColor: '#5eead4',
    maxBarThickness: 100,
    minBarThickness: 200,
    borderRadius: 3
}
const labels = dummyData.map(obj => obj.x);;

const defaultOptions = {
    indexAxis: 'y',
    plugins: {
        // tooltip: {
        //     callbacks: {
        //         title: function (tooltipItems) {
        //             return tooltipItems[0].label; // Show full label in tooltip
        //         }
        //     }
        // },
        title: {
            display: true,
            text: '',
            padding: {
                top: 10,
                bottom: 30
            },
            // align: "start",
            font: {
                size: 18
            },
            color: "#a3a3a3"
        }
    },
    scales: {
        x: {
            grid: {
                color: "#52525230"
            },
            title: {
                display: true,
                text: 'Responses Per Option',
                color: "#a3a3a3",
                font: {
                    size: 14,
                    weight: "bold"
                }
            }
        },
        y: {
            grid: {
                color: "#52525230"
            },
            title: {
                display: true,
                text: 'Options',
                color: "#a3a3a3",
                font: {
                    size: 14,
                    weight: "bold"
                }
            },
            ticks: {
                font: {
                    size: 14,
                    weight: "bold",
                },
                color: "#ffffff",
                callback: function (value, index, ticks) {
                    const yLabel = this.getLabelForValue(value);
                    // return yLabel;
                    return yLabel.length > 10 ? `${yLabel.substring(0, 10)}...` : yLabel;

                }
            }
        },

    },
}

function QuestionAnalytics({ questionWithOptionAnalytics }) {
    const chartData = questionWithOptionAnalytics.options.map(option => {
        return { x: option.by?.length, y: option.name };
    })

    const barColors = chartData.map(optionObj => {
        if (optionObj.y == questionWithOptionAnalytics.correctAns) {
            return colors.correctOptionBarColor;
        }

        return colors.defaultBarColor;
    })

    const borderColors = chartData.map(optionObj => {
        if (optionObj.y == questionWithOptionAnalytics.correctAns) {
            return colors.correctOptionBorderColor;
        }

        return colors.defaultBorderColor;
    })


    return (
        <div className="border-[1px] border-neutral-800 bg-neutral-950 p-2 rounded-md h-[350px] flex justify-center">
            <Bar
                data={{
                    labels: chartData.map(obj => obj.y),
                    datasets: [{
                        ...defaultDataset,
                        data: chartData,
                        label: "Number of responses",
                        backgroundColor: barColors,
                        borderColor: borderColors
                    }]
                }}
                options={{
                    ...defaultOptions,
                    plugins: {
                        title: {
                            ...defaultOptions.plugins.title,
                            text: questionWithOptionAnalytics.question
                        },
                        legend:{
                            labels:{
                                generateLabels: function (chart) {
                                    const original = ChartJS.defaults.plugins.legend.labels.generateLabels(chart);
                                    return original.map(label => ({
                                        ...label,
                                        fillStyle: colors.defaultBarColor,
                                        strokeStyle: colors.defaultBorderColor
                                    }));
                                }
                            }
                        }
                    }
                }}
            />
        </div>
    )
}

export default QuestionAnalytics;