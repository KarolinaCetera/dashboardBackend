import { NextFunction, Request, Response } from "express";

const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const User = require("../models/user");

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    let users = await User.find({}, "-password");
    try {
        users = await User.find({}, "-password");
    } catch (error) {
        return next(new HttpError("Couldn't fetch users", 500));
    }

    res.json({ users: users.map((user: { toObject: (arg0: { getters: boolean; }) => any; }) => user.toObject({ getters: true })) });
};

const signUp = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    !errors.isEmpty() && (next(new HttpError("Invalid signup input", 422)))

    const { name, email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email });
        existingUser && (next(new HttpError("User already exist", 422)));
    } catch (error) {
        return next(new HttpError("Signup failed, try again", 500));
    }

    const createdUser = new User({
        name,
        email,
        password,
    })

    try {
        await createdUser.save();
    } catch (error) {
        return next(new HttpError("Signup failed, try again", 500));
    }

    res.status(201).json({user: createdUser.toObject({ getters: true })})
};

const logIn = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    let identifiedUser;

    try {
        identifiedUser = await User.findOne({ email });
    } catch (error) {
        return next(new HttpError("Login failed, try again", 500));
    }

    (!identifiedUser || identifiedUser.password !== password) && next (new HttpError("Could not identify user"));

    res.json({message: "Logged in!"});
};

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.logIn = logIn;