const fs = require('fs');

let products = [];

try {
  const data = fs.readFileSync('./products.txt', 'utf8');
  products = Array.isArray(JSON.parse(data)) ? JSON.parse(data) : [];
} catch (error) {
  console.error(error);
}

function create(id, name, description, dimensions, weight) {
  products.push({
    id,
    name,
    description,
    dimensions,
    weight
  });

  fs.writeFileSync('./products.txt', JSON.stringify(products, null, 2));
}

function all() {
  return products;
}

function byId(id) {
  return products.find(product => product.id === id);
}

function update(product, name, description, dimensions, weight) {
  product.name = name;
  product.description = description;
  product.dimensions = dimensions;
  product.weight = weight;
}

function deleteById(id) {
  const productIndex = products.findIndex(producto => producto.id === id);
  products.splice(productIndex, 1);
}

module.exports = {
  create,
  all,
  byId,
  update,
  deleteById
}

