import express from 'express'
import routes from './src/routes/postsRoutes.js'

// Create conection Server
const app = express()

app.use(express.static('uploads'))

routes(app)

app.listen(3000, () => {

  console.log('Server listening!!!')

})