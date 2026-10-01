import mongoose, { connect, disconnect } from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const URI_DB = process.env.URI_DB || "mongodb://localhost:27017"

const connectDb = async (URI : string) => {
    try {
        await connect (URI)
        
    } catch (e){console.log("error al conectar DB")}
    
}



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

const Book = mongoose.model("book", bookSchema)

const args = process.argv.splice(2)
const action = args[0]

const generateError = (message : string, name: string) => {
    const error = new Error (message)
    error.name = name
    return error
}

const handleError = (error : Error) =>{
    
        if (error.name==="CastError"){return " invalid ID "}

        if (error.name === "BookNotFound"){
            return error.message
        }
}

const getBooks = async (id: string | undefined) =>{
    try{
      
    if (!id){
        return await Book.find({}, {}) 
    }

    const foundBookById = await Book.findById(id)
     if (!foundBookById) {
        throw generateError ("Book not found", "BookNotFound")      
}

    return foundBookById
    }catch (error ){ 
        const e = error as Error
         return handleError (e) 
    }
}

const deleteBook = async (id: string | undefined) => {
  try {
    if (!id) {
      await Book.deleteMany({})
      return "Books deleted succefully"
    }

    const deletedBook = await Book.findByIdAndDelete(id)

    if (!deletedBook) throw generateError("Book not found", "BookNotFound")

    return deletedBook
  } catch (error) {
    const e = error as Error
    return handleError(e)
  }
}



const main = async () => {
   await connectDb(URI_DB)

    switch(action) {
        case "info": console.log(`
            show - para leer todos los libros
            show id - para buscar un libro por su Id
            create - para sumar un libro a la base de datos
            update - para actualizar la información de un libro
            delete id - para borrar un libro
            `)
        break
        case "show" : console.log(await getBooks(args[1]))
        break
         case "delete": console.log(await deleteBook(args[1]))
        break
    
    default:
         console.log("commands: <show |show id | create | update | delete>")
    }
    
    await disconnect()
}


main()