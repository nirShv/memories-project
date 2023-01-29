import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url';
import postRoutes from './routes/posts.js'

const app = express()
dotenv.config()

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(express.static('public'))
// app.use(cors())


const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);


// const CONNECTION_URL = 'mongodb+srv://nirProjects:nirProjects123@cluster0.bpmfyqy.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000

console.log('NODE_ENV', process.env.NODE_ENV);
console.log('process.env.PORT', process.env.PORT);

if (process.env.NODE_ENV === 'production') {
    console.log('filename', filename);
    console.log('__dirname', __dirname);
    console.log('path.resolve(__dirname, /public)', path.resolve(__dirname, '/public'));

    app.use(express.static(path.resolve(__dirname, '/public')))
 }
//  else {
//     const corsOptions = {
//         origin: ['http://127.0.0.1:5000', 'http://localhost:5000'],
//         credentials: true
//     }
//     app.use(cors(corsOptions))
// }

app.use(cors())
app.use('/posts', postRoutes)
app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, '/public', 'index.html'))
})

// mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
// mongoose.set('strictQuery', false)

console.log('process.env.CONNECTION_URL',process.env.CONNECTION_URL);
console.log('process.env.PORT',process.env.PORT);
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(process.env.PORT, () => console.log(`Server running on port: ${process.env.PORT}`)))
    .catch((error) => console.log(error.message))

// mongoose.set('useFindAndModify', false)