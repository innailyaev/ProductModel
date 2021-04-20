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
    details: [
            {
                description:{
                    type: String,
                    required: true,
                    validate(value) {
                        if(value.length < 10 ){
                            throw new Error('Has to be at least 10 letters')
                        }
                    }
                }
            },
            {
                price:{
                    type: Number,
                    required: true,
                    min:0
                }
            },
            {
                discount:{
                    type: Number,
                    required: false,
                    default:0
                }
            },
            {
                images:{
                    type: Array,
                    validate(value) {
                        if(value.length < 2 ){
                            throw new Error('Must include at least two images');
                        }
                    }
                } 
            },
            {
                phoneNumber:{
                    type: Number,
                    required: true
                }
            },
            {
                date: {
                    type: Date,
                    required: false,
                    unique: false,
                    default : Date.now()
                }
            }

    ],
})

const productmodel  = mongoose.model('products',productSchema);
module.exports= productmodel;
// module.exports = mongoose.model('rooms',roomSchema);
