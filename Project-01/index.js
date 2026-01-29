const express = require("express")
const users = require("./MOCK_DATA.json")
const fs = require("fs")


const app = express()
const PORT = 8000


// Middleware - plugin
// Middleware functions are functions that have access to the request object (req), 
// the response object (res), and the next middleware function in the application’s request-response cycle. 
// The next middleware function is commonly denoted by a variable named "next".

//built-in middlewares
app.use(express.urlencoded({ extended: false })) // used to read form data
app.use(express.json())// to covert req and res in the form of json 

/** 
//middleware-1
app.use((req,res,next)=>{
    console.log("Middleware 1");
    req.newName = "Ashish" //new modifications made , it can accessed anywhere in the application 
    next() // passes the controll to next middleware, it must be called or else the upcoming function will never get the controll
                                                    //and may still be waiting for the res and then may crash the application
})

//middleware-2
app.use((req,res,next) => {
    console.log("Middleware 2");
    console.log(req.newName); //accessing the changes made in the middleware 1
    // res.end("Ending the req-res cycle...") // to stop the cycle
    next()   
})

*/

app.use((req,res,next)=>{
    
    fs.appendFile("./logs.txt", `${Date.now()} : ${req.method} ${req.path}\n` ,(err,data) => {
        next();
    } )
})



//Routes
app.get("/users", (req, res) => {
    const html = `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `
    res.send(html)
})


//REST API's

app.get("/api/users", (req, res) => {
    res.setHeader("X-MyHeader","Welcome") //custom header
    return res.json(users)
})


//if we have common routes we can merge all the requests
app.route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id) //return string must converted to integer
        const user = users.find((user) => user.id === id)

        if(!user){
            return res.status(404).json({ message: "User not found" })
        }

        return res.json(user)
    })
    .patch((req, res) => {

        const id = Number(req.params.id)
        const userIndex = users.findIndex((user) => user.id === id)
        console.log(userIndex);

        if (userIndex === -1) {
            return res.status(404).json({ message: "User not found" });
        }

        const body = req.body

        users[userIndex] = {...users[userIndex], ...body}

        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err)=> {
            if (err) {
                res.status(500).json({ status: "Failed" })
            }
            else {
                res.json({
                    status: "success",
                    message: `User ${id} updated successfully...`
                })
            }
        })

    })
    .delete((req, res) => {
        const id = Number(req.params.id)
        const user = users.filter((user) => user.id != id)
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(user), (err) => {
            if (err) {
                res.status(500).json({ status: "Failed" })
            }
            else {
                res.json({
                    status: "success",
                    message: `User ${id} deleted successfully...`
                })
            }
        })
    })



app.post("/api/users", (req, res) => {
    const userData = req.body;
    users.push({ ...userData, id: users.length + 1 })
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) {
            res.status(500).json({ status: "Failed" })
        }
        else {
            res.status(201).json({
                status: "success",
                message: `User ${users.length} added successfully...`
            })
        }
    })
})

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`))
