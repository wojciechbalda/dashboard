import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { CryptocurrencyChartDataType } from "./Cryptocurrency";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const generateLabel = (dateAsString: string) => {
  const date = new Date(dateAsString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  return `${formattedDay}-${formattedMonth}-${year} ${formattedHours}:${formattedMinutes}`;
};

const CryptocurrencyPricesChart = ({
  cryptocurrencyData,
  cryptocurrencyName,
}: {
  cryptocurrencyData: CryptocurrencyChartDataType;
  cryptocurrencyName: string;
}) => {
  const prices = cryptocurrencyData.map((entry) => entry.priceUsd);
  const labels = cryptocurrencyData.map((entry) => generateLabel(entry.date));
  const color =
    prices[prices.length - 1] - prices[0] > 0
      ? "rgb(25, 233, 95)"
      : "rgb(227, 30, 30)";

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      colors: {
        forceOverride: true,
      },
    },
    scales: {
      y: {
        ticks: {
          color: "white",
        },
      },
      x: {
        ticks: {
          color: "white",
          callback: (tick: number) => {
            return labels[tick]?.slice(-2) === "00"
              ? labels[tick].slice(-5)
              : null;
          },
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        fill: false,
        label: `${cryptocurrencyName} prices in $`,
        data: prices,
        borderColor: color,
        backgroundColor: color,
        pointBackgroundColor: color,
        pointBorderColor: color,
        pointHoverBorderColor: color,
        pointHoverBackgroundColor: color,
        color: color,
        pointRadius: 2.5,
        pointHoverRadius: 2.5,
      },
    ],
  };


  return (
    <div style={{ position: "relative", height: "100%", maxWidth: "100%" }}>
      {/* 
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore */}
      <Line options={options} data={data} updateMode="active" />
    </div>
  );
};

export default CryptocurrencyPricesChart;
