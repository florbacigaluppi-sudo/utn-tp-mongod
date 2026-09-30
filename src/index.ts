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
