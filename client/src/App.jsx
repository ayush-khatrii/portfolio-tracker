import { useEffect, useState } from "react";
import CurrentValue from "./components/CurrentValue";
import InvestedValue from "./components/InvestedValue";
import Navbar from "./components/navbar";
import PortfolioDistribution from "./components/PortfolioDistribution";
import TopPerformingStocks from "./components/TopPerformingStocks";
import TotalGainLoss from "./components/TotalGainLoss";
import { portfolioMetrics } from "./utils";
import PortfolioStocks from "./components/PortfolioStocks";

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const App = () => {
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

  // const sampleData = {
  //   "totalInvestedValue": 868.77,
  //   "totalCurrentValue": 868.3499999999999,
  //   "totalPL": -0.42000000000007276,
  //   "totalPLPercentage": "-0.05"
  // }
  return (
    <>
      <Navbar />
      <section className="min-h-screen text-green-50 overflow-hidden">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 m-3">
          <CurrentValue value={portfolioData} />
          <InvestedValue value={portfolioData} />
          <TotalGainLoss value={portfolioData} />
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-6 m-3" >
          <div className="sm:col-span-2 md:col-span-4">
            <TopPerformingStocks />
          </div>
          <div className="sm:col-span-1 md:col-span-2">
            <PortfolioDistribution />
          </div>
          <div className="col-span-full">
            <PortfolioStocks />
          </div>
        </div>
      </section >
    </>
  )
}

export default App;