import express from 'express'
import book from '../controllers/books.js'


const route = express.Router()

export default route
    .get('/books', book.getAllBooks)
    .post('/books', book.postNewBook)
