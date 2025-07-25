import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { Server } from 'socket.io'
import { createServer } from 'http'
import authRoutes from './routes/authRoutes.js'
import sequelize from './config/db.js'
import authMiddleware from './middlewares/authMiddleware.js'

dotenv.config()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const server = createServer(app)
const io = new Server(server)
app.use(express.static(join(__dirname,'..', 'public')))

app.use(cors())
app.use(express.json())
app.use('/auth', authRoutes)


sequelize.sync()
  .then(() => {
    console.log('Tables synchronized successfully')
  })
  .catch((err) => {
    console.error('Error synchronizing tables:', err)
  })
  
  io.use(authMiddleware.verifyToken)
const port = process.env.PORT || 3000
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'))
})

io.on('connection', (socket) => {
  const { username, room } = socket.handshake.auth
  socket.join(room);
  io.to(room).emit('message', { username: 'System', text: `${username} has joined the chat.` })
  console.log('User connected:', username, 'in room:', room)
  socket.on('chatMessage', (msg) => {
    console.log(`Message received in room ${room}:`, msg)
    io.to(room).emit('message', { username: socket.handshake.auth.username, text: msg });
  })
  socket.on('disconnect', () => {
    if (username && room ) {
      io.to(room).emit('message', { username: 'System', text: `${username} has left the chat.` })
    }
    console.log('A user disconnected')
  })
})

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
