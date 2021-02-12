const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const saltRound = 10;
const secret = 'navuhodnosor'


const register = async ({ username, password }) => {
    let salt = await bcrypt.genSalt(saltRound)
    let hash = await bcrypt.hash(password, salt)

    const user = new User({ username, password: hash })
    return user.save();
}

const login = async ({ username, password }) => {
    let user = await User.findOne({ username })
    if (!user) throw { message: 'User not found' }

    let isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw { message: 'password dos not mutch' }

    let token = jwt.sign({ _id: user._id, roles: ['admin'] }, secret)
    return token
}

module.exports = {
    register,
    login,
}