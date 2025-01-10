import React, { useState } from 'react';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([
    // { symbol: 'AAPL', fullname: 'Apple Inc.', price: 150 },
    // { symbol: 'GOOGL', fullname: 'Alphabet Inc.', price: 2800 },
    // { symbol: 'AMZN', fullname: 'Amazon.com Inc.', price: 3400 },
  ]);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center  mb-8">
          Stock Search
        </h1>
        <form className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for stocks..."
            className="flex-1 px-4 py-2 outline-none border border-zinc-800 rounded-lg bg-transparent"
          />
          <button
            type="submit"
            className="outline-none px-6 py-2 bg-emerald-950 font-medium rounded-lg shadow hover:bg-emerald-900 transition-colors duration-200 ease-in-out"
          >
            Search
          </button>
        </form>
        <div className="space-y-4">
          {results.length > 0 ? (
            results.map((result, index) => (
              <div
                key={index}
                className="p-4 border border-zinc-900 rounded-lg hover:shadow-lg transition-shadow duration-200 ease-in-out"
              >
                <div className="flex justify-between md: items-center sm:justify-between gap-2">
                  <div>
                    <div className="md:text-base text-sm font-semibold">{result.symbol}</div>
                    <div className="text-gray-600 md:text-base text-sm">{result.fullname}</div>
                  </div>
                  <div className="md:text-xl text-sm font-bold text-green-600">
                    ${result.price.toLocaleString()}
                  </div>
                  <button
                    className=" w-auto text-sm px-3 py-1 md:px-6 md:py-2 bg-zinc-200 text-black font-medium rounded-lg shadow hover:opacity-70 transition-all duration-200 ease-in-out"
                  >
                    Buy
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-zinc-500">No results found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;