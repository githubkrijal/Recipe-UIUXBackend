const Recipe = require('../models/Recipe')
// const category = require('../models/category')

const getallrecipes = (req, res, next) => {
    Recipe.find()
        // .populate('category')
        .then((recipes) => {
            res.status(200).json({
                success: true,
                message: "List of recipes",
                data: recipes
            });
            console.log(recipes)
        }).catch((err) => next(err))
    //res.json(books)
}
const createrecipes = (req, res, next) => {
    let recipe = {
        ...req.body,
        
    }

    const file = req.file;
    if (file) {
        const fileName = req.file.filename;
        recipe.image = '/images/recipe_image/' + fileName;
    }

    Recipe.create(recipe).then(recipe => {
        res.status(201).json({
            message: 'Recipe added successfully',
            data: recipe
        })
    }).catch(next)


}
const deleteallrecipes = (req, res) => {
    Recipe.deleteMany()
        .then((reply) => {
            res.json(reply)
        }).catch(console.log)
}

const getRecipeByID = (req, res, next) => {
    Recipe.findById(req.params.id)
        // .populate('category')
        .then((recipe) => {
            res.status(200).json({
                success: true,
                message: "Recipe by ID",
                data:recipe
            });
        }
        ).catch(next)
    
}
const updateRecipeByID = (req, res, next) => {
    Recipe.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then((recipe) => {
            res.json(recipe)
        }
        ).catch(next)
    
}
const deleteRecipeByID = (req, res, next) => {
    Recipe.findByIdAndDelete(req.params.id)
        .then((reply) => {
            res.json(reply)
        }).catch(next)
    
}
const searchRecipeByCategory = (req, res, next) => {
    const categoryId = req.query.categoryId;
    Recipe.find({ category: categoryId })
        .populate("category", "-__v")
        .then(
            (recipe) => {
                res.status(201).json({
                    success: true,
                    message: "List of recipes by category",
                    data: recipe,
                });
            }
        ).catch(
            (err) => {
                res.status(500).json({
                    success: false,
                    message: err,
                });
            }
        );
}

module.exports = {
    getallrecipes,
    createrecipes,
    deleteallrecipes,
    getRecipeByID,
    updateRecipeByID,
    deleteRecipeByID,
    searchRecipeByCategory,
}

