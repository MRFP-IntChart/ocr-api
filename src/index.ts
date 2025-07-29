import api from './api.js'


const port = process.env.PORT

api.listen(port, () => {console.log(`Server is listening on port: ${port}`)})
