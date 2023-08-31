import 'dotenv/config'
import express, { json } from 'express';
import productsRouter from './routes/products.js';

const app = express()
app.use(json());
app.use('/products', productsRouter);

try {
  app.listen(process.env.PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${process.env.PORT}`);
  });
} catch (error) {
  console.error(`Error al iniciar el servidor: ${error.message}`);
}
