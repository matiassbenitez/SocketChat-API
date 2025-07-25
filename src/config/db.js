import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()
const sequelize = new Sequelize(process.env.DB_URI, {
  dialect: 'mysql',
  logging: false,
})


export default sequelize
