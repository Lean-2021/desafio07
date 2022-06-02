import { Router} from 'express';
import Api from '../apiClass';
const router = Router();
const api = new Api('/dataBase/cart.json');

router.post('/', async (req,res)=>{   //crear carrito de compras y mostrar su ID
    let carrito=[];
    const IdCarrito = await api.createCart(carrito);
    res.json(IdCarrito);
});

router.delete('/:id',async(req,res)=>{  //elimina un carrito de compras por su ID
    const {id}=req.params;
    const idFinal = parseInt(id);
    const deleteCart = await api.deleteCart(idFinal);
    res.json(deleteCart);
});

router.get('/:id/productos',async(req,res)=>{  //mostrar los productos del carrito según el ID del carrito
    const {id} = req.params;
    const idFinal = parseInt(id);
    const products = await api.getAllCart(idFinal);
    if (!products){
        res.json({message:'No existe un carrito con ese ID'})
    }
    else{
        res.json(products);
    }
});

router.post('/:id/productos',async (req,res)=>{  // agregar productos al carrito por ID
    const {id} =req.params;
    const product = req.body;
    const idFinal = parseInt(id);
    const result = await api.addToCart(idFinal,product.id,'src/database/products.json');
    res.json(result)
});

router.delete('/:id/productos/:id_prod',async(req,res)=>{  //eliminar productos del carrito por ID
    const {id,id_prod}=req.params;
    const idFinal = parseInt(id);
    const id_prodFinal = parseInt(id_prod);
    const deleteItem = await api.deleteProductCart(idFinal,id_prodFinal);
    res.json(deleteItem);
})

export default router