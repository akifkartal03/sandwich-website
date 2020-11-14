const router = require("express").Router();
let Recipe = require("../models/recipe.model");

router.route("/").get((req, res) => {
  Recipe.find()
    .then((recipes) => res.json(recipes))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const img = req.body.img;
  const name = req.body.name;
  const directions = req.body.directions;
  const ingredients = req.body.ingredients;
  const category = req.body.category;

  const newRecipe = new Recipe({ img, name, directions, ingredients, category });

  newRecipe
    .save()
    .then(() => res.json("Recipe added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Recipe.findById(req.params.id)
    .then((recipes) => res.json(recipes))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").delete((req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then(() => res.json("Recipe deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Recipe.findById(req.params.id)
    .then((recipes) => {
      recipes.img = req.body.img;
      recipes.name = req.body.name;
      recipes.directions = req.body.directions;
      recipes.ingredients = req.body.ingredients;
      recipes.category = req.body.category;

      recipes
        .save()
        .then(() => res.json("Recipe updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
