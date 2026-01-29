const validate=(schema)=>async(req,res,next)=>{
    try {
    req.body = await schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    next();
  } catch (err) {
    res.status(400).json({
      message: "Validation error",
      errors: err.errors,
    });
  } 
}

module.exports=validate;