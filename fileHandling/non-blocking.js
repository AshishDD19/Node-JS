const fs = require("fs")
const os = require("os")

console.log(os.cpus().length);


console.log("1");


// Async
fs.readFile("./data.txt","utf-8",(err,res) => {
    (err) ? console.log("Error",err): console.log("Result :",res)
});



console.log("2");