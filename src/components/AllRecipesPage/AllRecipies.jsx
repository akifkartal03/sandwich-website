import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeList from './RecipeList';
import RecipieDataService from '../../services/RecipieService';
const Recipies = () => {
    const [brands, setBrands] = useState([]);
    const [selectedCheckboxes, setSelectedBoxes] = useState(new Set());
    useEffect(() => {
        retrieveBrands();
    }, []);
    const retrieveBrands = () => {
        RecipieDataService.getCategories()
            .then(response => {
                setBrands(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    const handleSelectBox = e => {
        const name = e.target.name;
        const value = e.target.checked;
        if (selectedCheckboxes.has(name)) {
            selectedCheckboxes.delete(name);
        } else {
            selectedCheckboxes.add(name);
        }
    };
    const print = () => {
        for (const checkbox of selectedCheckboxes) {
            console.log(checkbox, 'is selected.');
        }
    };
    return (
        <div
            className="container"
            style={{ paddingTop: '2rem', paddingLeft: '0rem' }}
            key="1"
        >
            <div className="row" style={{ marginLeft: '-5rem' }}>
                <div className="col-lg-3" style={{ paddingRight: '3rem' }}>
                    <div className="row">
                        <div className="col-15">
                            <div className="card mb-3">
                                <div className="card-header">
                                    <h3>Categories</h3>
                                </div>
                                <ul className="list-group flex-row flex-wrap">
                                    {brands.map(brand => (
                                        <li
                                            className="list-group-item flex-50"
                                            key={brand._id}
                                        >
                                            <label className="custom-checkbox text-capitalize">
                                                {' '}
                                                {brand.name}
                                                <input
                                                    type="checkbox"
                                                    name={brand.name}
                                                    className="custom-checkbox__input"
                                                    onInput={handleSelectBox}
                                                />
                                                <span className="custom-checkbox__span" />
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <RecipeList categories={brands} />
            </div>
        </div>
    );
};

export default Recipies;
