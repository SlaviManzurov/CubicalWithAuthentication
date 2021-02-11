const fs = require('fs/promises')
const path = require('path')
let productsDB = require('../config/database.json')

module.exports = {
    getAll() {
        return productsDB
    },
    getOne(id) {
        return  productsDB.find(x => x.id == id)
    },
    create(cube) {
        productsDB.push(cube)

        return fs.writeFile(
            path.join(__dirname, '../config/database.json'),
            JSON.stringify(productsDB)
        )
    }
}