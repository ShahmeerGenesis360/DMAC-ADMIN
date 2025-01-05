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
    // Chart data
    const transactions = [
        { day: "01", type: "buy", value: 3000 },
        { day: "01", type: "sell", value: 1000 },
        { day: "01", type: "buy", value: 2000 },
        { day: "02", type: "sell", value: 800 },
        { day: "02", type: "buy", value: 2500 },
        { day: "02", type: "sell", value: 1200 },
        { day: "03", type: "buy", value: 5000 },
        { day: "03", type: "sell", value: 3500 },
        { day: "04", type: "sell", value: 4000 },
        { day: "04", type: "buy", value: 4500 },
        { day: "05", type: "buy", value: 6000 },
        { day: "05", type: "sell", value: 5500 },
        { day: "06", type: "buy", value: 8000 },
        { day: "06", type: "sell", value: 4500 },
        { day: "07", type: "sell", value: 7000 },
        { day: "07", type: "buy", value: 7500 },
    ];

    const labels = [...new Set(transactions.map(t => t.day))];
    const data = {
        labels,
        datasets: [
            {
                label: "Buy",
                data: transactions.map((t) => (t.type === "buy" ? t.value : 0)),
                backgroundColor: "#78DA89",
                borderRadius: 2,
                barPercentage: 0.4,
                categoryPercentage: 0.4,
                borderColor: "#78DA89",
                pointBackgroundColor: "#78DA89",
            },
            {
                label: "Sell",
                data: transactions.map((t) => (t.type === "sell" ? -t.value : 0)),
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
                stacked: false,
                ticks: {
                    color: "#d1d5db",
                },
                grid: {
                    display: false,
                },
            },
            y: {
                stacked: false,
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
