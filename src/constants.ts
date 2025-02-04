import { ChartArea, ScriptableContext } from "chart.js";

export const userCharts = {
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

export const userDataSet = {
  // label: "Price",
  // data: [93, 79, 90, 72.58], // Dynamic data points for the Y-axis
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

export const allocationList = [
  {
    label: "POPCAT",
    value: "7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr",
    icon: "https://arweave.net/A1etRNMKxhlNGTf-gNBtJ75QJJ4NJtbKh_UXQTlLXzI",
    proportion: 0,
  },
  {
    label: "WIF",
    value: "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm",
    icon: "https://bafkreibk3covs5ltyqxa272uodhculbr6kea6betidfwy3ajsav2vjzyum.ipfs.nftstorage.link",
    proportion: 0,
  },
  {
    label: "FWOG",
    value: "A8C3xuqscfmyLrte3VmTqrAq8kgMASius9AFNANwpump",
    icon: "/fwog.svg",
    proportion: 0,
  },
  {
    label: "RETARDIO",
    value: "6ogzHhzdrQr9Pgv6hZ2MNze7UrzBMAFyBBWUYp1Fhitx",
    icon: "https://bafkreidx64y72zvdmaysswocovwowtjlxjnh26qh62edql5gmp5rpo5gpm.ipfs.nftstorage.link/",
    proportion: 0,
  },
  {
    label: "MICHI",
    value: "5mbK36SZ7J19An8jFochhQS4of8g6BwUjbeCSxBSoWdp",
    icon: "/michi.svg",
    proportion: 0,
  },
  {
    label: "MOTHER",
    value: "3S8qX1MsMqRbiwKg2cQyx7nis1oHMgaCuc9c4VfvVdPN",
    icon: "/mother.svg",
    proportion: 0,
  },
  {
    label: "Ai16z",
    value: "HeLp6NuQkmYB4pYWo2zYs22mESHXPQYzXbB8n4V98jwC",
    icon: "https://ipfs.io/ipfs/QmcNTVAoyJ7zDbPnN9jwiMoB8uCoJBUP9RGmmiGGHv44yX",
    proportion: 0,
  },
  {
    label: "Griffain",
    value: "KENJSUYLASHUMfHyy5o4Hp2FdNqZg1AsUPhfH2kYvEP",
    icon: "https://griffain.com/logo.png",
    proportion: 0,
  },
  {
    label: "AIXBT",
    value: "14zP2ToQ79XWvc7FQpm4bRnp9d6Mp1rFfsUW3gpLcRX",
    icon: "https://coin-images.coingecko.com/coins/images/51784/large/3.png?1731981138",
    proportion: 0,
  },
  {
    label: "SWARMS",
    value: "74SBV4zDXxTRgv1pEMoECskKBkZHc2yGPnc7GYVepump",
    icon: "https://ipfs.io/ipfs/QmYhYx1r94b8apSJpRjUujCE5xXhzLXzXaR3ZmdGfUkvGb",
    proportion: 0,
  },
  {
    label: "ARC",
    value: "61V8vBaqAGMpgDQi4JcAwo1dmBGHsyhzodcPqnEVpump	",
    icon: "https://ipfs.io/ipfs/QmPDJuEobBcLZihjFCvkWA8c1FiW7UzM2ctFdiffSLxf1d",
    proportion: 0,
  },
  {
    label: "ELIZA",
    value: "5voS9evDjxF589WuEub5i4ti7FWQmZCsAsyD5ucbuRqM",
    icon: "https://ipfs.io/ipfs/QmXRKBceEnjWV1EvDRNLAzMTBCvfzmFajopWevczU7bYY1",
    proportion: 0,
  },
];

export const categoriesOption = ["Meme", "Layer 1/2", "Depin", "AI"];

export function formatNumber(number: number) {
  if (number >= 1e9) {
    return (number / 1e9).toFixed(2) + "B";
  } else if (number >= 1e6) {
    return (number / 1e6).toFixed(2) + "M";
  } else if (number >= 1e3) {
    return (number / 1e3).toFixed(2) + "K";
  } else {
    return number.toFixed(2).toString();
  }
}
