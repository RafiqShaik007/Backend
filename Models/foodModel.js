
const mongoose = require('mongoose')


let foodSchema = mongoose.Schema({
    name: String,
    description: String,
    price: String,
    category: String,
    image: String,

})

let food_db = mongoose.model('foodItem', foodSchema)

module.exports = food_db