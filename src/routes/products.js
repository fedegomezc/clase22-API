import { Router } from 'express';
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct } from '../controllers/products.js';
export const productsRouter = Router();

productsRouter.post('/', createProduct);
productsRouter.get('/', getProducts);
productsRouter.get('/:id', getProduct);
productsRouter.put('/:id', updateProduct);
productsRouter.delete('/:id', deleteProduct);


export default router;