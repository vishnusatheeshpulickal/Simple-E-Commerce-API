const mongoose = require('mongoose');

require('dotenv/config')

exports.default = mongoose.connect(process.env.MONGODB_CONNECTION)
.then(()=>console.log('Connection established successfully'))
.catch(err=>console.log(err))

