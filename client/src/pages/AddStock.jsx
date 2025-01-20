import { useState } from "react";

export default function AddStock() {
  const [share, setShare] = useState("");

  return (
    <section className="max-w-7xl mx-auto mt-10">
      <h2 className="md:text-3xl text-xl font-bold text-center my-8">Add New Stock</h2>
      <form className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="symbol" className="block text-sm font-medium mb-2">
              Symbol
            </label>
            <input
              id="symbol"
              name="symbol"
              type="text"
              onChange={(e) => setShare(e.target.value)}
              placeholder="Enter stock symbol"
              className="w-full p-3 border border-zinc-900 rounded-lg bg-transparent "
            />
          </div>
          {
            share &&
            <div className="bg-teal-950/25 p-3 rounded-lg">
              <div className="">
                <span htmlFor="marketPrice" className="block text-sm text-teal-300 font-medium mb-1">
                  Current Market Price
                </span>
                <h1 className="text-2xl font-bold">
                  {"$928.84"}
                </h1>
              </div>
            </div>
          }
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
        <div className="flex gap-4">
          <button
            className="flex-1 bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Add Stock
          </button>
        </div>
      </form>
    </section>
  );
}