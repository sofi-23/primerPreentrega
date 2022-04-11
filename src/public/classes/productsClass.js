import fs from "fs";

export default class Contenedor {
    constructor(fileName) {
        this.fileName = fileName
    }
    async getAll() {
        try {
            let data = await fs.promises.readFile("./public/data/" + this.fileName, "utf-8") //!!!!
            data = await JSON.parse(data)
            return data
        }catch (err){
            console.log("no se pudo leer el archivo. Error: " + err)
        }
    }
    async getById(id) {
        //recibe un id y devuelve el objeto correspondiente, o null si no existe. 
        console.log("getById")
        console.log("this.filename " + this.fileName)
        try {
            let data = await fs.promises.readFile("./public/data/" + this.fileName, "utf-8")
            data = JSON.parse(data)
                let item = data.find(i=> i.id == id)
                if (item !== undefined) {
                    item = JSON.stringify(item)
                    console.log("ITEM" + item)
                    return item
                }else {
                    console.log("No existe un producto con ese id")
                    return null
                }
                
            } catch(err) {
            console.log("No existe el archivo")
        }

    }

    async save(title, description, price) {
        try {
            let data = await fs.promises.readFile("./public/data/" + this.fileName, "utf-8")          
            data = await JSON.parse(data)
            const newObject = {}
            newObject.id = data.length + 1
            newObject.timestamp = Date.now()
            newObject.title = title
            newObject.description = description
            newObject.price = price
            data.push(newObject)
            try {
                await fs.promises.writeFile("./public/data/" + this.fileName, JSON.stringify(data))
                return data 
            }catch(err) {
                console.log("no se pudo agregar el objeto")
            }
        }catch(err){
            console.log({error : err.message})    
                objeto.id = 1
                const productos = []
                productos.push(objeto)
                fs.promises.writeFile("./public/data/" + this.nombre, JSON.stringify(productos))
        }
    }
    async getById(id) {
        //recibe un id y devuelve el objeto correspondiente, o null si no existe.
        try {
            let data = await fs.promises.readFile("./public/data/" + this.fileName, "utf-8")
            console.log(data)
            data = JSON.parse(data)
                let item = data.find(i=> i.id == id)
                if (item !== undefined) {
                    item = JSON.stringify(item)
                    console.log("ITEM" + item)
                    return item
                } else {
                    console.log("No existe un producto con ese id")
                    return null
                }
                
            } catch(err) {
            console.log("No existe el archivo")
        }

    }
    async update(id, objeto) {
        try {
            let data = await fs.promises.readFile("./public/data/" + this.fileName, "utf-8")
            data = JSON.parse(data)
            // let item = data.find(i=> i.id == id)
            // Tal vez seria mejor obtener el indice de ese producto, para modificarlo sobre el mismo array
            const itemIndex = data.findIndex(producto => producto.id == id)
            // findindex devuelve -1 si no existe 
            if (itemIndex !== -1) {
                //objeto.id = id
                // en la misma posición que estaba, que la contramos con el findIndex, reemplazamos el producto
                // mirar linea 113 para una alternativa a actualizar un elemento
                data[itemIndex] = { ...data[itemIndex], ...objeto } 
                await fs.promises.writeFile("./public/data/" + this.fileName, JSON.stringify(data))
                return data
            } else {
                console.log("No existe un producto con ese id")
                return null
            }
            
        } catch(err) {
            console.log("No existe el archivo")
        }

    }
    // actualizar un objeto sin perder todas las propiedades (util por ejemplo, si no queremos perder el timestamp, 
    //o volver a setear el id como esta hecho en la linea 97)
    /*    copiamos todas las propiedades del objeto que existen en esa posicion, y le agregamos las nuevas (si se 
        llaman igual las propiedades que contiene objeto, se van a reemplazar)
        data[itemIndex] = { ...data[itemIndex], ...objeto }

        Copia esto en la consola del navegador para ver como funciona: **************

        const arrayP = [ { id: 1, title: 'prueba1', price: 120},  { id: 2, title: 'prueba2', price: 125}, 
        { id: 3, title: 'prueba3', price: 200}]
        const newData = { title: 'prueba2 MODificada', price: 150}
        arrayP[2] = {...arrayP[2], ...newData}

        vuelve a escribir arrayP para verlo actualizado

    */
    async deleteById(id) {
        //Elimina los objetos con el id buscado. 
        try {
            let data = await fs.promises.readFile("./public/data/" + this.fileName, "utf-8")
            data = await JSON.parse(data)
            try {
                data = data.filter(i=> parseInt(i.id) !== parseInt(id))
                fs.promises.writeFile("./public/data/" + this.fileName, JSON.stringify(data))
                console.log(data)
                return data
            } catch (err) {
            return {error: err.message}
            }
        }catch (err) {    
            return {error: err.message}
        }
    } 

}
