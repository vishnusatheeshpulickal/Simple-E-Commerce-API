const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const authJwt = require('./authentication/auth')
const errorHandlers = require('./helpers/error-handlers')
const bodyParser = require('body-parser')
const multer = require('multer')


require('./database/dbConnection')
require('dotenv/config');

// Middleware 
app.use(cors());
app.options('*',cors)
app.use(express.json());

app.use('/public/uploads',express.static(__dirname+'/public/uploads'));
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandlers);

// Routes
const productsRouter = require('./routers/products')
const categoryRouter = require('./routers/category')
const userRouter = require('./routers/user')
const orderRouter = require('./routers/orders')
const adminRouter = require('./routers/admin')

const api = process.env.API_URL;

app.use(`${api}/products`,productsRouter)  
app.use(`${api}/orders`,orderRouter)
app.use(`${api}/category`,categoryRouter)
app.use(`${api}/user`,userRouter)
app.use(`${api}/admin`,adminRouter)
 


const port = process.env.PORT || 3000; 
app.listen(port,()=>{console.log(`listening port ${port}`)});