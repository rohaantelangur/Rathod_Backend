const express = require('express');
const dbconnect = require('./config/dbconnect');
const app = express()
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRouter = require('./routes/authRoute');
const bodyParser = require('body-parser');
const { notFound, errorhandle } = require('./middleware/errorHandler');
dbconnect() 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use('/api/user', authRouter)

app.use(notFound)
app.use(errorhandle)


app.listen(PORT, ()=>{
    console.log(`Server is running at PORT ${PORT}`)
})
