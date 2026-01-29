const express = require("express")
const { getAllUsers, getUserById, updateUser, deleteUser, createUser } = require("../controller/user")

//for registering routes
const router = express.Router()

//REST API's

//if client makes an request to particular path "/" will be read as "/api/users" if "/api/users" is called

// Express automatically invokes the function and injects req and res when an HTTP request matches the route
router.get("/", getAllUsers)


//if we have common routes we can merge all the requests
router.route("/:id")
    .get(getUserById)
    .patch(updateUser)
    .delete(deleteUser)



router.post("/", createUser);


module.exports = router