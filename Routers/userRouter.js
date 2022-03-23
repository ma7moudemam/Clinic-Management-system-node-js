const express = require("express");
const controller = require("../Controllers/userController");
const router = express.Router();
const { body, query, param } = require("express-validator")
const Auth = require('../Middlewares/authMW');

router.route("/user")
    .get(controller.getAllUsers)
    

router.get("/user/profile",Auth, controller.getUserByProfile)    

router.get("/user/:id", controller.getUser)

router.put("/user/:id", controller.updateUser)
router.delete("/user/:id", controller.deleteUser)
router.post('/user/role',Auth,controller.getUserByRole )

module.exports = router;