import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export default function PortfolioStocks() {
  const [stocks, setStocks] = useState([]);

  const holdings = async () => {
    try {
      const resp = await fetch(`${backendUrl}/api/holding/all`);
      const allHoldings = await resp.json();
      const reversedArray = allHoldings.data.reverse();
      setStocks(reversedArray)
    } catch (err) {
      console.error(err.message);
    }
  }
  useEffect(() => {
    holdings();
  }, []);


  return (
    <div className="w-full h-full border border-zinc-500/15 cursor-pointer rounded max-w-full p-4">
      <div className="flex items-center mb-2 justify-between px-3 py-4">
        <h1 className="text-lg font-bold ">Recent Purchases</h1>
        <Link to={`/holdings`}>
          <button className="text-sm px-2 py-1 bg-green-800 hover:bg-green-900 duration-100 transition-all rounded ">
            View All
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full h-auto">
          <thead className="text-sm">
            <tr className="border-b border-white/10">
              <th className="text-left py-2 px-4 text-gray-400 font-medium">Symbol</th>
              <th className="text-left py-2 px-4 text-gray-400 font-medium">Stock</th>
              <th className="text-right py-2 px-4 text-gray-400 font-medium">Qty</th>
              <th className="text-right py-2 px-4 text-gray-400 font-medium">Purchase Price</th>
            </tr>
          </thead>
          <tbody>
            {stocks.slice(0, 4)?.map((stock, index) => (
              <tr
                key={index}
                className="border-b text-sm md:text-base cursor-pointer border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="p-3">{stock.symbol}</td>
                <td className="py-2 px-4">
                  <div className="flex flex-col">
                    <span className="font-medium">{stock.name}</span>
                  </div>
                </td>
                <td className="py-2 px-4 text-right">
                  <span className="text-zinc-300">{stock.quantity}</span>
                </td>
                <td className="py-2 px-4 text-right">
                  <span className="font-medium">$   {stock.purchasePrice}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {stocks.length === 0 && <p className="my-20 text-center opacity-60">No Stocks found!</p>}
      </div>
    </div>
  );
}
