const asyncHandler = require("express-async-handler");
const Product = require("../models/ProductModel");

const getAllproduct = asyncHandler(async(req,res)=>{
    try {
        const products = await Product.find();
        res.status(200).json({ products });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
})

const getSingleproduct = asyncHandler(async(req,res)=>{
    const productId = req.params.productId;

    try {
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({ product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
})

const searchByName = asyncHandler(async (req, res) => {
    const bookName = req.params.name;
    console.log(bookName);
  
    try {
      const products = await Product.find({ booksName: { $regex: bookName, $options: 'i' } });
  
      if (products.length === 0) {
        return res.status(404).json({ message: 'No products found' });
      }
  
      res.status(200).json({ products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })

module.exports = { getAllproduct, getSingleproduct, searchByName};
