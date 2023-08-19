require('dotenv').config()

const express = require('express')
const app = express()

app.get('/products', function (req, res) {
  res.status(200).json({
    mensaje: 'Devuelvo todos los productos'
  })
})

app.post('/products', function (req, res) {
  res.status(200).json({
    mensaje: 'Devuelvo todos los productos'
  })
})

app.put('/products', function (req, res) {
  res.status(200).json({
    mensaje: 'Devuelvo todos los productos'
  })
})

app.delete('/products', function (req, res) {
  res.status(200).json({
    mensaje: 'Devuelvo todos los productos'
  })
})

app.listen(process.env.PORT)