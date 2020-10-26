import { books } from '../db/books.js'

export default { 
    getAllBooks: (req, res) => {
        res.send(books)
    },
    postNewBook: (req, res) => {
        const { role } = req.user

        if (role !== 'admin') {
            return res.sendStatus(403);
        }
    
        const book = req.body
        books.push(book)
        res.send(' book added successfully')
    }
}