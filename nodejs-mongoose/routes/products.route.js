const express = require('express');
const router = express.Router();
const productControler = require('../controllers/products.contorller');


router.get('/',(req,res)=>{
   productControler.getAll(req,res);
}).post('/',(req,res)=>{
   productControler.create(req,res);
}).get('/active',(req,res)=>{
   productControler.getActive(req,res);
}).get('/price',(req,res)=>{
   productControler.getPrice(req,res);
}).get('/:id',(req,res)=>{
   productControler.getById(req,res);
})

module.exports = router;
