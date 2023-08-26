import { all, byId, create, update, deleteById } from '../models/products.js';

// Obtener todos los productos
export const getProducts = (req, res) => {
    try {
        const allProducts = all();
        res.status(200).json({
            message: 'Devuelvo todos los productos',
            products: allProducts
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos' });
        console.error(error);
    }
}

// Obtener un producto por :id
export const getProduct = (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const product = byId(id);

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json({
            message: 'Devuelvo el producto con id: ' + id,
            producto: product
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto' });
        console.error(error);
    }
}

// Crear un producto
export const createProduct = (req, res) => {
    const { id, name, description, dimensions, weight } = req.body;

    // Validaciones
    if (!id || !name || !dimensions || !weight) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    if (byId(id)) {
        return res.status(409).json({ message: 'El ID ya existe' });
    }

    // validar formato de dimensiones y peso

    // Crear producto
    create(id, name, description, dimensions, weight);
    res.status(201).json({ message: 'El poducto ' + name + ' ha sido agregado' });
}

// Actualizar un producto por :id
export const updateProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedFields = req.body;

    const productFound = byId(id);
    if (!productFound) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Actualizar campos proporcionados
    for (const field in updatedFields) {
        if (updatedFields.hasOwnProperty(field)) {
            productFound[field] = updatedFields[field];
        }
    }
    update(productFound);
    res.status(200).json({ message: 'El producto ha sido actualizado correctamente' });
}

// Eliminar un producto por id
export const deleteProduct = (req, res) => {
    const id = parseInt(req.params.id);

    const productFound = byId(id);
    if (!productFound) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    deleteById(id);
    res.status(200).json({ message: 'Producto eliminado' });
}