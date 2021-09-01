const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

require('./database/dbConnection')
require('dotenv/config');

// Middleware 
app.use(cors());
app.options('*',cors)
app.use(express.json());
app.use(morgan('tiny'));

// Routes
const productsRouter = require('./routers/products')
const categoryRouter = require('./routers/category')
const userRouter = require('./routers/user')
const orderRouter = require('./routers/orders')

const api = process.env.API_URL;

app.use(`${api}/products`,productsRouter)
app.use(`${api}/orders`,orderRouter)
app.use(`${api}/category`,categoryRouter)
app.use(`${api}/user`,userRouter)



const port = process.env.PORT || 3000;
app.listen(port,()=>{console.log(`listening port ${port}`)});   