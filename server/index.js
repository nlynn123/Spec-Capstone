require('dotenv').config()

const express = require('express')
const cors = require('cors')

const {SERVER_PORT} = process.env
const {sequelize} = require('./util/database')
const {User} = require("./models/user")
const {Book} = require("./models/book")
const {SavedBook} = require("./models/saved_book")

const app = express()

app.use(express.json())
app.use(cors())

User.hasMany(Book)
Book.belongsTo(User)

User.hasMany(SavedBook)
Book.hasMany(SavedBook)
SavedBook.belongsTo(User)
SavedBook.belongsTo(Book)

const {register, login} = require('./controllers/authCtrl') 
const {isAuthenticated} = require('./middleware/isAuth')
const {addBook, getAllBooks, addToMyBooks, getMyBooks} = require('./controllers/booksCtrl')

//User endpoints

app.post('/register', register)
app.post('/login', login)

//book endpoints

app.post('/book/:userId', isAuthenticated, addBook)
app.get('/book', isAuthenticated, getAllBooks)

app.post('/mybooks', isAuthenticated, addToMyBooks)
app.get('/mybooks/:userId', isAuthenticated, getMyBooks)



sequelize.sync()
.then(() => {
    app.listen(SERVER_PORT, console.log(`Turn to page ${SERVER_PORT}`))
})
.catch(err => console.log(err))