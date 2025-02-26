import { getAllPosts, createPost, updatePost } from "../models/postsModels.js"
import fs from 'fs'
import gerarDescricaoComGemini from '../services/geminiService.js'

export async function listPost(req, res) {

  const posts = await getAllPosts()
  res.status(200).json(posts)

}

export async function nwPost(req, res) {

  const newPost = req.body

  try {

    const postCreated = await createPost(newPost)
    res.status(200).json(postCreated)

  } catch (error) {

    console.error(error.message)
    res.status(500).json({ 'Erro': 'Falha na requisição' })

  }
}

export async function uploadImage(req, res) {

  const newPost = {

    description: '',
    imgUrl: req.file.originalname,
    alt: ''
  }

  try {

    const postCreated = await createPost(newPost)

    const updatedImage = `uploads/${postCreated.insertedId}.png`

    fs.renameSync(req.file.path, updatedImage)

    res.status(200).json(postCreated)

  } catch (error) {

    console.error(error.message)
    res.status(500).json({ 'Erro': 'Falha na requisição' })

  }
}

export async function updateNewPost(req, res) {

  const id = req.params.id;
  const urlImage = `http://localhost:3000/${id}.png`


  try {

    const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
    const description = await gerarDescricaoComGemini(imgBuffer)

    const post = {

      imgUrl: urlImage,
      description: description,
      alt: req.body.alt
    }
    const postCreated = await updatePost(id, post)


    res.status(200).json(postCreated)

  } catch (error) {

    console.error(error.message)
    res.status(500).json({ 'Erro': 'Falha na requisição' })

  }
}