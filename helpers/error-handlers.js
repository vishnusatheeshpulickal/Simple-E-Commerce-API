function errorHandlers(err,req,res,next){

    if(err.name === 'UnauthorizedError') return res.status(401).json({success:false,message:'This user is not authorized'});
}

module.exports = errorHandlers;