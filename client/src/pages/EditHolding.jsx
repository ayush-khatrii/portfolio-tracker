import React, { useEffect, useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';


const url = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export default function EditHolding() {

  const [isLoading, setIsLoading] = useState(false);
  const [holding, setHolding] = useState({
    name: '',
    symbol: '',
    quantity: 1,
    price: 0
  });
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchHoldingDetails = async () => {
      try {
        const res = await fetch(`${url}/api/holding/${params.id}`);
        const data = await res.json();
        setHolding({
          name: data.data.name,
          symbol: data.data.symbol,
          quantity: data.data.quantity,
          price: data.data.purchasePrice
        });
      } catch (error) {
        console.log(error.message)
      }
    };

    fetchHoldingDetails();
  }, [params.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHolding(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleEditHolding = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${url}/api/holding/${params.id}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: holding.name,
          ticker: holding.symbol,
          price: holding.price,
          quantity: Number(holding.quantity),
        })
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/holdings")
      }

      if (!res.ok) {
        return toast(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className='max-w-7xl mx-auto'>
      <Link to={"/"}>
        <button className='absolute top-3 md:left-10 hover:underline flex items-center gap-2 hover:border hover:border-zinc-900 px-3 py-2 rounded-md'>
          <IoIosArrowRoundBack /> back
        </button>
      </Link>
      <div className="w-full p-4">
        <form onSubmit={handleEditHolding} className="w-full my-10 mx-auto">
          <h2 className="text-2xl text-center font-bold mb-4">Edit Holding</h2>

          <div className="mb-4">
            <label className="block mb-2">Stock Name</label>
            <input
              type="text"
              name="name"
              value={holding.name}
              onChange={handleInputChange}
              className='w-full rounded-md px-3 py-2 bg-transparent border border-zinc-800'
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Ticker Symbol</label>
            <input
              type="text"
              name="symbol"
              value={holding.symbol}
              onChange={handleInputChange}
              className='w-full rounded-md px-3 py-2 bg-transparent border border-zinc-800'
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={holding.quantity}
              onChange={handleInputChange}
              className='w-full rounded-md px-3 py-2 bg-transparent border border-zinc-800'
              min="1"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Buy Price</label>
            <input
              type="number"
              name="price"
              value={holding.price}
              onChange={handleInputChange}
              className='w-full rounded-md px-3 py-2 bg-transparent border border-zinc-800'
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className='w-full  bg-green-950 rounded-md px-3 py-2 '
          >
            {isLoading ? 'Updating...' : 'Update Holding'}
          </button>
        </form>
      </div>
    </section>
  )
}
