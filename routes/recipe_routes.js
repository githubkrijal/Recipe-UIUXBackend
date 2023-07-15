const express = require('express')
const RecipeController = require('../controller/recipe_controller')
const auth = require('../middleware/auth')
const upload = require('../middleware/uploadrecipe')
const Recipe = require('../models/Recipe')

const router = express.Router()
router.route('/')
    .get(RecipeController.getallrecipes)
    // .post(auth.verifyUser, auth.verifyVendor, ProductController.createproducts)
    .post( upload.single('image'), RecipeController.createrecipes)
    // .post(auth.verifyUser, auth.verifyAdmin, upload.single('image'), RecipeController.createrecipes)

    .put((req, res) => {
        res.status(501).send({ "reply": "Put request not supported" })
    })
    .delete(auth.verifyAdmin, RecipeController.deleteallrecipes)

router.route('/:id')
    .get(RecipeController.getRecipeByID)
    .post((req, res) => {
        res.status(501).send({ "reply": "Not implemented" })
    })
    .put(auth.verifyUser, auth.verifyAdmin, RecipeController.updateRecipeByID)
    .delete(auth.verifyUser, auth.verifyAdmin, RecipeController.deleteRecipeByID)

module.exports = router