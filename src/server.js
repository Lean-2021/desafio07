import express  from "express";
import morgan from "morgan";
import routeProducts from './routes/products'; 
import routeCart from './routes/cart';
const app = express();
const PORT = process.env.PORT || 8080;


// middleware
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/productos',routeProducts);  //ruta de productos
app.use('/api/carrito',routeCart);  //ruta del carrito de compras


// conexión al servidor
app.listen(PORT,()=>{
    console.log(`Server on port ${PORT}...`)
})