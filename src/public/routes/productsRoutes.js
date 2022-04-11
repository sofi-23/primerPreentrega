import Contenedor  from "../classes/productsClass.js";
const productsFile = new Contenedor("products.txt")
import express from "express";
const { Router } = express;

export const productRouter = Router()
let admin = true

// Podemos quitar el json parser, y utilizar en la instancia de express, express.json en el index.js

// en este método podriamos verificar, por ejemplo si el id no existe, 
//en tu metodo getById, devuelve un null, entonces aca podriamos preguntar si products es null,
// y devolver un mensaje en base a eso

productRouter.get("/:id?", async (req, res)=> {
    const products = await productsFile.getAll();
    if(req.params.id){
        const product = await productsFile.getById(req.params.id)
        if (product == null) {
            res.json({error: "Product not found"})
        } else {
            res.json(product)
        }
        }else{
        res.json(products)
    }}
) 



// cuando recibimos data, nos podrian enviar cualquier variable, por lo que nosotros deberiamos filtrarlas y 
//quedarnos solo con las que sabemos que necesitamos
productRouter.post("/", async (req, res) => {
    if (admin) {
        try {
             // aca hacemos un destructuring del objeto body que nos llega, solo agarrando lo que queremos (hacer lo cambios necesarios)
            //const { title, price, thumbnail } = req.body;
            //console.log("REQBODY" + req.body.title)
            const title = req.body.title; //Aca no me salió con el destructuring :(
            const price = req.body.price;
            const thumbnail = req.body.thumbnail; 
            // y eso es lo que tenemos que enviarle al save, podemos pasarlo así tal cual o crear otro objeto
            // aca creamos un objeto pasandole el title, desription y price de arriba
            // y se lo pasamos al save
            const product = await productsFile.save({ title, price, thumbnail });
            res.json(product);
        }catch (error) {
            res.json({error: error.message})
        }
     
    } else {
      res.json({ error: "route /api/productos/ method POST not allowed" });
    }
  });

  productRouter.put("/:id", async (req, res) => {
    if (admin) {
        // Lo mismo que en el post, recomiendo agarrar solo las variables necesarias y no enviar todo el body a la clase
        
        const product = await productsFile.update(req.params.id, req.body);
  

      // ya que retornar null, si el id no existe, podrias aca hacer un condicional
      if(product) res.json(product)
  
      res.send('Error') // o algun formato que quieras para avisar que el id no existe
  
    } else {
      res.json({
        error: "route /api/productos/${req.params.id} method PUT not allowed",
      });
    }
  });
  