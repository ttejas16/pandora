import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const dummyData = [
    { x: 0, y: 1 },
    { x: 1, y: 5 },
    { x: 2, y: 8 },
    { x: 3, y: 12 },
    { x: 4, y: 15 },
    { x: 5, y: 20 },
    { x: 6, y: 18 },
    { x: 7, y: 10 },
    { x: 8, y: 10 },
    { x: 9, y: 10 },
    { x: 10, y: 10 },
];

const defaultDataset = {
    label: "",
    data: [],
    borderWidth: 2,
    backgroundColor: '#d946ef77',
    borderColor: '#c026d3',
    maxBarThickness: 100,
    minBarThickness: 10,
    borderRadius: 3
}

const defaultOptions = {
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
                text: '',
                color: "#a3a3a3"
            }
        },
        y: {
            grid: {
                color: "#52525230"
            },
            title: {
                display: true,
                text: '',
                color: "#a3a3a3"
            }
        },

    },
}

function MarkDistributionChart({ xLabel, yLabel, chartData }) {

    return (
        <Bar
            data={{
                labels: chartData.map(obj => obj.x),
                datasets: [{
                    ...defaultDataset,
                    label: yLabel,
                    data: chartData,
                }]
            }}
            options={{
                ...defaultOptions,
                scales: {
                    x: {
                        ...defaultOptions.scales.x,
                        title: {
                            ...defaultOptions.scales.x.title,
                            text: xLabel
                        }
                    },
                    y: {
                        ...defaultOptions.scales.y,
                        title: {
                            ...defaultOptions.scales.y.title,
                            text: yLabel
                        }
                    }
                }
            }}

        />
    )
}

export default MarkDistributionChart;