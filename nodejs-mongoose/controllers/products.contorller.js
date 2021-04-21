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

const updateProduct = async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['isActive','discount'];
    const isValidOperation = updates.every((update)=>{
        console.log(update,allowedUpdates.includes(update));
        return allowedUpdates.includes(update)
    });

    if(!isValidOperation){
        return res.status(400).send("Error: Invalid Update");
    }

    try{
        const {id} = req.params;
        const product = await productModel.findByIdAndUpdate(id,{"isActive":req.body.isActive, "details.discount":req.body.discount},{new:true, runValidators:true});

        if(!product){
            return res.status(400).send();
        }
        res.send(product);
    }catch(e){
        res.status(400).send(e);
    }
}

const deleteProductByID = async (req,res)=>{
    const {id} = req.params;
    
    try{
        const product = await productModel.findOneAndDelete({_id:id});

        if(!product){
            return res.status(400).send();
        }
        res.send("Product Deleted");
    }catch(e){
        res.status(400).send(e);
    }
}

const deleteAll = async (req,res) =>{
    try{
        const products = await productModel.deleteMany();
        res.send("All Products Deleted");
    }catch(e){
        res.send(e);
    }
}

module.exports = {
    create: createProduct,
    getAll: getProducts,
    getById,
    getActive,
    getPrice,
    updateProduct,
    deleteProductByID,
    deleteAll
}
