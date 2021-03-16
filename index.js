import express from 'express'
import db from './db.js'

const app = express()

app.get('/products', (req, res) => {
  res.json(db.products)
})

app.get('/products/:id', (req, res) => {
  const product = db.products[req.params.id]

  if (product) {
    res.json(product)
  } else {
    res.status(404).json({message: "not found"})
  }
})

app.get('/shipping-rates', (req, res) => {
  res.json(db.shippingRates)
})

app.get('/tax-rates', (req, res) => {
  res.json(db.taxRates)
})

app.get('/buy/:id', (req, res) => {
  res.redirect("/checkout")
})

app.listen(3003)
