import {Router} from 'express';
import Api from '../apiClass';
const router = Router();
const api = new Api('/dataBase/products.json');
import uploadFile from '../multer';
import {adminClient} from '../middleware/adminClient';

router.get('/',async(req,res)=>{  //mostrar todos los productos
    const all = await api.getAll()
    if(all.length===0){
        res.json({message:'No hay ningún producto disponible'});
    }
    else{
        res.json(all)
    }
});

router.get('/:id',async(req,res)=>{  //mostrar producto por el ID
    const {id} = req.params;
    const findProduct = await api.getById(id)
   if(!findProduct){
       res.json({message:'No existe el producto solicitado'});
   }
   else{
       res.json(findProduct);
   }
});

router.post('/',adminClient,uploadFile(),async(req,res)=>{  //agregar un nuevo producto - Administradores
    const {name,description,code,price,stock} = req.body;
    const thumbnail = req.file.filename;
    const newProduct ={
        timestamp:Date.now(),
        name,
        description,
        code,
        thumbnail,
        price,
        stock
    }
    await api.addProduct(newProduct);
    res.json({message:'Producto agregado correctamente'});
});

router.put('/:id',adminClient,uploadFile(),async(req,res)=>{  // actualizar productos
    const {id} = req.params;
    const idFinal = parseInt(id);
    const {name,description,code,price,stock} = req.body;
    const thumbnail = req.file.filename;
    const updateProduct ={
        timestamp:Date.now(),
        name,
        description,
        code,
        thumbnail,
        price,
        stock
    }
    await api.updateProduct(idFinal,updateProduct);
    res.json({message:'Producto actualizado correctamente'})
});

router.delete('/:id',adminClient,async(req,res)=>{  //eliminar productos
    const {id} = req.params;
    const idFinal = parseInt(id);
    const deleteProduct = await api.deleteById(idFinal);
    res.json(deleteProduct);
})

export default router