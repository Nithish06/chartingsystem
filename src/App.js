import { useEffect, useState } from "react";
import "./App.css";
import gameData from "./datasample.csv";
import { Bar } from "react-chartjs-2";
import Papa from "papaparse";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});
  const [option, selectedOption] = useState("Date");

  const handleSelectChange = (e) => {
    selectedOption(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    Papa.parse(gameData, {
      download: true,
      header: true,
      dynamicTyping: true,
      delimiter: "",
      complete: (result) => {
        console.log(result);
        setChartData({
          labels: result.data
            .map((item, index) => [item[option]])
            .filter(String),
          datasets: [
            {
              label: option,
              data: result.data
                .map((item, index) => [item["Daily Users"]])
                .filter(Number),
              borderColor: "black",
              backgroundColor: "red",
            },
          ],
        });
        setChartOptions({
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Daily Users",
            },
          },
        });
      },
    });
  }, [option]);

  return (
    <div style={{ width: "90vw", height: "90vh", margin: "0 auto" }}>
      <h1>Charting System</h1>
      <div>
        <label for="pet-select">Choose a option to display users by:</label>

        <select
          style={{
            padding: "4px",
            margin: "4px",
          }}
          name="analytics"
          value={option}
          onChange={(e) => {
            handleSelectChange(e);
          }}>
          <option value="Ad Network">Ad Network</option>
          <option value="App">App</option>
          <option value="Country">Country</option>
          <option value="Date">Date</option>
          <option value="Platform">Platform</option>
        </select>
      </div>
      {chartData.datasets.length > 0 ? (
        <div>
          <Bar options={chartOptions} data={chartData} />
        </div>
      ) : (
        <div>Loading results</div>
      )}
    </div>
  );
}

export default App;
