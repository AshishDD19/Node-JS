const User = require("../model/user")

async function createUser(req,res) {
    const userData = req.body;

    const result = await User.create({
        firstName: userData.first_name,
        lastName: userData.last_name,
        email: userData.email,
        gender: userData.gender,
        jobTitle: userData.job_title
    })

    console.log("Result",result);

    return res.status(201).json({status : "Success",
                                message: `User created successfully... `
    })
}



async function getAllUsers(req,res) {
    const allUsers = await User.find({})
    return res.json(allUsers)
}

async function getUserById(req,res) {
    const user = await User.findById(req.params.id)

    if(!user){
        return res.status(404).json({ message: "User not found" })
    }

    return res.json(user)
}

async function updateUser(req,res) {
    const user = await User.findByIdAndUpdate(req.params.id,{lastName:"Updated"})
        
    if(!user){
        return res.status(404).json({ message: "User not found" })
    }

    return res.json({
        status: "success",
        message: `User updated successfully...`
    })
}


async function deleteUser(req,res) {
    const user = await User.findByIdAndDelete(req.params.id)
        
    if(!user){
        return res.status(404).json({ message: "User not found" })
    }

    return res.json({
        status: "success",
        message: `User deleted successfully...`
    })
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
}