const yup = require('yup');

const userSchema = yup.object({
    body:yup.object({
        name:yup.string().min(2,'Name must be at least 2 characters long').max(32,'Name must be 32 characters long').required('Name is required'),
        email:yup.string().email('Enter a valid email address').required('Email address is required'),
        password:yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,'Password must have Minimum eight characters, at least one letter, one number and one special character').required('Password is required'),
        city:yup.string().min(2,'Check city you entered').max(32,'Check city you entered').required('City is required'),
        district:yup.string().min(2,'Check district you entered').max(32,'Check district you entered').required('District is required'),
        pincode:yup.number().min(6,'Entered pincode is incorrect').required('Pincode is required'),
        phone:yup.number().min(10,'Phone number is incorrect').required('Phone number is required')
    })
})

const userValidate = (schema) => async(req,res,next) =>{
    try{
         await schema.validate({
             body:req.body
         })
         return next();
    }catch(err){
        res.status(400).json({type:err.name,message:err.message})
    }
}

module.exports = userValidate(userSchema);