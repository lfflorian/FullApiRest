'use strict'

const Product = require('../models/product')

function getProduct (req, res) {
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({message: 'Erro al realizar la peticion'})
        if (!product) return res.status(404).send({message: 'El producto no existe'});

        res.status(200).send({ product })
    })
}

function getProducts (req, res) {
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({message: 'Error al realizar la petición'})
        if (!products) return res.status(404).send({message: 'No existen productos'})

        res.send(200, { products })
    })
}

function saveProduct (req, res) {
    let product = new Product();
    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description

    product.save((err, productStored) => {
        if (err) res.status(500).send({message: 'Error al gaurdar el objeto' + err})
        res.status(200).send({product: productStored})
    })
}

function updateProduct (req, res) {
    let productId = req.params.productId
    let update = req.body;
    Product.findByIdAndUpdate(productId, update, (err, product) => {
        if (err) return res.status(500).send({message: 'Erro al borrar el producto'})

        res.status(200).send( product )
    })
}

function deleteProduct (req, res) {
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({message: 'Erro al borrar el producto'})
        if (!product) return res.status(404).send({message: 'El producto no existe'});

        product.remove(err => {
            if (err) res.status(500).send({message: 'Erro al borrar el producto'});
            res.status(200).send({message: 'ell producto a sido eliminado'})
        })
    })
}


module.exports = {
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    saveProduct
}