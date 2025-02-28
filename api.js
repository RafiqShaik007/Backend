const user_db = require('./Models/userModel')
const food_db = require('./Models/foodModel.js')

const db_connect = require('./Database/dbconnection.js')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

// Database-connnection
db_connect()


app.post('/api/user/login', function(request, response){
    console.log('Login data from frontEnd: ', request.body)
    let {email, password} = request.body
    try{
        user_db.findOne({email: email})
        .then(function(result){
            if(result && result !== null){
                console.log('Got Data: ', result)
                if(result.email === email && result.password === password){
                    response.status(200).json({message: "Login Successfull", data: result})
                }
                else{
                    response.json({message: 'Invalid Credientials'})
                }
            }
            else{
                console.log('No Data: ', result)
                response.json({message: "User Does Not Exist"})
            }
        })
        .catch(function(error){
            response.status(404).json({message: "Got some error"})
        })
    }
    catch(error){
        console.log('Got some erro in Login: ', error)
        response.status(404).json({message: "got some Error", err: error})
    }
})

app.post('/api/user/register', function(request, response){
    console.log('Data from Front End: ', request.body)

    let {fullname, email, password} = request.body

    user_db.insertOne({fullname, email, password, role: "user"})
    .then(function(result){
        console.log(result)
        response.status(201).json({message: "Successfully added data into Database", res: result})

    })
    .catch(function(error){
        console.log('Got some Error: ', error)
        response.status(405).json({message: 'Error inserting data into Database', err: error })
    })
})



app.get('/api/food', function(request, response){
    console.log('Queries from frotend: ', request.query)
    let {filterQuery, searchQuery} = request.query

    if(filterQuery === 'all' && searchQuery === "" ){
        food_db.find()
        .then(function(result){
        response.json(result)
        })
        .catch(function(error){
        response.json({message: "Failed to fetch food data", err: error})
        })
}
else if(filterQuery === 'all' && searchQuery !== ''){
    food_db.find({name: {$regex: searchQuery, $options: "i"}})
        .then(function(result){
            response.json(result)
        })
        .catch(function(error){
            response.json({message: "Failed to fetch food data", err: error})
        })

}
    else{
        food_db.find({name: {$regex: searchQuery, $options: "i"}, category: {$regex: filterQuery, $options: "i"}})
        .then(function(result){
            response.json(result)
        })
        .catch(function(error){
            response.json({message: "Failed to fetch food data", err: error})
        })


    }

    

    
    
})



app.post('/api/food/addFoodItem', function(request, response){
    console.log('Food data from frontEnd: ', request.body)
    let {name, category, description, price, image} = request.body

    food_db.insertOne({name, category, description, price, image})
    .then(function(result){
        response.json({message: 'Inserted data successfully', result: result})
    })
    .catch(function(error){
        response.json({message: "Got some while inserting food item", err: error})
    })
})


app.delete('/api/food/deleteFoodItem/:id', function(request, response){
    console.log('Food ID from frontEnd: ', request.params)
   

    food_db.deleteOne({_id: request.params.id})
    .then(function(result){
        response.json({message: 'deleted data successfully', result: result})
    })
    .catch(function(error){
        response.json({message: "Got some while deleting food item", err: error})
    })

})

let port = 2323

app.listen(port, function(){
    console.log('Your API is running Successfully in port 2323')
})