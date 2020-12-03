import React, { useState, useEffect } from "react";
import Recipies from "./ShowRecipies";
import data from "./album";
const Products = ({ categories }) => {
  const [recipies, SetRecipe] = useState([]);
  useEffect(() => {
    SetRecipe(getRecipies());
  }, []);
  return (
    <div className="col-lg-9">
      <div className="row">
        <div className="col-30">
          <Recipies recipies={recipies} />
        </div>
      </div>
    </div>
  );
};
function getRecipies() {
  return data;
}
export default Products;
