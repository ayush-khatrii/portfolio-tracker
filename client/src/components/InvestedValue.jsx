import { CiWallet } from "react-icons/ci";

export default function InvestedValue({ value }) {
  return (
    <div className="w-full border  border-zinc-500/15 cursor-pointer rounded hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h1 className="opacity-50 text-sm font-normal">Invested Amount</h1>
          <CiWallet className=" h-5 w-5 opacity-70" />
        </div>
        <div className="pt-2 font-bold">
          <span className="text-2xl font-bold">
            {`$${value.totalInvestedValue?.toLocaleString()}`}
          </span>
        </div>
      </div>
    </div>
  )
}
