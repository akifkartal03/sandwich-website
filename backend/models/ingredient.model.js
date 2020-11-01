const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    quantity: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Ingredient = mongoose.model("Ingredient", ingredientSchema);
module.exports = Ingredient;
