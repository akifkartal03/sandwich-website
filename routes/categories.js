const router = require("express").Router();
const { response } = require("express");
let Category = require("../models/category.model");

router.route("/").get((req, res) => {
  Category.find()
    .then((categories) => res.json(categories))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;

  const newCategory = new Category({ name });

  newCategory
    .save()
    .then(() => res.json("Category added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Category.findById(req.params.id)
    .then((categories) => res.json(categories))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").delete((req, res) => {
  Category.findByIdAndDelete(req.params.id)
    .then(() => res.json("Category deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Category.findById(req.params.id)
    .then((categories) => {
      categories.name = req.body.name;

      categories
        .save()
        .then(() => res.json("Category updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
