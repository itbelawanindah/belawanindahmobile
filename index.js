const express = require('express')
const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')
const Connection = require('./utils/database')
const app = express()
require('dotenv').config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// app.use(cookieParser)

Connection();
const authRoute = require('./routes/userRoute')
const ac        = require('./routes/assetCategoryRoute')
app.use('/api/v1',authRoute)
app.use('/api/v2',ac)
app.get('/' , (req , res)=>{

   res.send('hello from simple server :)')

})




app.listen(process.env.APP_PORT , ()=> console.log('> Server is up and running on port : ' + process.env.APP_PORT))