import './Recipe.css';
import React from 'react';

import { useMediaQuery } from 'react-responsive'

const Recipe = ({recipe,all_recipies}) => {
    
    
    var random = parseInt(Math.random() * all_recipies.length);
    var img1, img2, img3;
    var link1, link2, link3;
    var name1, name2, name3;
    
        if (
            all_recipies &&
            all_recipies.length > 0 &&
            all_recipies[random] &&
            all_recipies[(random + 1) % all_recipies.length]
        ) {
            img1 = all_recipies[random].imgURL;
            link1 = all_recipies[random]._id;
            name1 = all_recipies[random].name;
            random = (random + 1) % all_recipies.length;
            if (
                all_recipies &&
                all_recipies.length > 0 &&
                all_recipies[random] &&
                all_recipies[(random + 1) % all_recipies.length]
            ) {
                img2 = all_recipies[random].imgURL;
                link2 = all_recipies[random]._id;
                name2 = all_recipies[random].name;
            }
            random = (random + 1) % all_recipies.length;
            if (
                all_recipies &&
                all_recipies.length > 0 &&
                all_recipies[random] &&
                all_recipies[(random + 1) % all_recipies.length]
            ) {
                img3 = all_recipies[random].imgURL;
                link3 = all_recipies[random]._id;
                name3 = all_recipies[random].name;
            }
        }
    const Default = ({ children }) => {
        const isNotMobile = useMediaQuery({ minWidth: 992 })
        return isNotMobile ? children : null
      }
      const MobileorTablet = ({ children }) => {
        const isMobileorTablet = useMediaQuery({ maxWidth: 991 })
        return isMobileorTablet ? children : null
      }
 
    return (
        <div className="App">
            <Default>
            <div className="Recipe">
                <div>
                    <elemnt id="image" >
                        <img src={recipe.imgURL} width="320px" height="320px" alt=' ' />
                    </elemnt>
                </div>
                <br />
                <br />
                <h3 className="Recipe-name">{recipe.name}</h3>
                <div className="IngredientInfo">
                    <div>
                        {recipe.ingredients_quantities &&
                            recipe.ingredients_quantities.map((data, index) => {
                                return <div>{data}</div>;
                            })}
                    </div>
                    <div>
                        {recipe.ingredients &&
                            recipe.ingredients.map((data, index) => {
                                return <div>{data}</div>;
                            })}
                    </div>
                </div>
            </div>
            <div className="Recipe-directions">
                <h3 style={{ color: '#af1507', fontWeight: 'bolder' }}>
                    {' '}
                    Directions{' '}
                </h3>
                <p>{recipe.directions}</p>
            </div>
            <div className="SmallRecipeies">
                <div className="title">
                    <h3 style={{fontWeight: 'bolder' }}>
                        {' '}
                        Browse More{' '}
                    </h3>
                </div>
                <div id="imagesmall">
                    <a href={`/recipe/${link1}`}>
                        <img src={img1} height="150px" width="150px" alt=' ' />
                        <p className="small-image-name">{name1}</p>
                    </a>
                </div>
                <div id="imagesmall">
                    <a href={`/recipe/${link2}`}>
                        <img src={img2} height="150px" width="150px" alt=' '/>
                        <p className="small-image-name">{name2}</p>
                    </a>
                </div>
                <div id="imagesmall">
                    <a href={`/recipe/${link3}`}>
                        <img src={img3} height="150px" width="150px"  alt=' '/>
                        <p className="small-image-name">{name3}</p>
                    </a>
                </div>
            </div>
            </Default>
            <MobileorTablet>
            <div className="Recipe">
                <div>
                    <elemnt id="image">
                        <img src={recipe.imgURL} width="320px" height="320px" alt=' '/>
                    </elemnt>
                </div>
                <br />
                <br />
                <h3 className="Recipe-name">{recipe.name}</h3>
                <div className="IngredientInfo">
                    <div>
                        {recipe.ingredients_quantities &&
                            recipe.ingredients_quantities.map((data, index) => {
                                return <div>{data}</div>;
                            })}
                    </div>
                    <div>
                        {recipe.ingredients &&
                            recipe.ingredients.map((data, index) => {
                                return <div>{data}</div>;
                            })}
                    </div>
                </div>
            
            <div className="Recipe-directions">
                <h3 style={{ color: '#af1507', fontWeight: 'bolder' }}>
                    {' '}
                    Directions{' '}
                </h3>
                <p>{recipe.directions}</p>
            </div>
            <div className="SmallRecipeies">
                <div className="title">
                    <h3 style={{fontWeight: 'bolder' }}>
                        {' '}
                        Browse More{' '}
                    </h3>
                </div>
                <div id="imagesmall">
                    <a href={`/recipe/${link1}`}>
                        <img src={img1} height="150px" width="150px" alt=' '/>
                        <p className="small-image-name">{name1}</p>
                    </a>
                </div>
                <div id="imagesmall">
                    <a href={`/recipe/${link2}`}>
                        <img src={img2} height="150px" width="150px" alt=' '/>
                        <p className="small-image-name">{name2}</p>
                    </a>
                </div>
                <div id="imagesmall">
                    <a href={`/recipe/${link3}`}>
                        <img src={img3} height="150px" width="150px" alt=' '/>
                        <p className="small-image-name">{name3}</p>
                    </a>
                </div>
            </div>
            </div>
            </MobileorTablet>
        </div>
    );
};
export default Recipe;

