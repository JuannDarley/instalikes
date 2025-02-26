import express from 'express'
import multer from 'multer'
import cors from 'cors'
import { listPost, nwPost, uploadImage, updateNewPost } from '../controllers/postController.js'

const corsOptions = {
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

const upload = multer({ dest: "./uploads", storage })

const routes = (app) => {

  app.use(express.json())

  app.use(cors(corsOptions))

  //Route to search posts
  app.get('/posts', listPost)

  //Route to create posts
  app.post('/posts', nwPost)

  // Route to create image
  app.post('/upload', upload.single('image'), uploadImage)

  // Route to update posts
  app.put('/upload/:id', updateNewPost)
}
export default routes