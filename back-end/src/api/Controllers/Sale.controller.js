const saleService = require('../Services/Sale.service');

const strController = 'controller:';

const getSellers = async (req, res) => {
  try {
    const sellers = await saleService.getSellers();
    return res.status(200).json(sellers);
  } catch (e) {
    console.log(strController, e);
  }
};

const getSellerById = async (req, res) => {
  try {
    const { id } = req.params;
    const seller = await saleService.getSellerById(id);
    return res.status(200).json(seller.name);
  } catch (error) {
    console.log(strController, error);
  }
};

const getAllSales = async (req, res) => {
  try {
    const sales = await saleService.getAllSales();
    return res.status(200).json(sales);
  } catch(err) {
    console.log('controller', err)
  }
}

const getSale = async (req, res) => {
  try {
    const { id } = req.body;
    const sale = await saleService.getSale(id);
    if (!sale) {
      return res.status(400).json('Sale not found')
    }
    return res.status(200).json(sale);
  } catch(err) {
    console.log('controller:', error);
  }
}

const createSale = async (req, res) => {
  try {
    const { body: { request, products } } = req;
    const newSale = await saleService.createSale(request, products);
    if (newSale) {
      return res.status(201).json(newSale);
    } return res.status(404).json({ message: 'Error creating' });
  } catch (error) {
    console.log(strController, error);
  }
};

const updateSaleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSale = await saleService.updateSaleStatus(id);
    return res.status(200).json(updatedSale);
  } catch (error) {
    console.log(strController, error);
  }
};

module.exports = {
  getSellers,
  createSale,
  getSellerById,
  updateSaleStatus,
};
