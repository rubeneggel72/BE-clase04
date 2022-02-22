const fs = require('fs');

class Contenedor {
    constructor(nombre) {
        this.nombre = nombre;
    }

    async save(producto) {
        const dataJSON = await this.getAll();
        let data = JSON.parse(dataJSON)
        producto.id = data.length + 1
        data.push(producto);
        try {
            await fs.promises.writeFile(this.nombre, JSON.stringify(data));
            return `Producto ${producto.title} fué guardado en archivo ${miArchivo.nombre} `;
        }
         catch (error) {
            return (console.log(error));
        }
    }

    async getById(id) {
        try {
            const dataJSON = await this.getAll();
            let data = JSON.parse(dataJSON)
            let item = data.find(producto => producto.id === id);
            return item;
        }
        catch (error) {
            console.log('No existe el archivo :' + this.nombre)
            return "[]";
        }
    }

    async getAll() {
        try {
            return await fs.promises.readFile(this.nombre, 'utf-8') || "[]";
        }
         catch (error) {
            console.log('No existe el archivo :' + this.nombre)
            return "[]";
        }
    }
    
    async deleteById(id) {
        try {
            const dataJSON = await this.getAll();
            let data = JSON.parse(dataJSON)
            var newItems = data.filter((item) => item.id !== id);
            console.log('Se eliminó el producto Id=',id)
            await this.save(newItems)
            return ;
        }
        catch (error) {
            console.log('No existe el archivo :' + this.nombre)
            return (console.log(error));
        }
    }

    async deleteAll() {
        const dataJSON = await this.getAll();

        try {
            await fs.promises.writeFile(this.nombre, []);
            console.log('Todos los productos fueron borrados')
            // return [];
        }
         catch (error) {
            return (console.log(error));
        }
    }

};

const producto01 = {
    title: 'iPhone 11 64 GB (Product)Red',
    price: 159000,
    thumbnail: 'a001.jpg'
}
const producto02 = {
    title: 'iPhone 12 64 GB azul',
    price: 200000,
    thumbnail: 'a002.jpg'
}
const producto03 = {
    title: 'iPhone XR 64 GB negro',
    price: 139000,
    thumbnail: 'a003.jpg'
}
const producto04 = {
    title: 'iPhone 8 64 GB oro',
    price: 98999,
    thumbnail: 'a004.jpg'
}

const miArchivo = new Contenedor("./productos.txt")

async function operaciones() {

    console.log(JSON.parse(await miArchivo.getAll()))
    await miArchivo.save(producto01)
    await miArchivo.save(producto02)
    console.log(JSON.parse(await miArchivo.getAll()))
    await miArchivo.deleteAll()
    console.log(JSON.parse(await miArchivo.getAll()))
    await miArchivo.save(producto01)
    await miArchivo.save(producto02)
    await miArchivo.save(producto03)
    await miArchivo.save(producto04)
    console.log(JSON.parse(await miArchivo.getAll()))
    console.log((await miArchivo.getById(2)))

    console.log((await miArchivo.deleteById(3)))
    console.log(JSON.parse(await miArchivo.getAll()))
}

operaciones()