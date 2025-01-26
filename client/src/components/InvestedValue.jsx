import { CiWallet } from "react-icons/ci";

export default function InvestedValue({ value, loading }) {
  const isInvestedValuePresent = value.totalInvestedValue > 0;
  return (
    <div className="w-full border  border-zinc-500/15 cursor-pointer rounded hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h1 className="opacity-50 text-sm font-normal">Invested Amount</h1>
          <CiWallet className=" h-5 w-5 opacity-70" />
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
              {isInvestedValuePresent ? (
                `$${value.totalInvestedValue?.toFixed(2)}`
              ) : (
                <p className="text-sm my-2 font-normal opacity-50">
                  Add stocks to see Total Invested Value
                </p>
              )}
            </span>
          )}
        </div>
      </div>
    </div >
  )
}
