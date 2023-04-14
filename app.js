'use strict'

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

require('dotenv').config()
app.set('view engine', 'ejs')
app.use(express.static('public'))
// const md5 = require('md5')
const bcryptjs = require('bcryptjs')

const _ = require('lodash')
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

const {User} = require('./db')





app.get('/', (req, res) => {
  res.render('home')
})

app.get('/register', (req, res) => {
  res.render('register')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.delete('/logout', (req, res) => {
  res.redirect('/')
})

app.get('/submit', (req, res) => {
  res.render('submit')
})

app.post('/submit', (req, res) => {
  const secret = req.body.secret
  res.send('<h2>'+ secret + '</h2>')
})









////////////////////////////  md5 Hash Encryption  /////////////////////////////

function md5_hash(){
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
// md5_hash()

/////////////////////////////////////////////////////////////////////////////////










////////////////////////////  md5 Hash Encryption + salt  /////////////////////////////

function md5_hash_with_salt() {
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
}
// md5_hash_with_salt()

/////////////////////////////////////////////////////////////////////////////////











////////////////////////////  bcrypt Hash Encryption + salt rounds  /////////////////////////////

function bcrypt_hash() {
  app.post('/register', async (req, res) => {
    const email = _.toLower(req.body.email)
    let password = req.body.password
    
    if(email && password){
      
      password = await bcryptjs.hash(password, 15)

      User.find({email: email})
      .then(user => {
        if(user != ''){
          console.log('Already registered with that email.')
          res.send('<h2> Already registered with that email. <a href="/register">Try Again</a></h2>')
        }
        else{
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
        }
      })
    }
    else{
      console.log('Email or Password Empty!')
      res.redirect('/register')
    }
  })
  
  app.post('/login', (req, res) => {
    const email = _.toLower(req.body.email)
    const password = req.body.password
    
    if(email && password){
      User.find({email: email})
      .then(user => {
        if(user != ''){
          bcryptjs.compare(password, user[0].password)
          .then(true_ => {
            if(true_){
              console.log('Successfully logged in.')
              res.render('secrets')
            }
            else {
              console.log('Password Error.')
              res.send('<h2>Email or Password Error! <a href="/login">Try Again</a></h2>')
            }
          })
        }
        else{
          console.log('Email not found.')
          res.send('<h2>Email or Password Error! <a href="/login">Try Again</a></h2>')
        }
      })
      .catch(err => {
        console.log(err.message)
        res.send('<h2>Error! <a href="/login">Try Again</a></h2>')
      })
    }
    else{
      console.log('Email or Password Empty!')
      res.redirect('/login')
    }
  })
}
bcrypt_hash()

/////////////////////////////////////////////////////////////////////////////////











// User.find()
// .then(userData => console.log(userData))
// .catch(err => console.log(err.message))


// User.updateOne(
//   {email: 'aaa@gmail.com'},
//   {$set: {encryptionType: 'Only Match password - stored in database'}}
// )
// .then(() => console.log('Name added of the encryption method.'))
// .catch(err => console.log(err.message))







const port = process.env.PORT || 3000
app.listen(port, () => console.log('Server is running on port ' + port))
