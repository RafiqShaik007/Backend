const user_db = require('./Models/userModel')

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

    user_db.insertOne({fullname, email, password})
    .then(function(result){
        console.log(result)
        response.status(201).json({message: "Successfully added data into Database", res: result})

    })
    .catch(function(error){
        console.log('Got some Error: ', error)
        response.status(405).json({message: 'Error inserting data into Database', err: error })
    })
})



let port = 2323

app.listen(port, function(){
    console.log('Your API is running Successfully in port 2323')
})