const fs = require("fs")


console.log("1");


// Sync
const res = fs.readFileSync("./data.txt","utf-8");
console.log(res);


console.log("2");