
import  fs  from 'fs'

export default class Contenedor {
        constructor(fileName) {
            this.fileName = fileName
        }
    async getAll() {
        try {
            let data = await fs.promises.readFile(this.fileName, "utf-8") //!!!!
            data = await JSON.parse(data)
            return data
        }catch (err){
            console.log("no se pudo leer el archivo. Error: " + err)
        }
    }
    async getById(id) {
        //recibe un id y devuelve el objeto correspondiente, o null si no existe.
        try {
            
            let data = await fs.promises.readFile("./" + this.fileName, "utf-8")

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
    
    async save(objeto) {
        try {
            let data = await fs.promises.readFile("./" + this.fileName, "utf-8")          
            data = await JSON.parse(data)
            objeto.id = data.length + 1
            objeto.timestamp = Date.now()
            data.push(objeto)
            try {
                await fs.promises.writeFile("./" + this.fileName, JSON.stringify(data))
                data = await fs.promises.readFile("./" + this.fileName, "utf-8")
            }catch(err) {
                console.log("no se pudo agregar el objeto")
            }
        }catch(err){
            console.log("No existe el archivo")    
                objeto.id = 1
                const productos = []
                productos.push(objeto)
                fs.promises.writeFile("./" + this.nombre, JSON.stringify(productos))
        }
    }
    async getById(id) {
        //recibe un id y devuelve el objeto correspondiente, o null si no existe.
        try {
            let data = await fs.promises.readFile("./" + this.fileName, "utf-8")
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
            let data = await fs.promises.readFile("./" + this.fileName, "utf-8")
            data = JSON.parse(data)
            let item = data.find(i=> i.id == id)
            if (item !== undefined) {
                objeto.id = id
                data[parseInt(id)-1] = objeto
                await fs.promises.writeFile("./" + this.fileName, JSON.stringify(data))
                return data
            } else {
                console.log("No existe un producto con ese id")
                return null
            }
            
        } catch(err) {
            console.log("No existe el archivo")
        }

    }
    
    async deleteById(id) {
        //Elimina los objetos con el id buscado.
        try {
            let data = await fs.promises.readFile("./" + this.fileName, "utf-8")
            data = await JSON.parse(data)
            try {
                data = data.filter(i=> parseInt(i.id) !== parseInt(id))
                fs.promises.writeFile("./" + this.fileName, JSON.stringify(data))
                console.log(data)
                return data
            } catch {
                console.log("no existe el id")
            }
        }catch {    
            console.log("Archivo inexistente")
        }
    } 
    /*

    async deleteAll() {
        //elimina todos los objetos presentes en el archivo
        try {
            await fs.promises.readFile("./" + this.nombre, "utf-8")
            await fs.promises.writeFile("./" + this.nombre, [])
            let data = fs.promises.readFile("./" + this.nombre, "utf-8")
            data = JSON.stringify(data)
            console.log("DATA" + data)
        }catch {
            console.log("Archivo inexistente")
        }
    }

    */


}

