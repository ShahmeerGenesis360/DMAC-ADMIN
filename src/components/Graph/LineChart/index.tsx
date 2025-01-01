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
    ChartArea,
    ScriptableContext,
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
    Filler
);


const LineChart = () => {
    const chartRef = useRef(null);

    const getGradient = (ctx: CanvasRenderingContext2D, chartArea: ChartArea) => {
        const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
        );
        gradient.addColorStop(0, "rgba(30, 203, 79, 1)");
        gradient.addColorStop(1, "rgba(30, 203, 79, 0)");
        return gradient;
    };

    // Chart data configuration
    const data = {
        labels: ["Sept 07", "Oct 29", "Nov 05", "Dec 07"], // Dynamic labels for the X-axis
        datasets: [
            {
                label: "Price",
                data: [93, 79, 90, 72.58],// Dynamic data points for the Y-axis
                fill: true,
                tension: 0.4,
                pointBorderColor: "rgba(72, 187, 120, 1)",
                pointBackgroundColor: "rgba(72, 187, 120, 1)",
                pointRadius: 0,
                pointHoverRadius: 5,
                borderWidth: 0,
                backgroundColor: (context: ScriptableContext<"line">) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) return "rgba(30, 203, 79, 0)"; // Default fallback
                    return getGradient(ctx, chartArea);
                },
            },
        ],
    };

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
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
    };

    return (
        <div style={{height: '300px'}}>
            <Line height={50} ref={chartRef} data={data} options={options} />
        </div>
    );
};

export default LineChart;
