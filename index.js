const fs = require('fs');

//crear clase que reciba el nombre del archivo

class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }

    getId() {
        //devolver el id mas alto + 1
        let contenido = fs.readFileSync(this.nombreArchivo, 'utf-8');
        let objetos = JSON.parse(contenido);
        let id = objetos.length > 0 ? objetos[objetos.length - 1].id + 1 : 1;
        return id;
    }


    // recibe un objeto, lo guarda en el archivo, devuelve el id asignado

    save(objeto) {
        //guardar el objeto en el archivo
        let id = this.getId();
        objeto.id = id;
        let json = JSON.stringify(objeto);
        fs.writeFileSync(this.nombreArchivo, json + '\n');
        return id;
    }

   
    //crear metodo que reciba un id y devuelva el objeto correspondiente o null si no existe
    findById(id) {
        let contenido = fs.readFileSync(this.nombreArchivo, 'utf-8');
        let objetos = JSON.parse(contenido);
        let objeto = objetos.find(obj => obj.id == id);
        return objeto;
    }

    //devolver un array con todos los objetos del archivo
    findAll() {
        let contenido = fs.readFileSync(this.nombreArchivo, 'utf-8');
        let objetos = JSON.parse(contenido);
        return objetos;
    }

    //eliminar del archivo el objeto con el id recibido
    delete(id) {
        let contenido = fs.readFileSync(this.nombreArchivo, 'utf-8');
        let objetos = JSON.parse(contenido);
        let objeto = objetos.find(obj => obj.id == id);
        let indice = objetos.indexOf(objeto);
        objetos.splice(indice, 1);
        fs.writeFileSync(this.nombreArchivo, JSON.stringify(objetos));
    }

    //elimina todos los objetos del archivo
    deleteAll() {
        fs.writeFileSync(this.nombreArchivo, '[]');
    }
}

// instanciar la clase
let contenedor = new Contenedor('productos.txt');
//metodo save
let prod1 = contenedor.save({ nombre: 'Leche', precio: 100 });
console.log(prod1);

let prod2 = contenedor.save({ nombre: 'Arroz', precio: 200 });
console.log(prod2);


//metodo findById
let prod3 = contenedor.findById(prod1);
console.log(prod3);




