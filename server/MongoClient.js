const { MongoClient, ObjectId } = require('mongodb')
require('dotenv').config()

const password = process.env.PASSWORD
const uri = `mongodb+srv://reinaldoams:${password}@cluster0.omkuj.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri)

module.exports = client