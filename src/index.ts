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

        if (error.name === "InvalidData") {
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

const createBook = async (data: string []) => {
    try{
    const newBook: IBook = {
    title: "libro",  
    author: "no especifica",
    stock: 0,
    price: 0,
    }

    if (data[0]?.split("=")[0] !=="title" || !data[0]?.split("=")[1]){
        console.log("Title is required")
        return
    }

    for (let i=0; i < data.length; i++) {
        const prop= data[i]?.split("=") as string []
        const nameProp = prop [0]
        const value = prop [1]

        switch (nameProp){
            case "title": 
            newBook.title = String(value)
            break
            case "price": 
            newBook.price = value ? Number (value) : newBook.price
            break
            case "stock": 
            newBook.stock = value ?  Number (value) : newBook.stock
            break
            case "author":
            newBook.author = value ? value : newBook.author
            break
            default: 
            throw generateError("Invalid data to create a new book", "InvalidData")
        }

    }
        return await Book.create(newBook)
    } catch (error){
        const e = error as Error
        return handleError(e)
    }
}

const updateBook = async (id: string | undefined, updates: string[]) => {
  try {
    const data: Partial<IBook> = {}

    if (!id) { throw generateError("ID is required", "InvalidData") }

    for (const update of updates) {
      const [prop, value] = update.split("=")

      if (!value) {
        throw generateError(`Invalid data for ${prop}`, "InvalidData")
      }

      switch (prop) {
        case "title":
          data.title= value
          break
        case "price":
          data.price = +value
          break
        case "stock":
          data.stock = +value
          break
        case "author":
          data.author = value
          break
        default:
          throw generateError("Invalid data to update a new book", "InvalidData")
      }
    }

  const updatedBook = await Book.findByIdAndUpdate(
      id,
      data,
      { new: true }
    )

    if (!updatedBook) {
      throw generateError("Book not found", "BookNotFound")
    }

    return updatedBook

  } catch (error) {
    const e = error as Error
    return handleError(e)
  }
}



const main = async () => {
   await connectDb(URI_DB)

    switch(action) {
        case "info": console.log(`
            show - para mostrar todos los libros
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
        case "create" : console.log(await createBook(args.splice(1)))
        break
        case "update" : console.log(await updateBook(args[1], args.splice(2)))
        break
    
    default:
         console.log("commands: <show |show id | create | update | delete>")
    }
    
    await disconnect()
}


main()