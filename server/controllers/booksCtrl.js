const {User} = require('../models/user')
const {Book} = require('../models/book')
const {SavedBook} = require('../models/saved_book')

module.exports = {
    addBook: async (req, res) => {
        try {
            const {bookTitle, bookDescription, image} = req.body
            const {userId} = req.params
            
            await Book.create({bookTitle, bookDescription, image, userId})

            res.sendStatus(200)

        } catch (err) {
            console.log(err)
            res.sendStatus(00)
        }
    },
    getAllBooks: async (req, res) => {
        try {
            const books = await Book.findAll({include: [{
                model: User,
                required: true,
                attributes: ['username']
            }]})
            res.status(200).send(books)
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    },
    addToMyBooks: async (req, res) => {
        try{
        const {userId, bookId} = req.body
        await SavedBook.create({ userId, bookId})
        res.sendStatus(200)
        } catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
        
    },
    getMyBooks: async (req, res) => {
        try {
            const {userId} = req.params
            const savedBooks = await SavedBook.findAll ({
                where: {userId},
                include: [{
                    model: Book,
                    require: true,
                    include: {
                        model: User,
                        required: true,
                        attributes: ["username"]
                    }
                }]
            })
            res.status(200).send(savedBooks)
        } catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    }

}