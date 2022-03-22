const { body } = require("express-validator");
const express = require("express");
const authRouter = express.Router();

//controller
const controller = require("./../Controllers/authController");

authRouter.post("/login", [
    body("email").isEmail().withMessage("Enter a valid Email"),
    body("password").isString().withMessage("password is wrong")
], controller.login);

authRouter.post("/register", [
    body("fullname").isString().withMessage("you shouldn't use numbers in your name"),
    body("email").isEmail().withMessage("you must enter your email"),
    body("password").isLength({ min: 5 }).withMessage("you should enter password"),
    body("confirm-password").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Password confirmation doesn't match your password")
        }
        return true;
    }).withMessage("Re-enter your password in confirm-password field"),
    body("role").isString()
        .custom(value => {
            return (value == "clinic" || value == "doctor" || value == "user" || value == "employee")
        }).withMessage("you should enter clinic || doctor || employee || user"),
    body("address").optional().isObject().withMessage("enter your address"),
    body("address.city").optional().isString().withMessage("city must be a string"),
    body("address.street").optional().isString().withMessage("street must be a text"),
    body("image").optional().isString().withMessage("image must be a string for now")
], controller.registerUser)