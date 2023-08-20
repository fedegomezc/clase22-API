const productsModel = require('../models/products');

// Obtener todos los productos
const getProducts = (req, res) => {
    res.status(200).json({
        message: 'Devuelvo todos los productos',
        products: productsModel.all()
    })
}

// Obtener un producto por :id
const getProduct = (req, res) => {
    const id = parseInt(req.params.id);
    res.status(200).json({
        message: 'Devuelvo el producto con id: ' + id,
        producto: productsModel.byId(id) //hacer validaciones y usar una función que busque el producto por id
    });
}

// Crear un producto
const createProduct = (req, res) => {
    // hacer validaciones
    const { id, name, description, dimensions, weight } = req.body;
    productsModel.create(id, name, description, dimensions, weight);
    res.status(201).json({
        message: 'El poducto ' + name + ' ha sido agregado'
    })

}

// Actualizar un producto por :id
const updateProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description, dimensions, weight } = req.body;

    const productFound = productsModel.byId(id);
    if (!productFound) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }
    
    productsModel.update(productFound, name, description, dimensions, weight);
    
    res.status(200).json({
        message: 'El producto ha sido actualizado correctamente'
    });
}

// Eliminar un producto por id
const deleteProduct = (req, res) => {
    const id = parseInt(req.params.id);
    productsModel.deleteById(id);
    // if (productIndex === -1) {
    //     return res.status(404).json({ message: 'Producto no encontrado' });
    // }
    res.status(200).json({
        message: 'Producto eliminado'
    });
}

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
};
