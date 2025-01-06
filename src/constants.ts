import { ChartArea, ScriptableContext } from "chart.js";

export const userChart = {
  labels: ["Sept 07", "Oct 29", "Nov 05", "Dec 07"], // Dynamic labels for the X-axis
  datasets: [
    {
      label: "Price",
      data: [93, 79, 90, 72.58], // Dynamic data points for the Y-axis
      fill: true,
      tension: 0,
      pointBackgroundColor: "transparent",
      pointBorderColor: "transparent",
      pointHoverBorderColor: "#78DA89",
      pointHoverBackgroundColor: "#78DA89",
      pointHoverBorderWidth: 4,
      pointHoverRadius: 4,
      pointWidth: 5,
      pointRadius: 4,
      borderColor: "#78DA89",
      borderWidth: 3,
      backgroundColor: (context: ScriptableContext<"line">) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) return "rgba(30, 203, 79, 0)"; // Default fallback
        return getGradient(ctx, chartArea);
      },
    },
  ],
};

export const transactionChart = {
  labels: ["Sept 07", "Oct 29", "Nov 05", "Dec 07"], // Dynamic labels for the X-axis
  datasets: [
    {
      label: "Buy",
      data: [93, 79, 90, 72.58], // Dynamic data points for the Y-axis
      fill: false,
      tension: 0,
      borderColor: "#78DA89",
      pointBackgroundColor: "#78DA89",
    },
    {
      label: "Sell",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: "#E87975",
      pointBackgroundColor: "#E87975",
      tension: 0,
    },
  ],
};

const getGradient = (ctx: CanvasRenderingContext2D, chartArea: ChartArea) => {
  const gradient = ctx.createLinearGradient(
    0,
    chartArea.top,
    0,
    chartArea.bottom
  );
  gradient.addColorStop(0, "#78DA8978");
  gradient.addColorStop(1, "#78DA8900");
  return gradient;
};
