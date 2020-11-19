const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Ingredient = require("./ingredient.model");
const Category = require("./category.model");

const recipeSchema = new Schema(
  {
    imgURL: { type: String, required: true },
    name: { type: String, required: true },
    directions: { type: String, required: true },
    ingredients: { type: [String], required: true },
    ingredients_quantities: { type: [String], required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
