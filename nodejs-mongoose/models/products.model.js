const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true,
        unique: true  
    },
    productCategory: {
        type: String,
        required: true,
        unique: false
    },
    isActive: {
        type: Boolean,
        required: false,
        unique: false,
        default : true
    },
    details: {
            description:{
                type: String,
                required: true,
                trim:true,
                minLength:10
            },
            
            price:{
                type: Number,
                required: true,
                min:0
            },
            
            discount:{
                type: Number,
                required: false,
                default:0,
                min:0
            },
            
            images:{
                type: Array,
                required:true,
                validate(value) {
                    if(value.length < 2 ){
                        throw new Error('Must include at least two images');
                    }
                }    
            },
    
            phoneNumber:{
                type: String,
                required: true,
                minLength:10,
                // validate(value){
                //     if (!validator.isMobilePhone(value, "he-IL") ) {
                //         throw new Error("Not A valid israeli Number");              
                //     }
                // }
            },
            date: {
                type: Date,
                required: false,
                unique: false,
                default : Date.now()
            }

        },//End details
})

const productmodel  = mongoose.model('products',productSchema);
module.exports= productmodel;
// module.exports = mongoose.model('rooms',roomSchema);
