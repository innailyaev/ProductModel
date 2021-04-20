const productModel = require('../models/products.model');
const ObjectId = require('mongodb').ObjectID;


const createProduct = (req, res) => {
    // const data = req.body;
    const {productName, productCategory, details} = req.body;
   
    const product = new productModel({
        productName:productName,
        productCategory: productCategory,
        details:details
    });

    product.save((err) => {
        if (err) return res.json({"error": err})
        return res.json({"success": product})
    });

}

const getProducts = (req, res) => {
    productModel.find().then((products) => {
        return res.send(products)
    });
}

const getById = (req,res)=>{
    const {id} = req.params;
    productModel.find({_id:ObjectId(id)}).then((product) => {
        return res.send(product);
    });
}

const getActive = (req,res)=>{
    const query = req.query;
    productModel.find({isActive:query.isActive}).then((products) => {
        return res.send(products);
    });
}

const getPrice = (req,res)=>{
    const query = req.query;
    // productModel.find({ $and: [ { "details.price": { $gte: query.min } }, { "details.price": { $lte: query.max } } ] }).then((products) => {
    //     return res.send(products);
    // });

    productModel.find({"details.price" : {$lte :query.max, $gte : query.min}}).then((products) => {
        return res.send(products);
    });
}

module.exports = {
    create: createProduct,
    getAll: getProducts,
    getById,
    getActive,
    getPrice
}
