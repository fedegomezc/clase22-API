import { readFileSync, writeFileSync } from 'node:fs';

const productsFilePath = './products.txt'
let products = [];

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

export function create(id, name, description, dimensions, weight) {
  products.push({
    id,
    name,
    description,
    dimensions,
    weight
  });

  writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
}

export function all() {
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