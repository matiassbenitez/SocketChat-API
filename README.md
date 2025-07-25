# 💬 SocketChat-API

SocketChat-API is a simple real-time chat application built with **Node.js**, **Express**, and **Socket.IO**, featuring **JWT authentication** and **MySQL** as the database. Users must register and log in to join chat rooms via WebSockets.

---

## 🚀 Features

- 🧑‍💻 User registration and login
- 🔐 JWT-based authentication
- 💬 Real-time messaging with Socket.IO
- 🗃️ MySQL + Sequelize for database management
- 🧪 Express Validator for input validation

---

## 📦 Technologies

- **Node.js**
- **Express.js v5**
- **Socket.IO**
- **MySQL & Sequelize**
- **JWT**
- **bcrypt**
- **dotenv**
- **express-validator**

---

## 📁 Project Structure

```
/public              → Static files (e.g. index.html)
/src
  /config            → DB configuration
  /controllers       → Authentication logic
  /middlewares       → Validation & auth middlewares
  /models            → Sequelize models
  /routes            → Express routes (e.g. /auth)
  /tests             → (empty for now)
index.js             → Main entry point
.env.example         → Environment variable setup
```

---

## ⚙️ Environment Variables

Create a `.env` file based on `.env.example`:

```env
PORT=3000
JWT_SECRET=your_jwt_secret_key
DB_URI=mysql://root:root@127.0.0.1:3306/socketchat
```

---

## 🛠️ Installation

1. Clone the repo:

```bash
git clone https://github.com/your-username/SocketChat-API.git
cd SocketChat-API
```

2. Install dependencies:

```bash
npm install
```

3. Create your `.env` file:

```bash
cp .env.example .env
```

4. Run the server:

```bash
npm start
```

---

## 🧪 API Endpoints

### 🔐 Auth

- `POST /auth/register`  
  Required fields: `username`, `email`, `password`

- `POST /auth/login`  
  Required fields: `username`, `password`  
  Returns a JWT token.

---

## 🔌 Connecting to the WebSocket

Once authenticated, connect to the socket using the token:

```js
const socket = io('http://localhost:3000', {
  auth: {
    token: 'your_jwt_token'
  }
})

socket.emit('joinRoom', { username: 'matias', room: 'general' })
```

---

## 👨‍💻 Author

Matías Sebastián Benítez  
📧 [matias.benitez.2203@gmail.com](mailto:matias.benitez.2203@gmail.com)  
🔗 [https://github.com/matiassbenitez](https://github.com/matiassbenitez)