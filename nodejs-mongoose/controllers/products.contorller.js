const productModel = require('../models/products.model');


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
    // roomModel.find({}).then((rooms) => {
    //     return res.send(rooms)
    // });
    res.send('hello');
}

module.exports = {
    create: createProduct,
    getAll: getProducts
}
