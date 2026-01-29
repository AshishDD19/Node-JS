const express = require("express")
const { getConnection } = require("./connection")
const urlRouter = require("./routes/url")
const app = express()
const PORT = 8001

//middleware
app.use(express.json())
//connection
getConnection("mongodb://127.0.0.1:27017/urlShortner")
    .then(() => console.log("DB Connected..."))
    .catch(err => console.log("DB Error", err))


app.use("/api/url", urlRouter)

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`))
