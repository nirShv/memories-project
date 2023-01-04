import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import postRoutes from './routes/posts.js'

const app = express()
dotenv.config()

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(express.static('public'))
// app.use(cors())



// const CONNECTION_URL = 'mongodb+srv://nirProjects:nirProjects123@cluster0.bpmfyqy.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000

console.log('NODE_ENV', process.env.NODE_ENV);
console.log('process.env.PORT', process.env.PORT);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '/public', 'index.html')))
} else {
    const corsOptions = {
        origin: [`http://127.0.0.1:3000`, `http://localhost:3000`],
        credentials: true
    }
    app.use(cors(corsOptions))
}

app.use('/posts', postRoutes)

// app.get('/', (req, res) => {
//     res.send('Hello to Moments API')
// })


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))

// mongoose.set('useFindAndModify', false)