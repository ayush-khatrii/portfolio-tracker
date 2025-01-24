import { useEffect, useState } from "react";
import { getTopPerformingStocks } from "../utils"
import { BarChart, Bar, ResponsiveContainer, Legend, CartesianGrid, LabelList, XAxis, Tooltip, YAxis, Rectangle } from 'recharts';
import { CiTrophy } from "react-icons/ci";

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export default function TopPerformingStocks() {
  const [stockData, setStockData] = useState([]);
  const stocks = async () => {
    try {
      const resp = await fetch(`${backendUrl}/api/holding/all`);
      const allHoldings = await resp.json();
      const stocks = await getTopPerformingStocks(allHoldings.data);
      setStockData(stocks)
      console.log(stocks)
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    stocks();
  }, []);


  return (
    <section className="w-full h-full  border border-zinc-500/15 cursor-pointer rounded">
      <div className="flex justify-between px-6 py-4">
        <h2 className="text-lg font-bold">Top Performing Stocks</h2>
        <CiTrophy className=" h-5 w-5" />
      </div>
      <div className="h-[300px] md:h-[400px] w-full">
        <ResponsiveContainer>
          <BarChart data={stockData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
            {/* X and Y Axes */}
            <XAxis dataKey="symbol" tickLine={false} axisLine={false} />
            {/* <YAxis /> */}
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

            <Bar dataKey="price" fill="#4CAF50" radius={2}>
              <LabelList position="top" offset={5} fontSize={10} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
