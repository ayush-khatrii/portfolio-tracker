import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from "react-icons/ai";


export default function AddStock() {
  const [symbol, setSymbol] = useState('');
  const [share, setShare] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingStock, setIsAddingStock] = useState(false);

  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
  const url = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  const fetchShareDetails = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`https://financialmodelingprep.com/api/v3/quote/${symbol.toUpperCase()}?apikey=${apiKey}`);
      const data = await res.json();
      setShare(data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addStockToPortfolio = async () => {
    if (!share) return alert('Please search for a stock first');

    setIsAddingStock(true);
    try {
      const res = await fetch(`${url}/api/holding/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: share.name,
          ticker: share.symbol,
          price: share.price,
          quantity: 1,
          currentPrice: share.price
        })
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/")
      }

      if (!res.ok) {
        return alert(data.message);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      alert('Something went wrong!');
    } finally {
      setIsAddingStock(false);
    }
  };

  return (
    <section className='min-h-screen my-20 px-3'>

      <Link to={"/"}>
        <button className='absolute top-3 md:left-10 hover:underline flex items-center gap-2 hover:border hover:border-zinc-900 px-3 py-2 rounded-md'>
          <IoIosArrowRoundBack /> back
        </button>
      </Link>

      <div className='max-w-5xl mx-auto'>
        {isLoading &&
          <div className='bg-green-950/15 p-5 flex justify-between items-center rounded-md animate-pulse'>
            <div className='w-1/4 h-8 bg-green-900/50 rounded-md'></div>
            <div className='w-1/4 h-8 bg-green-900/50 rounded-md'></div>
          </div>
        }
        {
          share &&
          <div className='bg-green-950/15 p-5 flex justify-between items-center rounded-md'>
            <div>
              <span className='text-green-500'>
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchShareDetails();
          }}
        >
          <div className='w-full flex gap-4 my-5'>
            <input
              placeholder='Search for a stock (e.g. AAPL)'
              type="text"
              required
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className='w-full rounded-md px-3 py-2 bg-transparent border border-zinc-800'
            />
            <button
              type="submit"
              disabled={isLoading || !symbol}
              className={`${!symbol ? "bg-zinc-700 cursor-not-allowed" : "bg-green-950"} px-3 py-2 rounded-md`}>Search</button>
          </div>
          <button
            type="submit"
            disabled={isAddingStock || !share}
            onClick={addStockToPortfolio}
            className={`${!share ? "bg-zinc-900 border border-zinc-800 cursor-not-allowed" : "bg-green-950"}  flex justify-center items-center gap-2  text-base font-bold px-3 py-2 rounded-md w-full`}>
            {isAddingStock && <AiOutlineLoading3Quarters className="animate-spin" />} Add to Portfolio
          </button>
        </form>
      </div >
    </section >
  )
}
