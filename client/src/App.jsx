import CurrentValue from "./components/CurrentValue";
import Navbar from "./components/navbar";
import PortfolioDistribution from "./components/PortfolioDistribution";
import TopPerformingStocks from "./components/TopPerformingStocks";

const App = () => {
  return (
    <>
      <Navbar />
      <section className="min-h-screen text-emerald-50">
        {/* <h1 className="font-bold text-2xl mx-4 my-5">Dashboard</h1> */}
        <div className="mt-5">
          <CurrentValue />
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          <div className="col-span-6 mt-[1rem]">
            <TopPerformingStocks />
          </div>
          <div className="col-span-6 mt-[1rem]">
            <PortfolioDistribution />
          </div>
        </div>
      </section>
    </>
  )
}

export default App;