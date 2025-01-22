import prisma from "../db/db.js"

const getAllHoldings = async (req, res) => {
  try {
    const allHoldings = await prisma.stock.findMany({});
    res.status(200).json({ message: "Successfully fetched!", data: allHoldings });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
}

const getHoldingById = async (req, res) => {
  try {
    const { id } = req.params;
    const holding = await prisma.stock.findUnique({
      where: {
        id
      }
    });
    res.status(200).json({ message: "Successfully fetched!", data: holding });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

const addHolding = async (req, res) => {
  try {
    const { name, ticker, price, quantity } = req.body;

    const existingStock = await prisma.stock.findUnique({
      where: {
        symbol: ticker
      },
    });

    if (existingStock) {
      return res.status(400).json({ message: 'Stock already exists in portfolio!' });
    }

    const newHolding = await prisma.stock.create({
      data: {
        name: name,
        symbol: ticker,
        purchasePrice: price,
        quantity: quantity,
      }
    });


    res.status(201).json({ message: "Successfully added!", data: newHolding });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while adding the stock.' });
  }
};

const updateHolding = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ticker, price, quantity } = req.body;
    const updatedHolding = await prisma.stock.update({
      where: {
        id
      },
      data: {
        name: name,
        symbol: ticker,
        purchasePrice: price,
        quantity: quantity
      }
    });
    res.status(200).json({ message: "Successfully updated!", data: updatedHolding });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

const deleteHolding = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.stock.delete({
      where: {
        id
      }
    });
    res.status(200).json({ message: "Successfully deleted!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
}

export default {
  getAllHoldings,
  getHoldingById,
  addHolding,
  updateHolding,
  deleteHolding
};