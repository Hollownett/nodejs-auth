import express from'express'
import bodyparser  from'body-parser'
import cors from'cors'


const app = express()

const PORT  = 4000


app.use(bodyparser.json())

app.use(cors())


app.get("/books",  authenticateJWT ,(req, res) => {
    res.json(books)
})

app.post("/books", authenticateJWT, (req, res) => {
    const { role } = req.user

    if (role !== 'admin') {
        return res.sendStatus(403);
    }

    const book = req.body
    books.push(book)
    res.send(' book added successfully')
})

app.listen(PORT, () => {
    console.log(`Book server listening at http://localhost:${PORT}`)
})