require('dotenv').config()

const express = require('express')
const productsRouter = require('./routes/products');

const app = express()
app.use(express.json());

app.use('/products', productsRouter);

app.listen(process.env.PORT) //agregar segundo parametro funcion callback con un try catch para verificar que el puerto no está ocupado

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