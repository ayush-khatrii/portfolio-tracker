import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Holdings() {
  const holdings = [
    // {
    //   symbol: "AAPL",
    //   quantity: 10,
    //   avgPrice: 150.00,
    //   ltp: 150.00,
    //   currentValue: 150.00,
    //   overallPL: 150.00,
    //   overallPercentage: 1500.00
    // },
    // {
    //   symbol: "GOOGL",
    //   quantity: 5,
    //   avgPrice: 2800.00,
    //   ltp: 2800.00,
    //   currentValue: 2800.00,
    //   overallPL: 2800.00,
    //   overallPercentage: 14000.00
    // }
  ];

  return (
    <section className="container mx-auto">
      <div className="flex justify-between my-5 items-center w-full">
        <h1 className="md:text-2xl text-lg font-bold md:mb-0">All Your Holdings</h1>
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
              <th className="py-2 font-extrabold px-4 text-left leading-tight">LTP</th>
              <th className="py-2 font-extrabold px-4 text-left leading-tight">Current Value</th>
              <th className="py-2 font-extrabold px-4 text-left leading-tight">Overall P&L</th>
              <th className="py-2 font-extrabold px-4 text-left leading-tight">Overall %</th>
              <th className="py-2 font-extrabold px-4 text-left leading-tight">Actions</th>
            </tr>
          </thead>
          <tbody>

            {
              holdings.map((holding, index) => (
                <tr key={index} className="border-b border-zinc-900">
                  <td className="py-2 text-sm px-4">{holding.symbol}</td>
                  <td className="py-2 text-sm px-4">{holding.quantity}</td>
                  <td className="py-2 text-sm px-4">${holding.avgPrice.toFixed(2)}</td>
                  <td className="py-2 text-sm px-4">${holding.ltp.toFixed(2)}</td>
                  <td className="py-2 text-sm px-4">${holding.currentValue.toFixed(2)}</td>
                  <td className="py-2 text-sm px-4">${holding.overallPL.toFixed(2)}</td>
                  <td className="py-2 text-sm px-4">${holding.overallPercentage.toFixed(2)}</td>
                  <td className="py-2 text-sm px-4">
                    <button className="bg-blue-900 rounded-md px-3 py-1 mr-2 transition duration-300">Edit</button>
                    <button className="bg-red-900 rounded-md px-3 py-1 mr-2 transition duration-300">Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {holdings.length < 1 &&
          <p className=" text-center my-10">No holdings found!</p>
        }
      </div>
    </section>
  )
}
