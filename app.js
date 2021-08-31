const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv/config');

// Middleware 
app.use(express.json());
app.use(morgan('tiny'));

const productsRouter = require('./routers/products')

const api = process.env.API_URL;

app.use(`${api}/products`,productsRouter)

// MongoDB connection
mongoose.connect(process.env.MONGODB_CONNECTION)
.then(()=>console.log('Connection established successfully'))
.catch(err=>console.log(err))


const port = process.env.PORT || 3000;
app.listen(port,()=>{console.log(`listening port ${port}`)});