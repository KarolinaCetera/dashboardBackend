const { Router } = require("express");
const { check } = require("express-validator")

const { getWordById, createWord, updateWord, deleteWord } = require("../controllers/words");

const wordsRoutes = Router();

wordsRoutes.get("/:wid", getWordById);

wordsRoutes.post("/", [
    check(["english", "spanish"])
        .not()
        .isEmpty(),
    check(["englishExample", "spanishExample"])
        .isLength({ min: 5 }),
], createWord);

wordsRoutes.patch("/:wid", [
    check(["english", "spanish"])
        .not()
        .isEmpty(),
    check(["englishExample", "spanishExample"])
        .isLength({ min: 5 }),
], updateWord);

wordsRoutes.delete("/:wid", deleteWord);

export default wordsRoutes;