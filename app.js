'use strict'

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs')
app.use(express.static('public'))
require('dotenv').config()
const md5 = require('md5')

const {User} = require('./db')





app.get('/', (req, res) => {
  res.render('home')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/register', (req, res) => {
  res.render('register')
})








////////////////////////////  md5 Hash Encryption  /////////////////////////////

function hash(){
  app.post('/register', (req, res) => {
    const {email, password} = req.body
    
    const user = new User({
      email: email,
      password: md5(password)
    })
    user.save()
    .then(() => {
      console.log('New user created.')
      res.render('secrets')
    })
    .catch(err => console.log(err.message))
  })
  
  app.post('/login', (req, res) => {
    const {email, password} = req.body
    
    User.find({email: email})
    .then(userData => {
      if(userData[0].password === md5(password)){
  
        res.render('secrets')
      }
      else {
        console.log('Username or Password Error!')
        res.send('<h2>Username or Password Error!</h2>')
      }
    })
    .catch(err => console.log(err.message))
  })
}
// hash()

/////////////////////////////////////////////////////////////////////////////////










////////////////////////////  md5 Hash Encryption + salt  /////////////////////////////

app.post('/register', (req, res) => {
  const {email, password} = req.body
  
  if(email && password){
    const user = new User({
      email: email,
      password: md5(password+process.env.SALT)
    })
    user.save()
    .then(() => {
      console.log('New user created.')
      res.render('secrets')
    })
    .catch(err => console.log(err.message))
  }
  else{
    console.log('Email or Password Empty!')
    res.send('<h2>Email or Password Empty!</h2>')
  }
})

app.post('/login', (req, res) => {
  const {email, password} = req.body
  
  User.find({email: email})
  .then(userData => {
    if(userData[0].password === md5(password + process.env.SALT)){

      res.render('secrets')
    }
    else {
      console.log('Email or Password Error!')
      res.send('<h2>Email or Password Error!</h2>')
    }
  })
  .catch(err => {
    console.log(err.message)
    res.send('<h2>Email or Password Error!</h2>')
  })
})

/////////////////////////////////////////////////////////////////////////////////














// User.find()
// .then(userData => console.log(userData))
// .catch(err => console.log(err.message))


// User.updateOne(
//   {email: 'fazlay.rabbi@gmail.com'},
//   {$set: {encryptionType: 'Only Match password - stored in database'}}
// )
// .then(() => console.log('Name added of the encryption method.'))
// .catch(err => console.log(err.message))







const port = process.env.PORT || 3000
app.listen(port, () => console.log('Server is running on port ' + port))
