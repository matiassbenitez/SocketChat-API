import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { Server } from 'socket.io'
import { createServer } from 'http'

dotenv.config()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const server = createServer(app)
const io = new Server(server)
app.use(express.static(join(__dirname,'..', 'public')))

const port = process.env.PORT || 3000
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'))
})

io.on('connection', (socket) => {
  console.log('A user connected')
  socket.on('disconnect', () => {
    console.log('A user disconnected')
  })
})
app.use(cors())
app.use(express.json())

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
