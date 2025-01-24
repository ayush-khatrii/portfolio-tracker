import { useEffect } from "react";
import { fetchSector } from "../utils";
import { useState } from "react";
import { Cell, Pie, Tooltip, PieChart, ResponsiveContainer, Legend } from "recharts";
import { CiTrophy } from "react-icons/ci";

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export default function PortfolioDistribution() {
  const [stockSector, setStockSector] = useState([]);

  const getAllStocks = async () => {
    try {
      const resp = await fetch(`${backendUrl}/api/holding/all`);
      const allHoldings = await resp.json();
      const stocksWithSector = await fetchSector(allHoldings.data);
      setStockSector(stocksWithSector);
    } catch (error) {
      console.log(error);
    }
  };

  //   [
  //     {
  //         "symbol": "AAPL",
  //         "sector": "Technology"
  //     },
  //     {
  //         "symbol": "GOOGL",
  //         "sector": "Communication Services"
  //     },
  //     {
  //         "symbol": "MSFT",
  //         "sector": "Technology"
  //     }
  // ]

  const allSectorColors = {
    "Basic Materials": "#FF6347",
    "Communication Services": "#32CD32",
    "Consumer Cyclical": "#FFD700",
    "Consumer Defensive": "#8A2BE2",
    "Energy": "#FF4500",
    "Financial Services": "#00BFFF",
    "Healthcare": "#8B008B",
    "Industrials": "#DC143C",
    "Real Estate": "#2E8B57",
    "Technology": "#1E90FF",
    "Utilities": "#A52A2A"
  };

  useEffect(() => {
    getAllStocks();
  }, []);
  return (
    <div className="w-full h-full  border border-zinc-500/15 cursor-pointer rounded">
      <div className="flex justify-between px-6 py-4">
        <h2 className="text-lg font-bold">Portfolio Distribution</h2>
        <CiTrophy className=" h-5 w-5" />
      </div>
      <div className="h-[300px] md:h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={500} height={500}>
            <Pie
              data={stockSector}
              dataKey="count"
              nameKey="sector"
              outerRadius={80}
              cx="50%" cy="50%"
              fill="#8884d8"
            >
              {stockSector.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={allSectorColors[entry.sector] || "#8884d8"} // Default color if sector is not found
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#000",
                borderRadius: "2px",
                border: "none",
              }}
              itemStyle={{
                color: "#fff",
              }}
              cursor={{ fill: "rgba(0, 0, 0, 0.5)" }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
