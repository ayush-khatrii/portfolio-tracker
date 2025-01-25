import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
const apikey = import.meta.env.VITE_REACT_APP_API_KEY;
export default function Holdings() {
  const [stocks, setStocks] = useState([]);

  const holdings = async () => {
    const resp = await fetch(`${backendUrl}/api/holding/all`);
    if (!resp.ok) throw new Error('Failed to fetch holdings');
    const allHoldings = await resp.json();
    const stocksData = allHoldings.data;

    return stocksData;
  };

  const getRealTimePrices = async (stocks) => {
    const symbols = stocks.map((stock) => stock.symbol).join(",");
    const resp = await fetch(`https://financialmodelingprep.com/api/v3/quote-short/${symbols}?apikey=${apikey}`);

    if (!resp.ok) {
      throw new Error("Failed to fetch real-time prices");
    }
    const allPrices = await resp.json();
    const data = allPrices.map(stock => ({
      symbol: stock.symbol,
      price: stock.price
    }));
    return data;
  };

  const { data: holdingsData, isLoading, error } = useQuery({
    queryKey: ['holdings'],
    queryFn: holdings,
  });


  const { data: realTimeStockPrice, isLoading: isLoadingPrice, error: currentPriceError } = useQuery({
    queryKey: ['realtime-price'],
    queryFn: () => getRealTimePrices(holdingsData),
    enabled: !!holdingsData,
    refetchInterval: 10000,
    staleTime: 5000,
    gcTime: 30000,
    retry: 3

  });


  // combine the holdings data with the real-time stock prices
  const combinedData = holdingsData?.map((holding) => {
    const currentStock = realTimeStockPrice?.find((stock) => stock.symbol === holding.symbol);
    return {
      ...holding,
      currentPrice: currentStock?.price ?? holding.purchasePrice
    }
  });




  if (error) {
    <div>Error loading holdings</div>
  }
  if (currentPriceError) {
    <div>Error.. {currentPriceError}</div>
  }

  return (
    <>
      <Navbar />
      <section className="container mx-auto px-3">
        <div className="flex justify-between my-5 items-center w-full">
          <h1 className="md:text-xl text-lg font-bold md:mb-0 px-3">All Your Holdings</h1>
          <Link to="/add/holding" className="flex items-center">
            <button
              className="inline-flex justify-center items-center text-sm px-3 py-2 bg-emerald-950 rounded-md w-auto text-center text-white hover:bg-emerald-800 transition duration-300">
              <MdAdd className="mr-1" /> Add Stock
            </button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-zinc-900">
                <th className="py-2 font-extrabold px-4 text-left leading-tight">Stock</th>
                <th className="py-2 font-extrabold px-4 text-left leading-tight">Quantity</th>
                <th className="py-2 font-extrabold px-4 text-left leading-tight">Avg. Price</th>
                <th className="py-2 font-extrabold px-4 text-left leading-tight">Current Price</th>
                <th className="py-2 font-extrabold px-4 text-left leading-tight">Actions</th>
              </tr>
            </thead>
            <tbody>

              {
                combinedData && combinedData?.map((holding, index) => (
                  <tr key={index} className="border-b border-zinc-900">
                    <td className="py-2 text-sm px-4">{holding.symbol}</td>
                    <td className="py-2 text-sm px-4">{holding.quantity}</td>
                    <td className="py-2 text-sm px-4">${holding.purchasePrice}</td>
                    {
                      isLoadingPrice ?
                        <td className="py-2 text-sm px-4">
                          <div className="animate-pulse flex space-x-4">
                            <div className="flex space-y-4 py-1">
                              <div className="h-4 bg-gray-300 rounded w-20"></div>
                            </div>
                          </div>
                        </td> :
                        <td className="py-2 text-sm px-4">${holding.currentPrice}</td>
                    }
                    <td className="py-2 text-sm px-4">
                      <button className="bg-blue-900 rounded-md px-3 py-1 mr-2 transition duration-300">Edit</button>
                      <button className="bg-red-900 rounded-md px-3 py-1 mr-2 transition duration-300">Delete</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {
            isLoading &&
            <p className="text-center my-10">Loading...</p>
          }
          {/* {stocks.length === 0 &&
            <p className=" text-center my-10">No holdings found!</p>
          } */}
        </div>
      </section>
    </>
  )
}
