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
    totalInvestedValue: 0.00,
    totalCurrentValue: 0,
    totalPL: 0,
    totalPLPercentage: 0
  });

  const [loading, setLoding] = useState(false);

  const portfolioValue = async () => {
    setLoding(true)
    try {
      const resp = await fetch(`${backendUrl}/api/holding/all`);
      const allHoldings = await resp.json();
      const metrics = await portfolioMetrics(allHoldings.data);

      setPortfolioData(metrics);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoding(false);
    }
  }
  useEffect(() => {
    portfolioValue();
  }, []);

  return (
    <>
      <Navbar />
      <section className="min-h-screen text-green-50 overflow-hidden">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 m-3">
          <CurrentValue loading={loading} value={portfolioData} />
          <InvestedValue loading={loading} value={portfolioData} />
          <TotalGainLoss loading={loading} value={portfolioData} />
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-6 m-3" >
          <div className="sm:col-span-2 md:col-span-4">
            <TopPerformingStocks />
          </div>
          <div className="sm:col-span-4 md:col-span-2">
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