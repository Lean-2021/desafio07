export const adminClient =(req,res,next)=>{
    const isAdmin = true;
    if(!isAdmin){
        res.json({message:'No tiene permisos suficientes para realizar esta acción'});
    }
    else{
        next();
    }
}