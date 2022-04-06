import express from 'express';
const app = express();
const { Router } = express;
const router = Router();
import bodyParser from 'body-parser'; 
import Contenedor from "./class.js"
const productsFile = new Contenedor('products.txt');
const cartFile = new Contenedor('cart.txt');

let jsonParser = bodyParser.json();
//let urlEncodedParser = bodyParser.urlencoded({ extended: false });
let admin;

app.listen(8080, () => console.log("Server running on http://localhost:8080"))

app.on("error", ()=> {console.log("Server error")})

app.use("/api", router)

app.get('*', function(req, res){
    res.json("Ruta no implementada");
    }
);

router.get("/productos/:id?", async (req, res)=> {
    const products = await productsFile.getAll();
    if(req.params.id){
        const product = await productsFile.getById(req.params.id)
        res.json(product)
        }else{
        res.json(products)
    }}
) 

router.post("/productos/", jsonParser, async (req, res)=> {
    if (admin) {
        const product = await productsFile.save(req.body)
        res.json(product)}
        else{
        res.json({"error": 'route /api/productos/ method POST not allowed'})
    }
})

router.put("/productos/:id", jsonParser, async (req, res)=> {
    if(admin) {
        const product = await productsFile.update(req.params.id, req.body)
        res.json(product)
    }else {
        res.json({"error": 'route /api/productos/${req.params.id} method PUT not allowed'})
    }
  
})

router.delete("/productos/:id", jsonParser, async (req, res)=> {
    if(admin) {
    const product = await productsFile.deleteById(req.params.id)
    res.json(product)
    }else {
        res.json({"error": 'route /api/productos/${req.params.id} method DELETE not allowed'})
    }
})

router.post("/carrito/", jsonParser, async (req, res)=> {
    let arr = []
    arr.push(req.body)
    await cartFile.save({"id": "id", "timestamp": Date.now(), "producto": arr})
    const cart = await cartFile.getAll();
    res.json(cart)
}) 

router.delete("/carrito/:id", jsonParser, async (req, res)=> {
    const cart = await cartFile.deleteById(req.params.id)
    res.json(cart)
})

router.get("/carrito/:id/productos", jsonParser, async (req, res)=> {
    const cart = await cartFile.getById(req.params.id)
    res.json(cart)
})

router.post("/carrito/:id/productos", jsonParser, async (req, res)=> {
    const cart = await cartFile.getById(req.params.id)
    if (cart !== null) {
        let newCart = await JSON.parse(cart).producto
        producto.id = newCart.length + 1
        newCart[0].push(req.body)
        res.json(cart)
    }else {
        res.json("A cart with that id doesn't exist")
    }
})

router.delete("/carrito/:id/productos/:id_prod", jsonParser, async (req, res)=> {
    let cart = await cartFile.getById(req.params.id)
    cart = await JSON.parse(cart)
    const newCart = cart.producto[0].filter(i=> parseInt(i.id) !== parseInt(req.params.id_prod))
    res.json(newCart)
})

