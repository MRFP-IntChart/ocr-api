import dotenv from "dotenv"

dotenv.config()

const forTesting = process.env.FOR_TESTING === 'y'

const config = {
  TESTING: forTesting,
  env: process.env.NODE_ENV,
  secret: process.env.SECRET,
}

export function isProductionEnv() {
  return config.env === 'production'
}

export default config
