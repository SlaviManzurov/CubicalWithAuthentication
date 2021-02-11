const mongoogse = require('mongoose')

const userSchema = new mongoogse.Schema({
    id: mongoogse.Types.ObjectId,
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

module.exports - mongoogse.model('User',userSchema)