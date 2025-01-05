import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
    const data = {
        labels: Array.from({ length: 30 }, (_, i) => i + 1), // Days of the month
        datasets: [
            {
                label: "Buy",
                data: [500, 600, 700, 0, 0, 0, 800, 900, 1000, 0, 0, 0, 1200, 1300, 1500, 0, 0, 0, 700, 800, 900, 0, 0, 0, 1000, 1100, 1200, 0, 0, 0],
                backgroundColor: "#78DA89",
                borderRadius: 2,
                barPercentage: 0.4,
                categoryPercentage: 0.4,
                borderColor: "#78DA89",
                pointBackgroundColor: "#78DA89",
            },
            {
                label: "Sell",
                data: [0, 0, 0, -400, -500, -600, 0, 0, 0, -700, -800, -900, 0, 0, 0, -1000, -1100, -1200, 0, 0, 0, -500, -600, -700, 0, 0, 0, -800, -900, -1000],
                backgroundColor: "#E87975",
                borderRadius: 2,
                barPercentage: 0.4,
                categoryPercentage: 0.4,
                borderColor: "#E87975",
                pointBackgroundColor: "#E87975",
            },
        ],
    };

    // Chart options
    const options: ChartOptions<"bar"> = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true,
                ticks: {
                    color: "#d1d5db",
                },
                grid: {
                    display: false,
                },
            },
            y: {
                stacked: true,
                // type: "logarithmic",
                ticks: {
                    color: "#fff",
                },
                grid: {
                    color: "#B1B1B1",
                },
            },
        },
        plugins: {
            legend: {
                display: true,
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
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <div style={{ height: "300px" }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;
