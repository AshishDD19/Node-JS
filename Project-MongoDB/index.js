const express = require("express")

const userRouter = require("./routes/user")
const { getConnection } = require("./connection")
const {logReqAndRes} = require("./middleware")

const app = express()
const PORT = 8000

/** MongoDB */

//Connection
getConnection("mongodb://127.0.0.1:27017/practice")
    .then(()=> console.log("DB Connected.."))
    .catch(err => console.log("DB Error: ",err))



//built-in middlewares
app.use(express.urlencoded({ extended: false })) // used to read form data
app.use(express.json())// to covert req and res in the form of json 

//custom middleware
app.use(logReqAndRes("logs.txt"))



//any request made to "/api/users"  path it will be redirected to userRouter
app.use("/api/users",userRouter)



app.listen(PORT, () => console.log(`Server started at port: ${PORT}`))
