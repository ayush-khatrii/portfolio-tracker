import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LuMoveLeft } from "react-icons/lu";

export default function AddStock() {
  const [symbol, setSymbol] = useState("");
  const [selectedShare, setSelectedShare] = useState()
  const [share, setShare] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetchShareDetails = async (share) => {
    try {
      const response = await fetch(`https://financialmodelingprep.com/api/v3/quote-order/${share}?apikey=ydSmVlnBzOvzZ3mv1hBSAP2sLBfVinz2`);
      const data = await response.json();
      console.log(data[0])
      setSelectedShare(data[0]);
    } catch (error) {
      setError(error);
      console.error(error);
    }
    finally {
      setIsLoading(false)
    }
  };
  const fetchShares = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`https://financialmodelingprep.com/api/v3/search?query=${symbol.toUpperCase()}&apikey=ydSmVlnBzOvzZ3mv1hBSAP2sLBfVinz2&limit=10`);
      const data = await response.json();
      setShare(data);
    } catch (error) {
      setError(error);
      console.error(error);
    }
    finally {
      setIsLoading(false)
    }
  };


  return (
    <section className="max-w-7xl mx-auto px-5 mt-10">
      <Link to="/" className="group">
        <button className=" hover:underline flex items-center gap-2 hover:border hover:border-zinc-900 px-3 py-2 rounded-md">
          <LuMoveLeft className="group-hover:-translate-x-1  transition-transform" /> back
        </button>
      </Link>
      <h2 className="md:text-3xl text-xl font-bold text-center my-8">Add New Stock</h2>
      <div className="space-y-4">
        <div>
          <div className="flex justify-center items-center gap-3">
            <input
              id="symbol"
              name="symbol"
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              placeholder="Search for a stock"
              className="w-full p-3 border border-zinc-900 rounded-lg bg-transparent "
            />
            <button
              onClick={fetchShares}
              className="bg-teal-600 text-white py-3 px-5 rounded-lg hover:bg-teal-700 transition-colors">
              Search
            </button>
          </div>
          {error &&
            <div className="text-red-500 my-2">
              {error.message}
            </div>
          }
          {isLoading &&
            <div className="py-5">
              Loading...
            </div>
          }

          {
            selectedShare &&
            <div className="flex bg-teal-950/15 justify-between items-center p-4 mt-5 rounded-md">
              <div className="flex flex-col">
                <p className="text-sm text-teal-600">
                  {selectedShare.symbol}
                </p>
                <h1 className="text-xl font-bold">
                  {selectedShare.name}
                </h1>
              </div>
              <div className="flex  justify-center items-center flex-col text-xl font-bold">
                <span>
                  {selectedShare.price}
                </span>
                <span className={`${selectedShare.changesPercentage || selectedShare.change < 0 ? "text-red-500" : "text-green-700"} text-sm font-light `}>
                  {selectedShare.change} {""}
                  {`(${selectedShare.changesPercentage})`}
                </span>
              </div>
            </div>
          }

          {!selectedShare &&
            <ul>
              {
                share && share.map((item) =>
                  <li
                    onClick={() => fetchShareDetails(item?.symbol)}
                    className="p-5 flex justify-between mt-3 border border-zinc-900 cursor-pointer items-center rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-teal-600">
                        {item.symbol}
                      </p>
                      <h1 className="text-xl font-bold">
                        {item.name}
                      </h1>
                    </div>
                  </li>
                )
              }
            </ul>
          }

        </div>
        <div>
          <label htmlFor="shares" className="block text-sm font-medium mb-2">
            Number of Shares
          </label>
          <input
            id="shares"
            name="shares"
            type="number"
            min="0"
            step="1"
            placeholder="0"
            className="w-full p-3 border border-zinc-900 rounded-lg bg-transparent "
          />
        </div>
      </div>
      <div className="flex gap-4 mt-5">
        <button
          className="flex-1 bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors"
        >
          Add Stock
        </button>
      </div>
    </section >
  );
}