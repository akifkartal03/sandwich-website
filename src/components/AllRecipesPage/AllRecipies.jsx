import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
const Recipies = ({ brands, handleSelectBox }) => {
    return (
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
                                                //onInput={handleSelectBox}
                                                onClick={handleSelectBox}
                                                key={brand._id}
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
    );
};

export default Recipies;
