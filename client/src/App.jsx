import { useEffect, useState } from "react";
import CurrentValue from "./components/CurrentValue";
import InvestedValue from "./components/InvestedValue";
import Navbar from "./components/navbar";
import PortfolioDistribution from "./components/PortfolioDistribution";
import TopPerformingStocks from "./components/TopPerformingStocks";
import TotalGainLoss from "./components/TotalGainLoss";
import { portfolioMetrics } from "./utils";

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
  return (
    <>
      <Navbar />
      <section className="min-h-screen text-green-50 overflow-hidden">
        {/* <h1 className="font-bold text-2xl mx-4 my-5">Dashboard</h1> */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 m-3">
          <CurrentValue value={portfolioData} />
          <InvestedValue value={portfolioData} />
          <TotalGainLoss value={portfolioData} />
          <div>
            <TopPerformingStocks />
          </div>
        </div>
      </section >
    </>
  )
}

export default App;