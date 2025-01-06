import React, { useRef } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);


interface IProps {
    legend?: boolean;
    data: any;
}

const LineChart = ({ data, legend = false }: IProps) => {
    const chartRef = useRef(null);

    // const getGradient = (ctx: CanvasRenderingContext2D, chartArea: ChartArea) => {
    //     const gradient = ctx.createLinearGradient(
    //         0,
    //         chartArea.top,
    //         0,
    //         chartArea.bottom
    //     );
    //     gradient.addColorStop(0, "#78DA8978");
    //     gradient.addColorStop(1, "#78DA8900");
    //     return gradient;
    // };

    // Chart data configuration
    // const data = {
    //     labels: ["Sept 07", "Oct 29", "Nov 05", "Dec 07"], // Dynamic labels for the X-axis
    //     datasets: [
    //         {
    //             label: "Price",
    //             data: [93, 79, 90, 72.58],// Dynamic data points for the Y-axis
    //             fill: true,
    //             tension: 0,
    //             pointBackgroundColor: "transparent",
    //             pointBorderColor: 'transparent',
    //             pointHoverBorderColor: "#78DA89",
    //             pointHoverBackgroundColor: "#78DA89",
    //             pointHoverBorderWidth: 4,
    //             pointHoverRadius: 4,
    //             pointWidth: 5,
    //             pointRadius: 4,
    //             borderColor: '#78DA89',
    //             borderWidth: 3,
    //             backgroundColor: (context: ScriptableContext<"line">) => {
    //                 const chart = context.chart;
    //                 const { ctx, chartArea } = chart;
    //                 if (!chartArea) return "rgba(30, 203, 79, 0)"; // Default fallback
    //                 return getGradient(ctx, chartArea);
    //             },
    //         },
    //         {
    //             label: 'My First Dataset',
    //             data: [65, 59, 80, 81, 56, 55, 40],
    //             fill: false,
    //             borderColor: 'rgb(75, 192, 192)',
    //             tension: 0.1
    //         }
    //     ],
    // };

    // Chart options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    color: "#d1d5db",
                },
                grid: {
                    display: false,
                },
            },
            y: {
                ticks: {
                    color: "#fff",
                    font: { family: "Poppins", size: 12 },
                    callback: (value: number | string) => `$${value}`,
                    stepSize: 20,
                },
                grid: {
                    color: "#B1B1B1",
                    drawTicks: true,
                },
            },
        },
        plugins: {
            legend: {
                display:
                    legend ?? false
                ,
                position: 'top' as const,
                align: 'end' as const,
                labels: {
                    generateLabels: (chart: any) => {
                        return chart.data.datasets.map((dataset: any, index: number) => ({
                            text: dataset.label,
                            fillStyle: dataset.borderColor, // Background color for legend items
                            fontColor: dataset.borderColor, // Font color dynamically set from dataset
                            hidden: !chart.isDatasetVisible(index),
                            datasetIndex: index,
                            pointStyle: dataset.pointStyle || "circle",
                            strokeStyle: dataset.borderColor, // Border color for legend icons
                        }));
                    },
                    boxWidth: 4,
                    usePointStyle: true, // Use dots instead of lines for legend
                    pointStyle: "circle", // Shape of the points
                    pointStyleWidth: 5,
                    boxHeight: 4, // Add spacing between items
                    font: {
                        size: 14
                    },
                },
                padding: 20,
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <div style={{ height: '300px' }}>
            <Line height={50} ref={chartRef} data={data} options={options} />
        </div>
    );
};

export default LineChart;
