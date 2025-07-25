import { validationResult } from "express-validator"

const handleErrorValidation = (req, res, next) => {
  console.log('Validating request body:', req.body)
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}
export default handleErrorValidation