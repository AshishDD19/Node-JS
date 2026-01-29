function add(a,b) {
    return a + b;
}

function sub(a,b){
    return a - b;
}

module.exports = {addFn:add,
                subFn:sub
}


// or 

// exports.addFn = (a,b) => a + b;
// exports.subFn = (a,b) => a - b;