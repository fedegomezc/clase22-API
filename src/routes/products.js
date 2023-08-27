import { Router } from 'express';
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct } from '../controllers/products.js';
import validationProduct from '../middlewares/validateProduct.js';
const productsRouter = Router();

productsRouter.post('/', validationProduct, createProduct);
productsRouter.get('/', getProducts);
productsRouter.get('/:id', getProduct);
productsRouter.put('/:id', updateProduct);
productsRouter.delete('/:id', deleteProduct);

export default productsRouter;