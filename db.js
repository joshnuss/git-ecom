import glob from 'tiny-glob'
import yaml from 'yaml'
import fs from 'fs'

const db = {
  products: {},
  taxRates: {},
  shippingRates: {}
}

loadProducts()
loadTaxRates()
loadShippingRates()

async function loadProducts() {
  const products = await loadYamlFiles("content/products/*.yml")

  products.forEach(product => {
    db.products[String(product.id)] = {...product, buyURL: `/buy/${product.id}`}
  })
}

async function loadTaxRates() {
  db.taxRates = await readYamlFile("content/tax-rates.yml")
}

async function loadShippingRates() {
  db.shippingRates = await readYamlFile("content/shipping-rates.yml")
}

async function loadYamlFiles(pattern) {
  const files = await glob(pattern)
  const results = []
  const promises = files.map(async path => {
    const data = await readYamlFile(path)
    results.push(data)
  })

  await Promise.all(promises)

  return results
}

async function readYamlFile(path) {
  const text = await fs.promises.readFile(path, 'utf-8')
  return yaml.parse(text)
}

export default db
