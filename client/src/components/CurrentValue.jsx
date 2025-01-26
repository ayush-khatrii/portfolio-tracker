import { FiDollarSign } from "react-icons/fi";

export default function CurrentValue({ value, loading }) {
  const isStocksPresent = value?.totalCurrentValue > 0;

  return (
    <div className="w-full border border-zinc-500/15 cursor-pointer rounded hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h1 className="opacity-50 text-sm font-medium">Current Value</h1>
          <FiDollarSign className="h-5 w-5 opacity-70" />
        </div>
        <div className="pt-2 font-bold">
          {loading ? (
            <div className="animate-pulse flex space-x-4">
              <div className="flex space-y-4 py-1">
                <div className="h-4 bg-gray-500 rounded w-20"></div>
              </div>
            </div>
          ) : (
            <span className="text-2xl flex gap-3 items-center font-bold">
              {isStocksPresent ? (
                `$${value.totalCurrentValue.toFixed(2)}`
              ) : (
                <p className="text-sm my-2 font-normal opacity-50">
                  Add stocks to see Current Value
                </p>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
