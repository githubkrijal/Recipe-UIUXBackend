const mongoose = require('mongoose')
const category = require('./category')
const user=require('./User')

const RecipeSchema = mongoose.Schema({
    image:{
        type:String
    },
    videolink: {
        type: String,
        required: true,
    },
    recipename: {
        type: String,
        required: true,
    },
    ingredients: {
        type: String,
        required: true,
    },
    instructions:{
        type:String,
        required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    
}, { timestamps: true })
module.exports = mongoose.model('Recipe', RecipeSchema)
