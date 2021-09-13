const expressJwt = require('express-jwt');

function authJwt(){
    const secret = process.env.JWT_SECRET;
    return expressJwt({secret,algorithms:['HS256'],isRevoked:isRevoked}).unless({path:[
        {url:/\/public\/uploads(.*)/,methods:['GET','OPTIONS']},
        {url:/\/api\/v1\/products(.*)/,methods:['GET','OPTIONS']},
        {url:/\/api\/v1\/categories(.*)/,methods:['GET','OPTIONS']},
        {url:/\/api\/v1\/orders(.*)/,methods:['POST','OPTIONS']},
        {url:/\/api\/v1\/user(.*)/,methods:['POST','OPTIONS']},
        '/api/v1/user/login',
        '/api/v1/user/passwordreset',
        '/api/v1/user/register'
    ]})
}

async function isRevoked(req,payload,done){
    if(!payload.isAdmin){
        done(null,true);
    }
    done();
}

module.exports = authJwt;