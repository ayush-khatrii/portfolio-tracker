import toast from "react-hot-toast";

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
  const stocksWithRealTimePrices = await getRealTimePrices(stocks) || [];

  const totalInvestedValue = stocks.reduce((prev, current) =>
    prev + (Number(current.purchasePrice) * Number(current.quantity)), 0);

  const totalCurrentValue = stocks.reduce((prev, current) => {
    const currentPrice = stocksWithRealTimePrices.find(
      stock => stock.symbol === current.symbol
    )?.price || current.purchasePrice;

    return prev + (Number(currentPrice) * Number(current.quantity));
  }, 0);
  // Get p&l value
  const totalPL = totalCurrentValue - totalInvestedValue;

  // Get p&l percentage
  const totalPLPercentage = ((totalPL / totalInvestedValue) * 100).toFixed(2);

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
      if (resp.status === 429) {
        throw new Error("API rate limit exceeded. Please try again later.");
      } else {
        throw new Error("Failed to fetch data.");
      }
    }
    const allPortfolioStocks = await resp.json();

    const realTimeStockData = allPortfolioStocks.map(stock => ({
      symbol: stock.symbol,
      price: stock.price
    }));

    const sortedStocks = realTimeStockData.sort((a, b) => b.price - a.price);
    return sortedStocks;
  } catch (error) {
    toast.error(error.message);
    console.error(error);
  }


}

export const fetchSector = async (stocks) => {
  try {
    const symbols = stocks.map((stock) => stock.symbol).join(",");
    const res = await fetch(`https://financialmodelingprep.com/api/v3/profile/${symbols}?apikey=${apikey}`);
    if (!res.ok) {
      const errorResponse = await res.json();
      if (res.status === 429) {
        throw new Error(errorResponse.message);
      } else {
        throw new Error(errorResponse.message);
      }
    }
    const data = await res.json();

    const stocksWithSector = data?.map(stock => ({
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