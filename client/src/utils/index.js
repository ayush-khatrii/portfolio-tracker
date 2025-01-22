const apikey = import.meta.env.VITE_REACT_APP_API_KEY;

export const getRealTimePrices = async (stocks) => {
  const symbols = stocks.map((stock) => stock.symbol).join(",");

  try {
    const resp = await fetch(`https://financialmodelingprep.com/api/v3/quote/${symbols}?apikey=${apikey}`);
    if (!resp.ok) {
      throw new Error("Failed to fetch real-time prices");
    }
    const allPrices = await resp.json();
    console.log('allPrices', allPrices);

    const stockData = allPrices.map(stock => ({
      symbol: stock.symbol,
      price: stock.price
    }));

    console.log('REAL_TIME_stockData', stockData);
    return stockData;

  } catch (error) {
    console.error(error.message);
  }
};


export const portfolioMetrics = async (stocks) => {
  const stocksWithRealTimePrices = await getRealTimePrices(stocks);

  const dbStocks = stocks.map((stock) => {
    return {
      symbol: stock.symbol,
      price: stock.purchasePrice,
    }
  });


  // Get total value of all stocks
  const totalInvestedValue = dbStocks.reduce((prev, current) => prev + Number(current.price), 0);
  console.log('totalInvestedValue', totalInvestedValue);

  // Get total value of all stocks
  const totalCurrentValue = stocksWithRealTimePrices.reduce((prev, current) => prev + Number(current.price), 0);
  console.log('totalCurrentValue', totalCurrentValue);

  // Get p&l value
  const totalPL = totalCurrentValue - totalInvestedValue;
  console.log('totalPL', totalPL);

  // Get p&l percentage
  const totalPLPercentage = ((totalPL / totalInvestedValue) * 100).toFixed(2);
  console.log('totalPLPercentage', totalPLPercentage);

  return {
    totalInvestedValue,
    totalCurrentValue,
    totalPL,
    totalPLPercentage
  }
}

