const fs = require("fs")

// Writing on file 
// Synch 
// fs.writeFileSync("./text.txt", "Hello  to JS");

// Async 
// fs.writeFile("./text.txt","Hello and welcome",(err) => {})


// Reading from a file
// Sync
const res = fs.readFileSync("./data.txt","utf-8");
console.log(res);


// Async
fs.readFile("./data.txt","utf-8", (err,res) => {
    (err) ? console.log("Error",err): console.log("Result :",res)
       
});



//Appending to a file
fs.appendFileSync("./text.txt", `${Date.now()} List\n`)

//Copy to different file
fs.cpSync("./text.txt","./copy.txt")


//Delete a file
fs.unlinkSync("./copy.txt")

//Create folder/directory
// fs.mkdirSync("my-folder")

// or 

fs.mkdirSync("my-folder/a/b",{recursive:true})



