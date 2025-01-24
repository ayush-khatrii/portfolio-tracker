import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
export default function Holdings() {
  const [stocks, setStocks] = useState([]);

  const holdings = async () => {
    try {
      const resp = await fetch(`${backendUrl}/api/holding/all`);
      const allHoldings = await resp.json();
      console.log("you holding...", allHoldings);
      setStocks(allHoldings.data);
    } catch (err) {
      console.error(err.message);
    }
  }
  useEffect(() => {
    holdings();
  }, []);
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
                stocks.map((holding, index) => (
                  <tr key={index} className="border-b border-zinc-900">
                    <td className="py-2 text-sm px-4">{holding.symbol}</td>
                    <td className="py-2 text-sm px-4">{holding.quantity}</td>
                    <td className="py-2 text-sm px-4">${holding.purchasePrice}</td>
                    <td className="py-2 text-sm px-4">${holding.purchasePrice}</td>
                    <td className="py-2 text-sm px-4">
                      <button className="bg-blue-900 rounded-md px-3 py-1 mr-2 transition duration-300">Edit</button>
                      <button className="bg-red-900 rounded-md px-3 py-1 mr-2 transition duration-300">Delete</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {stocks.length === 0 &&
            <p className=" text-center my-10">No holdings found!</p>
          }
        </div>
      </section>
    </>
  )
}
