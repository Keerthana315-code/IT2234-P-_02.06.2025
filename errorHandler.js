const errorHandle =(err,req,res,next)=>
{
    const statusCode= err.statusCode || 500
    res.status(statusCode).json({
        success:false,
        code:statusCode,
        message :err.message || "Internal Servor error"
    })
    next()
}
module.exports=errorHandle