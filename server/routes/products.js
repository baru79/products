// Dependencies
const express = require('express')

// Components
const productsControllers = require('../controllers/products')

const router = express.Router()

const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct
} = productsControllers

router.route('/')
  .get(getProducts)
  .post(addProduct)

router.route('/:id')
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct)

module.exports = router
