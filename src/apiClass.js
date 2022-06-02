import fs from 'fs';
import { formatWithOptions } from 'util';

export default class Api {
    constructor(routeDB){
        this.routeDB = __dirname + routeDB
    }

    async getAll(){  //obtener todos los productos
        try {
            const all = await fs.promises.readFile(this.routeDB,'utf-8');
            return JSON.parse(all);     
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }

    async getById(id){  //obtener productos por ID
        try {
            const all = await this.getAll();
            const findProduct = all.find(product=>product.id == id);
            return findProduct

        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }
    async addProduct(product){  // Guardar productos
        try {
            let id;
            const all = await this.getAll();
            if(all.length===0){
                id=1;
            }
            else{
                id = all[all.length-1].id +1;
            }
            all.push({id:id,...product});
            await fs.promises.writeFile(this.routeDB,JSON.stringify(all));
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }
    async updateProduct(id,product){  //actualizar producto por ID
        try {
            const all = await this.getAll();
            const allId = all.map(product=>product.id);
            const findId = allId.indexOf(id);
            all.splice(findId,1,{id:id,...product});
            await fs.promises.writeFile(this.routeDB,JSON.stringify(all));
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }
    async deleteById(id){  //eliminar producto por ID
        try {
            const all = await this.getAll();
            const findProduct = all.find(element=>element.id===id);
            if(findProduct){
                const deleteProduct = all.filter(product=>product.id!=id);
                await fs.promises.writeFile(this.routeDB,JSON.stringify(deleteProduct));
            }
            else{
                return false
            }
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }
    async createCart(cart){  // crear carrito de compras y mostrar su ID
        try {
            let id;
            const all = await this.getAll();
            if(all.length===0){
                id=1;
            }
            else{
                id = all[all.length-1].id +1;
            }
            all.push({id:id,timestamp:Date.now(),products:cart});
            await fs.promises.writeFile(this.routeDB,JSON.stringify(all));
            return id; 
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }
    async deleteCart(id){  //borrar carrito por su ID
        try {
            const all = await this.getAll();
            const findCart= all.find(element=>element.id===id);
            if(findCart){
                findCart.products=[];  //vaciar el carrito
                const deleteCart = all.filter(element=>element.id!==id);  //eliminar el carrito
                await fs.promises.writeFile(this.routeDB,JSON.stringify(deleteCart));
            }
            else{
                return false
            }
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }
    async getAllCart(id){  //mostrar todos los elementos del carrito segun el Id del carrito
        try {
            const all = await this.getAll();
            const cart = all.find(element=>element.id===id);
            if(cart){
                return cart.products; 
            }
            else{
                return false
            } 
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }
    async addToCart(id,idProduct,routeProduct){  //agregar productos al carrito
        try {
            const all = await this.getAll();
            const findCart = all.find(element=>element.id===id);
           if(!findCart){
               return false
           }
            const productInCart = findCart.products;
            const product = await fs.promises.readFile(routeProduct,'utf8');
            const listproduct = JSON.parse(product);
            const findProduct = listproduct.find(product=>product.id===idProduct);            
    
            if(findProduct){
                productInCart.push(findProduct);
                await fs.promises.writeFile(this.routeDB,JSON.stringify(all));
            }
            else{
                return false
            }
        } catch (error) {
            throw new Error(`Error: ${error}`); 
        }
    }
    async deleteProductCart(id,idProduct){  //eliminar productos del carrito 
        try {
            const all = await this.getAll();
            const findCart = all.find(element=>element.id===id);
            if(!findCart){
                return false
            }
            let productInCart = findCart.products;
            const findProduct= productInCart.find(element=>element.id===idProduct);
            if (!findProduct){
                return false
            }
            else{
                const deleteItem= productInCart.filter(element=>element.id!==idProduct);
                const result = all.map(element=>element.id===id ? {id:element.id,timestamp:element.timestamp,products:element.products=deleteItem} : element);
                await fs.promises.writeFile(this.routeDB,JSON.stringify(result));      
            }
        } catch (error) {
            throw new Error(`Error: ${error}`); 
        }
    }
}