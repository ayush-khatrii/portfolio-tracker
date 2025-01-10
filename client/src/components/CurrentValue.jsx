import React from 'react';

export default function CurrentValue() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Current Value Card */}
        <div className="card p-6 rounded-xl bg-white/5 hover:bg-white/10">
          <div className="text-center">
            <h1 className="opacity-50 my-2">Current Value</h1>
            <div>
              <h1 className="text-4xl font-bold">
                <span className="text-xl font-medium">₹</span>
                {`${14000?.toLocaleString()}`}
              </h1>
              <div className="mt-1">
                <span className="text-green-500 p-2">0.455</span>
                <span className="text-green-500">{`(+1.23%)`}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Invested Value Card */}
        <div className="card p-6 rounded-xl bg-white/5 hover:bg-white/10">
          <div className="text-center">
            <h1 className="opacity-50 my-2">Invested Value</h1>
            <div>
              <h1 className="text-4xl font-bold">
                <span className="text-xl font-medium">₹</span>
                {`${7000?.toLocaleString()}`}
              </h1>
              <div className="mt-1">
                <span className="text-green-500 p-2">0.455</span>
                <span className="text-green-500">{`(+1.23%)`}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Overall P&L Card */}
        <div className="card p-6 rounded-xl bg-white/5 hover:bg-white/10">
          <div className="text-center">
            <h1 className="opacity-50 my-2">Overall P&L</h1>
            <div>
              <h1 className="text-4xl text-green-500 font-bold">
                <span className="text-xl font-medium">₹</span>
                {`${7000?.toLocaleString()}`}
              </h1>
              <div className="mt-1">
                <span className="text-green-500">{`(+1.23%)`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}