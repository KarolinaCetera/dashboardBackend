import mongoose from "mongoose";

const Schema = mongoose.Schema;

const wordSchema = new Schema({
    english: { type: String, required: true },
    spanish: { type: String, required: true},
    englishExample: { type: String, minLength: 5, maxLength: 40, required: true },
    spanishExample: { type: String, minLength: 5, maxLength: 40, required: true },
});

export const Word = mongoose.model("Word", wordSchema)