import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';

export default function AddStock() {
  const [symbol, setSymbol] = useState('');
  const [share, setShare] = useState('');

  const fetchShareDetails = async () => {
    try {
      // const res = await fetch(`https://financialmodelingprep.com/api/v3/quote-order/${symbol.toUpperCase()}?apikey=ydSmVlnBzOvzZ3mv1hBSAP2sLBfVinz2`);
      const data = await res.json();
      console.log(data);
      setShare(data[0]);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <section className='min-h-screen my-20 px-3'>
      <Link to={"/"}>
        <button className='absolute top-3 md:left-10 hover:underline flex items-center gap-2 hover:border hover:border-zinc-900 px-3 py-2 rounded-md'>
          <IoIosArrowRoundBack /> back
        </button>
      </Link>

      <div className='max-w-5xl mx-auto'>
        {
          share &&
          <div className='bg-teal-950/15 p-5 flex justify-between items-center rounded-md'>
            <div>
              <span className='text-teal-500'>
                {share.symbol}
              </span>
              <h1 className='font-bold text-2xl'>
                {share.name}
              </h1>
            </div>
            <div className={`flex justify-center items-center flex-col`} >
              <span className='text-2xl font-bold'>
                {` $ ${share.price} `}
              </span>
              <span className={`text-sm  ${share.change > 0 ? ' text-green-500' : 'text-red-500'}`}>
                {` ${share.change} `}
                {` (${share.changesPercentage}%) `}
              </span>
            </div>
          </div>
        }
        <div className='w-full flex flex-col gap-4 my-5'>
          <div className='flex gap-3'>
            <input
              placeholder='Search for a stock (e.g. AAPL)'
              type="search"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className='w-full rounded-md px-3 py-2 bg-transparent border border-zinc-800'
            />
            <button
              onClick={fetchShareDetails}
              className='bg-teal-950 px-3 py-2 rounded-md'>Search</button>
          </div>
        </div>
        <button className='bg-teal-950 text-base font-bold px-3 py-2 rounded-md w-full'>Add to Portfolio</button>
      </div>
    </section >
  )
}
