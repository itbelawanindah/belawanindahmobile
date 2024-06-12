const express = require('express')
const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')
const cors = require('cors')


const Connection = require('./utils/database')
const app = express()
require('dotenv').config()



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
   extended: true
}))


Connection();
const ar = require('./routes/api/authRoute')
const ac = require('./routes/api/assetCategoryRoute')
const ur = require('./routes/api/userRoute')

// app.use(cookieParser)
app.use(cors({
   origin: 'https://localhost:3000',
   methods:['GET','POST','PUT','DELETE','PATCH'],
   allowedHeaders: 'Content-Type,Authorization',
}))
app.use('/api/v1', ar)
app.use('/api/v2', ur)
app.use('/api/v2', ac)
app.get('/', (req, res) => {

   res.send('hello from simple server :)')

})

app.get('*', (req, res) => {

   res.send('No Page Found :)')

})




app.listen(process.env.APP_PORT, () => console.log('> Server is up and running on port : ' + process.env.APP_PORT))