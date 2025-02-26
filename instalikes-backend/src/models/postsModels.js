import 'dotenv/config'
import { ObjectId } from "mongodb"
import connectToBank from "../config/dbConfig.js"

// Conection with Database Mongo
const conection = await connectToBank(process.env.STRING_CONECTION)

// Function connection with table
export async function getAllPosts() {

  const db = conection.db('imersao-instabytes')
  const collection = db.collection('posts')
  return collection.find().toArray()

}

export async function createPost(newPost) {

  const db = conection.db('imersao-instabytes')
  const collection = db.collection('posts')
  return collection.insertOne(newPost)

}

export async function updatePost(id, newPost) {

  const db = conection.db('imersao-instabytes')
  const collection = db.collection('posts')
  const objID = ObjectId.createFromHexString(id)
  return collection.updateOne({ _id: new ObjectId(objID) }, { $set: newPost })

}