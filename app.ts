import express, {NextFunction, Request, Response} from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

require("dotenv").config();

import wordsRoutes from "./src/routes/words-routes";
import usersRoutes from "./src/routes/users-routes";
import HttpError from "./src/models/http-error";

interface UseError {
    code: number;
    message: string
}

const app = express();

app.use(bodyParser.json())

app.use("/api/words", wordsRoutes);
app.use("/api/users", usersRoutes);

app.use(() => {
    throw new HttpError('No such route', 404);
})

app.use((error: UseError, req: Request, res: Response, next: NextFunction) => {
    (res.headersSent) && next(error);

    res.status(error.code || 500);
    res.json({message: error.message} || "Unknown error")
});

const API_KEY = process.env.API_KEY;

mongoose
    .connect(API_KEY as string)
    .then(() => {
        app.listen(4000);
    })
    .catch((err) => {
        console.log(err)
    });

