import HttpError from "../models/http-error";

import { validationResult } from "express-validator";

import { Word } from "../models/word";

import { NextFunction, Request, Response } from "express";

export const getWordById = async (req: Request, res: Response, next: NextFunction) => {
    const { wid } = req.params;

    let word;
    try {
        word = await Word.findById(wid);
    } catch (error) {
        return next(new HttpError("Couldn't fetch word", 500));
    }

    word ? res.json({ word: word.toObject({ getters: true }) }) : next(new HttpError("No such word", 404));
};

export const createWord = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) throw new HttpError("Invalid input", 422)

    const { english, spanish, englishExample, spanishExample } = req.body;
    const createdWord = new Word({
        english,
        spanish,
        englishExample,
        spanishExample,
    });

    try {
        await createdWord.save();
    } catch (error: unknown) {
        return next(new HttpError("Cannot create word, try again", 500));
    }

    res.status(201).json({word: createdWord});
}

export const updateWord = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) throw new HttpError("Invalid input", 422)

    const { english, spanish, englishExample, spanishExample } = req.body;
    const { wid } = req.params;

    let updatedWord;

    try {
        updatedWord = await Word.findByIdAndUpdate(wid, {english, spanish, englishExample, spanishExample})
    } catch (error) {
        return next(new HttpError("Cannot update word, try again", 500));
    }

    res.status(200).json({word: updatedWord.toObject({getters: true})});

};
export const deleteWord = async (req: Request, res: Response, next: NextFunction) => {
    const { wid } = req.params;

    try {
        await Word.findByIdAndDelete(wid);
    } catch (error) {
        return next(new HttpError("Cannot delete word, try again", 500));
    }

    res.status(200).json({message: "Word has been deleted"});
};