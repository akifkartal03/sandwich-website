import './Recipe.css';
import React, { useState, useEffect } from 'react';
import RecipieDataService from '../../services/RecipieService';

const Recipe = props => {
    const id = window.location.pathname.split('/')[
        window.location.pathname.split('/').length - 1
    ];

    const [recipe, setRecipies] = useState([]);

    const [all_recipies, setRecipiesAll] = useState([]);

    const [currentRecipie, setCurrentRecipie] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    console.log(all_recipies);

    useEffect(() => {
        retrieveRecipies();
        retrieveRecipiesAll();
    }, []);

    const retrieveRecipies = () => {
        RecipieDataService.get(id)
            .then(response => {
                setRecipies(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const retrieveRecipiesAll = () => {
        RecipieDataService.getAll()
            .then(response => {
                setRecipiesAll(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    var random = parseInt(Math.random() * all_recipies.length);
    var img1, img2, img3;
    var link1, link2, link3;
    {
        if (
            all_recipies &&
            all_recipies.length > 0 &&
            all_recipies[random] &&
            all_recipies[(random + 1) % all_recipies.length]
        ) {
            img1 = all_recipies[random].imgURL;
            link1 = all_recipies[random]._id;
            random = (random+1)%all_recipies.length;
            if (
                all_recipies &&
                all_recipies.length > 0 &&
                all_recipies[random] &&
                all_recipies[(random + 1) % all_recipies.length]
            ) {
                img2 = all_recipies[random].imgURL;
                link2 = all_recipies[random]._id;
            }
            random = (random+1)%all_recipies.length;
            if (
                all_recipies &&
                all_recipies.length > 0 &&
                all_recipies[random] &&
                all_recipies[(random + 1) % all_recipies.length]
            ) {
                img3 = all_recipies[random].imgURL;
                link3 = all_recipies[random]._id;
            }
        }
    }
    return (
        <div className="App">
            <div className="Recipe">
                <div>
                    <elemnt id="gorsel">
                        <img src={recipe.imgURL} width="300px" height="300px" />
                    </elemnt>
                </div>
                <br />
                <br />
                <br />
                <br />
                <h3>{recipe.name}</h3>
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
            <div className="Recipe Recipe-directions">
                <p>{recipe.directions}</p>
            </div>
            <div className="Recipe">
                <div id="gorselsmall">
                    <a href={`/recipe/${link1}`}>
                        <img src={img1} height="100" width="100" />
                    </a>
                </div>
                <div id="gorselsmall">
                    <a href={`/recipe/${link2}`}>
                        <img src={img2} height="100" width="100" />
                    </a>
                </div>
                <div id="gorselsmall">
                    <a href={`/recipe/${link3}`}>
                        <img src={img3} height="100" width="100" />
                    </a>
                </div>
            </div>
        </div>
    );
};
export default Recipe;

// const Footer = (props) => {
//     return (
//         <footer className="text-muted">
//             <Container>
//                 <p className="float-right">
//                     <a href="#">Back to top</a>
//                 </p>
//                 <p>Copyright to &copy; Sandwich</p>
//                 <p>
//                     Project's Github available on:
//                     <a href="https://github.com/akifkartal03/sandwich-recipe-app">
//                          Visit our github page
//                     </a>
//                 </p>
//             </Container>
//         </footer>
//     );
// };

// export default Footer;
