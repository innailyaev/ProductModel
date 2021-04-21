const productModel = require('../models/products.model');


const createProduct = async (req, res) => {
    // const data = req.body;
    const {productName, productCategory, details} = req.body;
   
    const product = new productModel({
        productName:productName,
        productCategory: productCategory,
        details:details
    });

    try{
        await product.save();
        res.json({"success": product});
    }catch (e){
        res.json({"error": err});}
}

const getProducts = async (req, res) => {
    try{
        const products = await productModel.find();
        res.send(products);
    }catch (e){
        res.status(500).send(e);}
}

const getById = async (req,res)=>{
    const {id} = req.params;
    try{
        const product = await productModel.findById(id);
        res.send(product);
    }catch (e){
        res.status(500).send(e);}
}

const getActive = async (req,res)=>{
    const query = req.query;
    try{
        const products = await productModel.find({isActive:query.isActive});
        res.send(products);
    }catch (e){
        res.status(500).send(e);}  
}

const getPrice = async (req,res)=>{
    const query = req.query;
    // productModel.find({ $and: [ { "details.price": { $gte: query.min } }, { "details.price": { $lte: query.max } } ] }).then((products) => {
    //     return res.send(products);
    // });
    try{
        const products = await productModel.find({"details.price" : {$lte :query.max, $gte : query.min}});
        res.send(products);
    }catch (e){
        res.status(500).send(e);} 
    
}

module.exports = {
    create: createProduct,
    getAll: getProducts,
    getById,
    getActive,
    getPrice
}
