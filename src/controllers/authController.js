import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import sequelize from './../config/db.js'
import { DataTypes } from 'sequelize'
import UserModel from './../models/userModel.js'
import { validationResult } from 'express-validator'

dotenv.config()
const User = UserModel(sequelize, DataTypes)
const authController = {
  register: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { username, password, email } = req.body

    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      console.log('Hashed password:', hashedPassword)
      const user = await User.create({ username, password: hashedPassword, email })
      console.log('User created:', user)
      res.status(201).json({ message: 'User registered successfully', userId: user.id })
    } catch (error) {
      res.status(500).json({ error: 'Error registering user', error })
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body
    try {
      const user = await User.findOne({ where: { username } })
      if (!user) {
        return res.status(400).json({ error: 'Invalid username or password' })
      }
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid username or password' })
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })
      res.status(200).json({ message: 'Login successful', token })
    } catch (error) {
      res.status(500).json({ error: 'Error logging in' })
    }
  }
}

export default authController