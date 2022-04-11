import express from "express";
const { Router } = express;
export const cartRouter = Router()
import Contenedor from "../classes/productsClass.js"
const cartFile = new Contenedor("cart.txt")
import bodyParser from 'body-parser'; 
const productFile = new Contenedor("products.txt")

let jsonParser = bodyParser.json();


cartRouter.post("/", jsonParser, async (req, res)=> {
    try {
        let arr = []
        arr.push(req.body)
        await cartFile.save({"id": "id", "timestamp": Date.now(), "producto": arr})
        const cart = await cartFile.getAll();
        res.json(cart)
    }catch(err)  {
        console.log({error: err.message})
    }

}) 

cartRouter.delete("/:id", jsonParser, async (req, res)=> {
    const cart = await cartFile.deleteById(req.params.id)
    res.json(cart)
})

cartRouter.get("/:id/productos", jsonParser, async (req, res)=> {
    const cart = await cartFile.getById(req.params.id)
    res.json(cart)
})

cartRouter.post("/:id/productos", jsonParser, async (req, res)=> { //Para incorporar productos al carrito por su id de producto
    console.log("Productfile " + productFile)
    const product = await productFile.getById(req.params.id) //obtengo el producto a agregar
    if (product !== null) {
        //let newCart = await JSON.parse(cart).producto //Esto es undefined
        console.log(" product " + product) 
        
        //newCart.id =  newCart.length + 1
        //newCart[0].push(req.body)
        res.json(product)
    }else {
        res.json("A cart with that id doesn't exist")
    }
})

cartRouter.delete("/:id/productos/:id_prod", jsonParser, async (req, res)=> {
    let cart = await cartFile.getById(req.params.id)
    cart = await JSON.parse(cart)
    const newCart = cart.producto[0].filter(i=> parseInt(i.id) !== parseInt(req.params.id_prod))
    res.json(newCart)
})


