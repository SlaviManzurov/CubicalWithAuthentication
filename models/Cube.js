const mongoose = require('mongoose')

const cubeScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 50
    },
    imageUrl: {
        type: String,
        required: true,
        validate: /^https?/,
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 0,
        max: 7
    },
    accessories: [{
        type: mongoose.Types.ObjectId,  
        ref: 'Accessory'
    }]
})

module.exports = mongoose.model('Cube', cubeScheme);
