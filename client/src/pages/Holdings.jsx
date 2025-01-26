import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
const apikey = import.meta.env.VITE_REACT_APP_API_KEY;
export default function Holdings() {
  const queryClient = useQueryClient();

  const holdings = async () => {
    const resp = await fetch(`${backendUrl}/api/holding/all`);
    if (!resp.ok) throw new Error('Failed to fetch holdings');
    const allHoldings = await resp.json();
    const stocksData = allHoldings.data;
    return stocksData;
  };

  const handleDeleteHoldings = async (id) => {
    try {
      const resp = await fetch(`${backendUrl}/api/holding/${id}/delete`, {
        method: 'DELETE',
      });
      if (!resp.ok) {
        const errorResponse = await resp.json();
        const errorMessage = errorResponse.message || "Failed to delete holding. Please try again.";
        throw new Error(errorMessage);
      }
      toast.success("Holding deleted successfully!");
      await holdings();

      queryClient.setQueryData(['holdings'], (oldData) =>
        oldData ? oldData.filter((holding) => holding.id !== id) : []
      );
      queryClient.invalidateQueries(['holdings']);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  }

  const getRealTimePrices = async (stocks) => {
    const symbols = stocks.map((stock) => stock.symbol).join(",");
    const resp = await fetch(`https://financialmodelingprep.com/api/v3/quote-short/${symbols}?apikey=${apikey}`);

    if (!resp.ok) {
      const errorResponse = await resp.json();
      throw new Error(errorResponse.message);
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
    staleTime: 5000,
    gcTime: 20000,
  });


  const { data: realTimeStockPrice, isLoading: isLoadingPrice, error: currentPriceError } = useQuery({
    queryKey: ['realtime-price'],
    queryFn: () => getRealTimePrices(holdingsData),
    enabled: holdingsData?.length > 0,
    refetchInterval: 10000,
    staleTime: 20000,
    gcTime: 30000,
    retry: 3
  });


  const combinedData = holdingsData?.map((holding) => {
    const currentStock = realTimeStockPrice?.find((stock) => stock.symbol === holding.symbol);
    const currentPrice = currentStock?.price ?? holding.purchasePrice;
    return {
      ...holding,
      currentPrice,
      currentTotalValue: Number(currentPrice) * Number(holding.quantity)
    }
  });



  if (error) {
    <div>Error loading holdings</div>
  }
  if (currentPriceError) {
    <div>Error.. {currentPriceError}</div>
  }

  return (
    <section>
      <Navbar />
      <section className="w-full md:px-3">
        <div className="flex justify-between px-5 my-5 items-center w-full">
          <h1 className="md:text-xl text-base font-bold">All Your Holdings</h1>
          <Link to="/add/holding" className="flex items-center">
            <button
              className="inline-flex justify-center items-center text-xs px-3 py-2 bg-emerald-950 rounded-md w-auto text-center text-white hover:bg-emerald-800 transition duration-300">
              <MdAdd className="mr-1" /> Add Stock
            </button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="text-sm">
              <tr className="bg-zinc-900">
                <th className="py-2 font-semibold px-4 text-left">Stock</th>
                <th className="py-2 font-semibold px-4 text-left">Symbol</th>
                <th className="py-2 font-semibold px-4 text-left">Quantity</th>
                <th className="py-2 font-semibold px-4 text-left">Avg. Price</th>
                <th className="py-2 font-semibold px-4 text-left">Current Price</th>
                <th className="py-2 font-semibold px-4 text-left">Current Value</th>
                <th className="py-2 font-semibold px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                combinedData && combinedData?.map((holding, index) => (
                  <tr key={index} className="border-b border-zinc-900">
                    <td className="py-2 text-sm px-4">{holding.name}</td>
                    <td className="py-2 text-sm px-4">{holding.symbol}</td>
                    <td className="py-2 text-sm px-4">{holding.quantity}</td>
                    <td className="py-2 text-sm px-4">${holding.purchasePrice}</td>
                    {
                      isLoadingPrice ?
                        <td className="py-2 text-sm px-4">
                          <div className="animate-pulse flex space-x-4">
                            <div className="flex space-y-4 py-1">
                              <div className="h-4 bg-gray-500 rounded w-20"></div>
                            </div>
                          </div>
                        </td> :
                        <td className="py-2 text-sm px-4">${holding.currentPrice.toFixed(2)}</td>
                    }
                    <td className="py-2 text-sm px-4">
                      ${holding.currentTotalValue.toFixed(2)}
                    </td>
                    <td className="py-2 flex text-sm px-4">
                      <Link to={`/edit/holding/${holding.id}`}>
                        <button className="bg-blue-900 rounded-md px-3 py-1 mr-2 transition duration-300">Edit</button>
                      </Link>
                      <button
                        onClick={() => handleDeleteHoldings(holding.id)}
                        className="bg-red-900 rounded-md px-3 py-1 mr-2 transition duration-300">Delete</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {
            isLoading &&
            <p className="text-center my-10">Loading...</p>
          }
          {holdingsData?.length < 1 &&
            <p className=" text-center my-10">No holdings found!</p>
          }
        </div>
      </section>
    </section>
  )
}
