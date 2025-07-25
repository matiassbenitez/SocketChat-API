import express from 'express'
import authController from '../controllers/authController.js'
import { body, validationResult } from 'express-validator'
import handleErrorValidation from '../middlewares/handleErrorValidation.js'
const router = express.Router()

router.post('/register',[
  body('username').isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('email').isEmail().withMessage('Must be a valid email address'),
  handleErrorValidation],
  authController.register)

router.post('/login', [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
  handleErrorValidation],
  authController.login)

export default router