
require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://'+process.env.user+':'+process.env.pass+'@cluster0.pbwxcxc.mongodb.net/authDB')
// const encrypt = require('mongoose-encryption')





const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email missing !!']
  },
  password: {
    type: String,
    required: [true, 'Password missing !!']
  },
  encryptionType: String
})

// userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ['password']})

const User = mongoose.model('User', userSchema)
exports.User = User








const user1 = new User({
  email: 'Rahim@gmail.com',
  password: '12aA'
})
// user1.save()
// .then(() => console.log('New user registered.'))
// .catch(err => console.log(err.message))
