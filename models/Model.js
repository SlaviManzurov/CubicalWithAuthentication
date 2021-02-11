const fs = require('fs/promises')
const path = require('path')
let productsDB = require('../config/database.json')

class Model {
    
    save() {
        productsDB.push(this)

        return fs.writeFile(
            path.join(__dirname, '../config/database.json'),
            JSON.stringify(productsDB)
        )
    }

    static getAll(){
        return productsDB
    }

    static getOne(id){
        return  productsDB.find(x => x.id == id)
    }

}
module.exports = Model;