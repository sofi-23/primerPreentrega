import express from "express";
const { Router } = express;
export const cartRouter = Router()
import Contenedor from "../classes/productsClass.js"
const cartFile = new Contenedor("cart.txt")
import bodyParser from 'body-parser'; 
import fs from "fs";

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
    try {
    let products = await fs.promises.readFile("./public/data/products.txt", "utf-8")
    console.log("PRODUCTS " + products)
    products = await JSON.parse(products)
    console.log("PRODUCTS AFTER PARSING " + products)
    let product = await products.indexOf(product => parseInt(product.id) == parseInt(req.body.id))
    console.log("PRODUCT " + product)
    //products = await JSON.parse(products)
    //const product = products.filter(product => product.id == req.body.id)
    if (product !== -1) {
        //let newCart = await JSON.parse(cart).producto //Esto es undefined
        console.log(" product " + products[product]) 
        await fs.promises.writeFile("./public/data/cart.txt", JSON.stringify(products))
        //newCart.id =  newCart.length + 1
        //newCart[0].push(req.body)
        res.json(products)
    }else {
        res.json("A cart with that id doesn't exist")
    }
    }catch(err) {
        res.json({error: err.message})
    }
   
})

cartRouter.delete("/:id/productos/:id_prod", jsonParser, async (req, res)=> { //eliminar un producto del carrito por su id de producto y de carrito
    try {
        let carts = await fs.promises.readFile("./public/data/cart.txt", "utf-8")
        carts = await JSON.parse(carts) 
        carts[req.params.id] = carts[req.params.id].filter(product => product.id != req.params.id_prod)
        await fs.promises.writeFile("./public/data/cart.txt", JSON.stringify(carts))
    }catch (err) {
        res.json({error: err.message})
    }
    res.json(carts)
})


