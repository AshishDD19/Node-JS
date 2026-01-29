const fs = require("fs")


function logReqAndRes(fileName){
    return (req,res,next) => {
        fs.appendFile(fileName, `${Date.now()} : ${req.method} ${req.path}\n` ,(err,data) => {
            next();
        } )
    }
}

module.exports = {logReqAndRes}