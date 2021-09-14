const yup = require('yup');

const passwordResetSchema = yup.object({
    body:yup.object({
        password:yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,'Password must have Minimum eight characters, at least one letter, one number and one special character').required('Password is required')
    })
})

const validateResetPassword = (schema) => async (req,res,next) =>{
    try{
        await schema.validate({body:req.body});
        return next();
    }catch(err){
        res.status(400).send({success:false,type:err.name,message:err.message})
    }
}

module.exports = validateResetPassword(passwordResetSchema);