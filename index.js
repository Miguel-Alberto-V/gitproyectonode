const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let productos = [
    { id: 1, nombre: 'Producto 1', precio: 10 },
    { id: 2, nombre: 'Producto 2', precio: 20 },
    { id: 3, nombre: 'Producto 3', precio: 30 }
];

// Obtener todos los productos
app.get('/productos', (req, res) => {
    res.json(productos);
});

// Obtener un producto por su ID
app.get('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const producto = productos.find(producto => producto.id === id);
    if (producto) {
        res.json(producto);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

// Crear un nuevo producto
app.post('/productos', (req, res) => {
    const nuevoProducto = req.body;
    nuevoProducto.id = productos.length + 1;
    productos.push(nuevoProducto);
    res.status(201).send('Producto creado exitosamente');
});

// Actualizar un producto existente
app.put('/productos/actualizar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const productoIndex = productos.findIndex(producto => producto.id === id);
    if (productoIndex !== -1) {
        productos[productoIndex] = req.body;
        res.send('Producto actualizado exitosamente');
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

// Eliminar un producto
app.delete('/productos/eliminar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    productos = productos.filter(producto => producto.id !== id);
    res.send('Producto eliminado exitosamente');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});
