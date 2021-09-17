const yup = require('yup')

const productSchema = yup.object({
    body:yup.object({
        // name:yup.string().min(3,'Product name must be at least 3 characters long').max(64,'Product name must be 64 characters long').required('Product name is required'),
        // description:yup.string().min(3,'Product description must be 3 characters long').max(128,'Product description must be 128 characters long').required('Product description is required'),
        // brand:yup.string().min(2,'Brand name must be at least 2 characters long').max(32,'Brand name must be 32 characters long').required('Brand name is required'),
        // category:yup.string().min(2,'Please check the category').required('Category is required'),
        // price:yup.number().moreThan(0,'Amount must be more than 0').lessThan(99999999,'Amount must be less than 1 crore').required('Price is required'),
        // numberInStock:yup.number().positive('Number In Stock must be a positive number').required('Number In Stock is required')
    })
})

const validateProduct = (schema) => async(req,res,next) => {
     try{
         await schema.validate({
             body:req.body
         })
         return next()
     }catch(err){
         return res.status(400).json({type:err.name,message:err.message})
     }
}

module.exports = validateProduct(productSchema);