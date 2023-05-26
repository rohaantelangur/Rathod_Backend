const express = require("express");
const {
  getAllproduct,
  getSingleproduct,
  searchByName,
} = require("../controller/productCtrl");

const router = express.Router();

router.get("/", getAllproduct);
router.get("/:productId", getSingleproduct);
router.get("/search/:name", searchByName);

module.exports = router
