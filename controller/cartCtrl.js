const Product = require("../models/ProductModel");
const Cart = require("../models/cartModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const addToCart = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const productId = req.body.productId;
    const quantity = req.body.quantity || 1;
  
    try {
      // Find the user's cart
      const cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        // If the cart doesn't exist, create a new one
        const newCart = new Cart({ user: userId });
        await newCart.save();
      }
  
      // Find the product
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Add the product to the cart
      cart.items.push({ product: productId, quantity });
      await cart.save();
  
      res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (error) {
      console.error(error);
      throw new Error("Internal Server Error");
    }
});


const removeToCart = asyncHandler( async (req, res) => {
    const userId = req.params.id;
    const itemId = req.params.itemId;
    console.log('itemId',itemId);
  
    try {
      // Find the user's cart
      const cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      // Find the index of the item to remove
      const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
  
      if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item not found in cart' });
      }
  
      // Remove the item from the cart
      cart.items.splice(itemIndex, 1);
      await cart.save();
  
      res.status(200).json({ message: 'Item removed from cart successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })


  const  getAllCartItem = asyncHandler(async (req, res) => {
    const userId = req.params.id;
  
    try {
      // Find the user's cart
      const cart = await Cart.findOne({ user: userId }).populate('items.product');
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      res.status(200).json({ items: cart.items });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })


module.exports = { addToCart, removeToCart, getAllCartItem };
