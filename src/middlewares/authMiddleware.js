import jwt from 'jsonwebtoken'

const authMiddleware = {
  verifyToken: (socket, next) => {
    const token = socket.handshake.auth.token
    if (!token) {
      return next(new Error('Authentication error: No token provided'))
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      socket.user = decoded
      console.log('Token verified successfully:', decoded)
      next()
    } catch (err) {
        console.error('Token verification failed:', err)
        return next(new Error('Authentication error: Invalid or expired token'))
    }
  }
}

export default authMiddleware