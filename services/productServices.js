const Cube = require('../models/Cube')
const Accessory = require('../models/Accessory')

async function getAll(query) {
    let result = await Cube.find();
    
    if (query.search){
        result = result.filter(x => x.name.toLocaleLowerCase().includes(query.search))
    }
    if (query.from) {
        result = result.filter(x => Number(x.level) >= query.from)
    }
    if (query.to) {
        result = result.filter(x => Number(x.level) <= query.to)
    }

    return result
}

async function getOne(id) {

    let cube = Cube.findById(id)
    return cube
}

function getOneWithAccessories(id) {
    return Cube.findById(id).populate('accessories').lean()
}

function createProduct(data) {
    let cube = new Cube(data)

    return cube.save()
}

async function attachAccessory(productId, accessoryId) {
    let product = await Cube.findById(productId)
    let accessory = await Accessory.findById(accessoryId)

    product.accessories.push(accessory)
    return product.save()
}

module.exports = {
    getOne,
    getAll,
    getOneWithAccessories,
    createProduct,
    attachAccessory,
};
