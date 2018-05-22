// Dependencies
const mongojs = require('mongojs')
const db = mongojs('products', ['products'])

module.exports = {
  getProducts: (req, res, next) => {
    try {
      db.products.find((err, products) => {
        if (err) return next(err)
        console.log(`getProducts: Products was succesfully get`)
        res.json({products})
      })
    } catch (e) {
      console.log(`getProducts: Products was failed get`)
      res.json({
        'sucess': false,
        'msg': 'failed getProducts'
      })
    }
  },

  getProduct: (req, res, next) => {
    const { id } = req.params
    try {
      db.products.findOne({_id: mongojs.ObjectId(id)}, (err, product) => {
        if (err) return next(err)
        console.log(`getProduct: Product with id: ${product._id} was get succesfully`)
        res.json({product})
      })
    } catch (e) {
      console.log(`getProduct: Product with id: ${id} was failed get`)
      res.json({
        'sucess': false,
        'msg': 'failed getProduct'
      })
    }
  },

  addProduct: (req, res, next) => {
    const productToAdd = req.body
    try {
      db.products.save(productToAdd, (err, product) => {
        if (err) return next(err)
        console.log(`addProduct: Product with id: ${product._id} was added succesfully`)
        res.json({
          'sucess': true,
          'msg': 'succesfully added',
          'product': product
        })
      })
    } catch (e) {
      console.log(`addProduct: Product with name: ${productToAdd.name} was failed added`)
      res.json({
        'sucess': false,
        'msg': 'failed addProduct'
      })
    }
  },

  updateProduct: (req, res, next) => {
    const { id } = req.params
    const productToUpdate = req.body
    try {
      db.products.update({_id: mongojs.ObjectId(id)}, productToUpdate, (err, product) => {
        if (err) return next(err)
        console.log(`updateProduct: Product with id: ${id} was succesfully updated`)
        res.json({
          'sucess': true,
          'msg': 'succesfully updated',
          'id': id
        })
      })
    } catch (e) {
      console.log(`Product id: ${id} was failed updated`)
      res.json({
        'sucess': false,
        'msg': 'failed updated'
      })
    }
  },

  deleteProduct: (req, res, next) => {
    const { id } = req.params
    try {
      db.products.remove({_id: mongojs.ObjectId(id)}, (err, result) => {
        if (err) return next(err)
        console.log(`deleteProduct: Product with id: ${id} was succesfully deleted`)
        res.json({
          'sucess': true,
          'msg': 'succesfully deleted'
        })
      })
    } catch (e) {
      console.log(`deleteProduct: Product with id: ${id} was failed deleted`)
      res.json({
        'sucess': false,
        'msg': 'failed deleteProduct'
      })
    }
  }
}
