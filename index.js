import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import bookRouter from './routes/book.js';
import userRouter from './routes/user.js';
import { authenticateJWT } from './middleware/auth.js';

const app = express()

const PORT  = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())

app.use('/', userRouter)
app.use('/book', authenticateJWT, bookRouter)
app.use("*", (req, res) => {
    return res.status(404).send('API endpoint not found');
  });

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
});