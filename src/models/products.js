import { randomUUID } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import mongoose from '../config/mongo.js';

const productsFilePath = './products.txt'
let products = [];

// Definimos un esquema para productos
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  dimensions: String
});

// Creamos un modelo basado en el esquema de productos
const Product = mongoose.model('Product', productSchema);


try {
  const data = readFileSync(productsFilePath, 'utf8');
  products = Array.isArray(JSON.parse(data)) ? JSON.parse(data) : [];
} catch (error) {
  if (error.code === 'ENOENT') {
    writeFileSync(productsFilePath, '[]', 'utf8');
  } else {
    console.error(error);
  }
}

export function create(data) {
  try {
    const newProduct = new Product(data);
    newProduct.save();
    return newProduct
  } catch (error) {
    throw (`imposible insertar: ${error}`);
  }
}

export async function all() {
  let products = await Product.find({});
  return products;
}

export function byId(id) {
  return products.find(product => product.id === id);
}

export function update(updatedProduct) {
  const updatedProducts = products.map(product => {
    if (product.id === updatedProduct.id) {
      return { ...product, ...updatedProduct };
    }
    return product;
  });

  writeFileSync(productsFilePath, JSON.stringify(updatedProducts, null, 2));
}

export function deleteById(id) {
  const productIndex = products.findIndex(producto => producto.id === id);
  products.splice(productIndex, 1);

  writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
}