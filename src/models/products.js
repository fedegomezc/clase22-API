const fs = require('fs');

const productsFilePath = './products.txt'
let products = [];

try {
  const data = fs.readFileSync(productsFilePath, 'utf8');
  products = Array.isArray(JSON.parse(data)) ? JSON.parse(data) : [];
} catch (error) {
  if (error.code === 'ENOENT') {
    fs.writeFileSync(productsFilePath, '[]', 'utf8');
  } else {
    console.error(error);
  }
}

function create(id, name, description, dimensions, weight) {
  products.push({
    id,
    name,
    description,
    dimensions,
    weight
  });

  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
}

function all() {
  return products;
}

function byId(id) {
  return products.find(product => product.id === id);
}

function update(updatedProduct) {
  const updatedProducts = products.map(product => {
    if (product.id === updatedProduct.id) {
      return { ...product, ...updatedProduct };
    }
    return product;
  });

  fs.writeFileSync(productsFilePath, JSON.stringify(updatedProducts, null, 2));
}

function deleteById(id) {
  const productIndex = products.findIndex(producto => producto.id === id);
  products.splice(productIndex, 1);

  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
}

module.exports = {
  create,
  all,
  byId,
  update,
  deleteById
}

