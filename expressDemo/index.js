// const http = require("http")  not required, because express internally uses http module
const express = require("express")



// app. METHOD(PATH,HANDLER)

// -- app is an instance of express.
// -- METHOD is an HTTP request method, in lowercase.
// -- PATH is a path on the server.
// -- HANDLER is the function executed when the route is matched.


// - while using express we easily write the handler function 
// - we can fetch the data from the url directly without using 'url' package
// - we will write all the required http methods individually for each functionality clearly

//it acts like handler function
const app = express() //creating obj of express , where we write all functionality http methods 


app.get("/", (req,res) => {
    return res.send("Welcome to home page...")
})

app.get("/about",(req,res) => {
    return res.send(`Hi ${req.query.name}(${req.query.id})`)
})


app.listen(8000,() => console.log("Server started..."))

// const myServer = http.createServer(app)
// myServer.listen(8000,() => console.log("Server started..."))