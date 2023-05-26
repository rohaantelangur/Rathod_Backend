const express = require("express");
const { getAllCartItem, addToCart, removeToCart } = require("../controller/cartCtrl");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post('/', authMiddleware, addToCart)

// GET route to get all cart items
router.get('/', authMiddleware, getAllCartItem)

// DELETE route to remove an item from the cart
router.delete('/items/:itemId', authMiddleware, removeToCart)

module.exports = router
