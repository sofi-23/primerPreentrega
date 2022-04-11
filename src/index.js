import express from 'express';
const app = express();
import { productRouter } from './public/routes/productsRoutes.js';
import { cartRouter } from './public/routes/cartRoutes.js';


app.listen(8080, () => console.log("Server running on http://localhost:8080"))

app.on("error", ()=> {console.log("Server error")})

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/productos", productRouter);
app.use("/api/carrito", cartRouter);


app.get('*', function(req, res){
    res.json("Ruta no implementada");
    }
);






