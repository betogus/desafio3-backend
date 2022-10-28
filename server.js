// Creación de la clase Contenedor

const fs = require('fs')
const pathToFile = './productos.txt'

class Contenedor {

    getProducts = async () => {
        if (fs.existsSync(pathToFile)) { 
            let data = await fs.promises.readFile(pathToFile, 'utf-8')
            let products = JSON.parse(data)
            return products
        } else {
            return {status: "error", message: "No se encuentra el archivo"}
        }
    }
}

module.exports = Contenedor

// Creamos el objeto contenedor

const contenedor = new Contenedor;
let productos;
contenedor.getProducts().then(result => productos = result) 

// Iniciamos el servidor

const express = require('express')
const app = express()
const server = app.listen(8080, () => console.log('Server up'))

app.get('/productos', (request, response) => {
    response.send(productos)
})

function getRandomInt(max) {
    return Math.floor(Math.random() *max );
  }

app.get('/productoRandom', (request, response) => {
    response.send(productos[getRandomInt(3)])
})



