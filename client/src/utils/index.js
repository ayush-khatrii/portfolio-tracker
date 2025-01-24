const apikey = import.meta.env.VITE_REACT_APP_API_KEY;

export const getRealTimePrices = async (stocks) => {
  const symbols = stocks.map((stock) => stock.symbol).join(",");
  try {
    const resp = await fetch(`https://financialmodelingprep.com/api/v3/quote/${symbols}?apikey=${apikey}`);
    if (!resp.ok) {
      throw new Error("Failed to fetch real-time prices");
    }
    const allPrices = await resp.json();
    const stockData = allPrices.map(stock => ({
      symbol: stock.symbol,
      price: stock.price
    }));

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
};

export const getTopPerformingStocks = async (stocks) => {
  const symbols = stocks.map((stock) => stock.symbol).join(",");
  try {
    const resp = await fetch(`https://financialmodelingprep.com/api/v3/quote/${symbols}?apikey=${apikey}`);
    if (!resp.ok) {
      throw new Error("Failed to fetch real-time prices");
    }
    const allPortfolioStocks = await resp.json();

    const realTimeStockData = allPortfolioStocks.map(stock => ({
      symbol: stock.symbol,
      price: stock.price
    }));

    const sortedStocks = realTimeStockData.sort((a, b) => b.price - a.price);
    return sortedStocks;
  } catch (error) {
    console.error(error.message);
  }


}

export const fetchSector = async (stocks) => {
  try {
    const symbols = stocks.map((stock) => stock.symbol).join(",");
    const res = await fetch(`https://financialmodelingprep.com/api/v3/profile/${symbols}?apikey=${apikey}`);

    const data = await res.json();

    const stocksWithSector = data.map(stock => ({
      symbol: stock.symbol,
      sector: stock.sector
    }));

    const sectorCount = {};
    for (let i = 0; i < stocksWithSector.length; i++) {
      const sector = stocksWithSector[i].sector;

      if (sectorCount[sector]) {
        sectorCount[sector] += 1;
      } else {
        sectorCount[sector] = 1;
      }
    };

    const finalData = Object.keys(sectorCount).map((sector) => {
      return {
        sector,
        count: sectorCount[sector]
      }
    });

    return finalData;
  } catch (error) {
    console.log(error)
  }
}
