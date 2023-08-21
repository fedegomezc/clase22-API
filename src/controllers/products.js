const productsModel = require('../models/products');

// Obtener todos los productos
const getProducts = (req, res) => {
    try {
        const allProducts = productsModel.all();
        res.status(200).json({
            message: 'Devuelvo todos los productos',
            products: allProducts
        });
    } catch (error) {
        res.status(500).json({message: 'Error al obtener los productos'});
        console.error(error);
    }
}

// Obtener un producto por :id
const getProduct = (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const product = productsModel.byId(id);

        if (!product) {
            return res.status(404).json({message: 'Producto no encontrado'});
        }

        res.status(200).json({
            message: 'Devuelvo el producto con id: ' + id,
            producto: product
        });
    } catch (error) {
        res.status(500).json({message: 'Error al obtener el producto'});
        console.error(error);
    }
}

// Crear un producto
const createProduct = (req, res) => {
    const { id, name, description, dimensions, weight } = req.body;

    // Validaciones
    if (!id || !name || !dimensions || !weight) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    if (productsModel.byId(id)) {
        return res.status(409).json({ message: 'El ID ya existe' });
    }

    // validar formato de dimensiones y peso

    // Crear producto
    productsModel.create(id, name, description, dimensions, weight);
    res.status(201).json({message: 'El poducto ' + name + ' ha sido agregado'});
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
    res.status(200).json({message: 'El producto ha sido actualizado correctamente'});
}

// Eliminar un producto por id
const deleteProduct = (req, res) => {
    const id = parseInt(req.params.id);

    const productFound = productsModel.byId(id);
    if (!productFound) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    productsModel.deleteById(id);
    res.status(200).json({message: 'Producto eliminado'});
}

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
};
