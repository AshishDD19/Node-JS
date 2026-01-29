const http = require("http")
const fs = require("fs")
const url = require("url")


function myHandler(req,res){
    //handle request and response from the user

    const log = `${Date.now()} : Request recived from ${req.url} , ${req.method} Method\n`;

    if(req.url === '/favicon.ico'){return res.end()}

    // to parse the data from the url
    const myUrl = url.parse(req.url,true) // to parse query parameter also set 'true'
    console.log(myUrl);
    

    fs.appendFile("log.txt", log, (err,data)=>{

        switch(myUrl.pathname) {
            case('/'): res.end("Home page")
            break

            case('/about'): 
                const username = myUrl.query.userName
                res.end(`Hi, ${username}`)
            break

            case('/search'):
                const search = myUrl.query.search_query
                res.end(`Here are the results for  ${search}`)
            break

            
            case('/signup'):
                if(req.method === "GET"){
                    res.end("This is a signup form")
                }
                else if(req.method === "POST"){
                    // DB query
                    res.end("Success")
                }
            break

            default: res.end("404 Not found")
        }

        
    })

}


const myServer = http.createServer(myHandler)


myServer.listen(8000,() => console.log("Server started.."))