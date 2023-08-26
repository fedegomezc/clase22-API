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




/* [
  {
    "id": 1,
    "name": "Camiseta",
    "description": "Camiseta de algodón con cuello redondo",
    "dimensions": "M",
    "weight": "200 g"
  },
  {
    "id": 2,
    "name": "Pantalón",
    "description": "Pantalón vaquero con corte recto",
    "dimensions": "32x32",
    "weight": "500 g"
  },
  {
    "id": 3,
    "name": "Zapatillas",
    "description": "Zapatillas deportivas cómodas para correr",
    "dimensions": "US 10 / EU 44",
    "weight": "350 g"
  }
] */