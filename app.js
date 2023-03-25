'use strict'

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs')
app.use(express.static('public'))
require('dotenv').config()
const {User} = require('./db')



// User.find()
// .then(userData => console.log(userData))
// .catch(err => console.log(err.message))





app.get('/', (req, res) => {
  res.render('home')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/register', (req, res) => {
  res.render('register')
})



app.post('/register', (req, res) => {
  const {email, password} = req.body
  const user = new User({
    email: email,
    password: password
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
    if(userData[0].password === password){
      res.render('secrets')
    }
    else {
      console.log('Username or Password Error!')
      res.send('<h2>Username or Password Error!</h2>')
    }
  })
  .catch(err => console.log(err.message))
})





const port = process.env.PORT || 3000
app.listen(port, () => console.log('Server is running on port ' + port))
