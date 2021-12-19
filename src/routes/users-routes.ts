const express = require("express");
const { check } = require("express-validator")

const { getUsers, signUp, logIn } = require("../controllers/users");

const usersRoutes = express.Router();

usersRoutes.get("/", getUsers);

usersRoutes.post("/signup", [
    check("name")
        .not()
        .isEmpty(),
    check("email")
        .isEmail(),
    check("password")
        .isLength({ min: 5 })
], signUp);

usersRoutes.post("/login", logIn );

export default usersRoutes;