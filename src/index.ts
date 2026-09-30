import mongoose, { connect, disconnect } from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const URI_DB = process.env.URI_DB || "mongodb://localhost:27017"

const connectDb = async (URI : string) => {
    try {
        await connect (URI)
        console.log("Conectado a MongoDB")
    } catch (e){console.log("error al conectar DB")}
    
}
connectDb(URI_DB)


interface IBook{
    title: string
    author: string
    stock: number
    price: number
}

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    stock: Number,
    price: Number
})

const Product = mongoose.model("book", bookSchema)