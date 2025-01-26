import { IoTrendingDown, IoTrendingUp } from "react-icons/io5";

export default function TotalGainLoss({ value }) {
  return (
    <div className="w-full border border-zinc-500/15 cursor-pointer rounded hover:shadow-lg transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-center">
          <h1 className="opacity-50 text-sm font-medium">Total Gain/Loss</h1>
          {
            value.totalPL > 1 ?
              <IoTrendingUp className={`${value.totalPL < 1 ? "text-red-500" : "text-green-400"}  h-5 w-5`} /> :
              <IoTrendingDown className={`${value.totalPL < 1 ? "text-red-500" : "text-green-400"}  h-5 w-5`} />
          }
        </div>
        <div className="pt-2 font-bold">
          <span className={`flex justify-start items-center gap-3 text-2xl font-bold ${value.totalPL < 1 ? "text-red-500 " : "text-green-500 "}`}>
            <div>
              {`$${value.totalPL?.toFixed(2)}`}
            </div>
            <div className="text-sm font-normal">
              {`(${value.totalPLPercentage?.toFixed(2)}%)`}
            </div>
          </span>
        </div>
      </div>
    </div>
  )
}
