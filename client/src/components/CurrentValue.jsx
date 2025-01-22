import { useEffect, useState } from "react";
import { portfolioMetrics } from "../utils";

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export default function CurrentValue() {
  const [portfolioData, setPortfolioData] = useState({
    totalInvestedValue: 0,
    totalCurrentValue: 0,
    totalPL: 0,
    totalPLPercentage: 0
  });

  const portfolioValue = async () => {
    try {
      const resp = await fetch(`${backendUrl}/api/holding/all`);
      const allHoldings = await resp.json();
      console.log(allHoldings);
      const metrics = await portfolioMetrics(allHoldings.data);
      console.log('all_metrics', metrics);
      setPortfolioData(metrics);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    portfolioValue();
  }, []);

  return (
    <div className="w-full px-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Current Value Card */}
        <div className="card p-6 rounded-xl bg-white/5 hover:bg-white/10">
          <div className="text-center">
            <h1 className="opacity-50 my-2">Current Value</h1>
            <div>
              <h1 className="text-4xl font-bold">
                <span className="text-xl font-medium">₹</span>
                {`${portfolioData.totalCurrentValue?.toLocaleString()}`}
              </h1>
              <div className="mt-1">
                {/* <span className="text-green-500 p-2">0.455</span>
                <span className="text-green-500">{`(+1.23%)`}</span> */}
              </div>
            </div>
          </div>
        </div>

        {/* Invested Value Card */}
        <div className="card p-6 rounded-xl bg-white/5 hover:bg-white/10">
          <div className="text-center">
            <h1 className="opacity-50 my-2">Invested Value</h1>
            <div>
              <h1 className="text-4xl font-bold">
                <span className="text-xl font-medium">₹</span>
                {`${portfolioData.totalInvestedValue?.toLocaleString()}`}
              </h1>
              <div className="mt-1">
                {/* <span className="text-green-500 p-2">0.455</span>
                <span className="text-green-500">{`(+1.23%)`}</span> */}
              </div>
            </div>
          </div>
        </div>

        {/* Overall P&L Card */}
        <div className="card p-6 rounded-xl bg-white/5 hover:bg-white/10">
          <div className="text-center">
            <h1 className="opacity-50 my-2">Overall P&L</h1>
            <div>
              <h1
                className={`text-4xl ${portfolioData.totalPL < 1 ? "text-red-500 " : "text-green-500 "} font-bold`}
              >
                <span className="text-xl font-medium">₹</span>
                {`${portfolioData.totalPL?.toLocaleString()}`}
              </h1>
              <div className="mt-1">
                <span
                  className={`text-sm ${portfolioData.totalPL < 1 ? "text-red-500 " : "text-green-500 "}`}
                >{`(${portfolioData.totalPLPercentage}%)`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}