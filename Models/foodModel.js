
const mongoose  = require('mongoose')




let foodSchema = mongoose.Schema({
    category: String,
    name: String,
    desciption: String,
    price: String,
    image: String
})


let food_db = mongoose.model('fooditem', foodSchema)

module.exports = food_db
