import dotenv from "dotenv"


dotenv.config({quiet: true})

const forTesting = process.env.FOR_TESTING === 'y'

// REMINDER: Any updates involving environment variables must be reflected
//  in the Github actions workflow env list

const config = {
  TESTING: forTesting,
  env: process.env.NODE_ENV,
  secret: process.env.SECRET ?? '',
}

export default config
