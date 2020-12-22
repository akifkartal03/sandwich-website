const router = require("express").Router();
let Ingredient = require("../models/ingredient.model");

router.route("/").get((req, res) => {
  Ingredient.find()
    .then((ingredients) => res.json(ingredients))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const quantity = req.body.quantity;

  const newIngredient = new Ingredient({ name, quantity });

  newIngredient
    .save()
    .then(() => res.json("Ingredient added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Ingredient.findById(req.params.id)
    .then((ingredients) => res.json(ingredients))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").delete((req, res) => {
  Ingredient.findByIdAndDelete(req.params.id)
    .then(() => res.json("Ingredient deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Ingredient.findById(req.params.id)
    .then((ingredients) => {
      ingredients.name = req.body.name;
      ingredients.quantity = req.body.quantity;

      ingredients
        .save()
        .then(() => res.json("Ingredient updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
